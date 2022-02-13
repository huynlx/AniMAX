import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchSource from '../apis/useFetchSource';
import useFetchWatchInfo from '../apis/useFetchWatchInfo';
import useQueryParams from '../hooks/useQueryParams';
import { Options, SourceInfo } from 'plyr';
import Video, { addButtons, PlyrEvent, PlyrInstance } from "../components/WatchPage/Video";
import EpisodeButton from '../components/WatchPage/EpisodeButton';
import Loader from '../components/Loader/Loader';
import "../components/WatchPage/Video.css";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaPlay } from "react-icons/fa";
import classNames from 'classnames';
import Button from '../components/InfoPage/Button';
import useDevice from '../hooks/useDevice';
import useOrientation from '../hooks/useOrientation';
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import ProgressBarLoading from '../utils/ProgressBar';

const Watch = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const query = useQueryParams();
    const { isDesktop } = useDevice();
    const { isPortrait } = useOrientation();

    const select = useSelector((state: RootState) => state);
    const item2 = select.episode.find(item => item.slug == slug);

    const dispatch = useDispatch();

    const { data: info, isLoading: isInfoLoading } = useFetchWatchInfo(slug!);

    const [final, setFinal] = useState(false);

    useEffect(() => {
        if (!isInfoLoading) {
            setEpisodeIndex(item2.name === 'xem ngay' ? 0 : info?.episodes.findIndex(item => item.name === item2.name)!);
            setFinal(true);
        }
    }, [isInfoLoading])

    const [pause, setPause] = useState<boolean>(false);
    const [showNextEpButton, setShowNextEpButton] = useState<boolean>(false);
    const [showPauseScreen, setShowPauseScreen] = useState<boolean>(false);
    const [showOrientationScreen, setShowOrientationScreen] = useState<boolean>(false);
    const [episodeIndex, setEpisodeIndex] = useState<number>(0)//Muốn thay đổi state phải dùng set

    const currentEpisode = info?.episodes[episodeIndex];

    const { data: source, isLoading: isSourceLoading } = useFetchSource(currentEpisode?.hash, currentEpisode?.id, !!info);

    const videoSource = useMemo<SourceInfo>(
        () => ({
            type: "video",
            sources: [
                {
                    src: source?.source!,
                },
            ],
        }),
        [source]
    );

    // console.log(videoSource);


    const videoOptions = useMemo<Options>(
        () => ({
            autoplay: true,
        }),
        []
    );

    const handleEpisodeClick = (_episode: string, i: number) => {
        dispatch({ type: 'EPISODE', payload: { index: i, name: info?.episodes[i].name } });
        setEpisodeIndex(i);
    };
    const handleNextEpisodeClick = () => {
        setEpisodeIndex((i) => {
            dispatch({ type: 'EPISODE', payload: { index: i + 1, name: info?.episodes[i + 1].name, slug: slug } });
            return i + 1;
        });

    };
    const handlePrevEpisodeClick = () => {
        setEpisodeIndex((i) => {
            dispatch({ type: 'EPISODE', payload: { index: i - 1, name: info?.episodes[i - 1].name, slug: slug } });
            return i - 1;
        });
    };

    useEffect(() => {
        window.scroll(0, 0);
        if (isPortrait) {
            setShowOrientationScreen(true);
        } else {
            setShowOrientationScreen(false);
        }
    }, [isPortrait]);

    const handleReady = (player: PlyrInstance, _event: PlyrEvent) => {
        addButtons([
            {
                component: (
                    <EpisodeButton
                        episodes={info?.episodes.map((episode) => episode.name)!}
                        onClick={handleEpisodeClick}
                        activeIndex={episodeIndex}
                    />
                ),
                position: 6,
                className: "flex items-center justify-center",
            },
            {
                component: (
                    <Button
                        onClick={handleNextEpisodeClick}
                        startIcon={GrChapterNext}
                        className='p-none'
                    />
                ),
                position: 6,
                className: `flex items-center justify-center ${episodeIndex == info!.episodes.length - 1 && 'hidden'}`,
            },
            {
                component: (
                    <Button
                        onClick={handlePrevEpisodeClick}
                        startIcon={GrChapterPrevious}
                        className={'p-none'}
                    />
                ),
                position: 6,
                className: classNames(`flex items-center justify-center`, episodeIndex == 0 && 'hidden'),
            }
        ]);

        player.on("timeupdate", () => {
            const remainingTime = Math.round(player.duration - player.currentTime);
            const triggerTime = 120; // Seconds

            if (remainingTime <= triggerTime) {
                setShowNextEpButton(true);
            } else {
                setShowNextEpButton(false);
            }
        });

        player.on('pause', () => {
            setPause(true);
        })

        if (isDesktop) {
            document.addEventListener("visibilitychange", () => {
                if (document.visibilityState === "visible") {
                    return;
                }

                const timeoutSeconds = 6;

                setTimeout(
                    () => setShowPauseScreen(true),
                    timeoutSeconds * 1000
                );
            });

            player.on("play", () => {
                setPause(false);
            });
        }
    };

    // console.log(indexSelect);
    if (isInfoLoading || isSourceLoading || !final) {
        return (
            <div className="absolute flex items-center justify-center bg-background inset-0 w-screen h-screen z-50">
                <Loader />
            </div>
        );
    }

    return final && (
        <div className="absolute bg-background inset-0 w-screen h-screen z-50 watching">
            <div className="relative w-full h-full">
                <Video source={videoSource} onReady={handleReady} options={videoOptions} />
                <div
                    className={"absolute top-8 left-8 back " + (pause ? "block" : 'hidden')}
                >
                    <HiArrowNarrowLeft
                        size={30}
                        className="text-gray-300 hover:text-white cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    {
                        <h1 className='self-center text-2xl font-bold -ml-5'>Tập {info?.episodes[episodeIndex].name}</h1>
                    }
                </div>

                <div
                    className={classNames(
                        "absolute bottom-20 right-10",
                        showNextEpButton ? ((episodeIndex !== info!.episodes.length - 1) ? 'block' : 'hidden') : "hidden"
                    )}
                >
                    <Button
                        onClick={handleNextEpisodeClick}
                        startIcon={FaPlay}
                        className="shadow-lg bg-white text-black"
                    >
                        Tập tiếp theo
                    </Button>
                </div>

                <div
                    className={classNames(
                        "absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center",
                        !showOrientationScreen ? "hidden" : "block"
                    )}
                >
                    <img
                        src="/rotate_landscape.gif"
                        alt="Please rotate your device to landscape"
                    />

                    <h1 className="text-center text-white text-xs sm:text-sm font-medium">
                        Chuyển sang chế độ ngang để có trải nghiệm tốt nhất.
                    </h1>
                </div>

                <div
                    className={classNames(
                        "absolute inset-0 bg-black bg-opacity-90 px-40 flex flex-col space-y-6 justify-center",
                        !showPauseScreen ? "hidden" : "block"
                    )}
                    onMouseEnter={() => {
                        if (isDesktop && showPauseScreen) {
                            setShowPauseScreen(false);
                        }
                    }}
                >
                    <div className="space-y-2">
                        <h1 className="text-gray-400 font-medium text-lg">Bạn đang xem</h1>
                        <h1 className="text-white font-bold text-5xl">{info?.title}</h1>
                        <h1 className="text-white font-bold text-2xl">Tập {info?.episodes[episodeIndex].name}</h1>
                    </div>

                    <h1 className="text-gray-500 text-base font-medium line-clamp-3">
                        {info?.description}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Watch;