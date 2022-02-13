import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import useFetchInfo from '../apis/useFetchInfo';
import Loader from '../components/Loader/Loader';
import Button from '../components/InfoPage/Button';
import { BsPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useFetchWatchInfo from '../apis/useFetchWatchInfo';
import classNames from 'classnames';
import { RootState } from '../reducers';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io';
import ProgressBarLoading from '../utils/ProgressBar';
import Section from '../components/HomePage/Section';
import { ImSpinner2 } from 'react-icons/im';

interface pairProps {
    pairKey: string;
    pairValue: any[] | string | undefined;
    onValue?: (value: any, index: number, arr: any[], slug: string, pairKey: string) => React.ReactNode;
    slug?: string;
}
const Pair = ({
    pairKey,
    pairValue,
    onValue = (data, index, arr, slug, pairKey) => {
        if (data.path) {
            return <Link to={data.path.includes('tag') ? `/tag/${data.slug}` : `/quoc-gia/${data.slug}`} key={index}>
                <p className="text-three">{data.name}{arr.length - 1 !== index ? "," : ""}&nbsp;&nbsp;</p>
            </Link>
        } else {
            if (pairKey === 'Parts') {
                return <Link to={`/info/${data.slug}`} key={index} title={data.altName}>
                    <p className={(data.slug === slug ? "text-three" : '') + ' hover:text-three'}>{data.name}<span className='text-white'>{arr.length - 1 !== index ? "," : ""}</span>&nbsp;&nbsp;</p>
                </Link>
            }
            return <Link to={`/seasons/${data.slug}`} key={index}>
                <p className="text-three">{data.name}{arr.length - 1 !== index ? "," : ""}&nbsp;&nbsp;</p>
            </Link>
        }
    },
    slug
}: pairProps) => (
    <div className="flex text-base">
        <p className="text-gray-500 font-bold mr-2">{pairKey}: </p>
        {Array.isArray(pairValue) ? (
            <div className={"text-white flex flex-wrap"}>
                {pairValue.map((value, index, arr) => {
                    return onValue?.(value, index, arr, slug!, pairKey)
                })}
            </div>
        ) : (
            <p className="text-white">{pairValue}</p>
        )}
    </div>
);

const Info = () => {
    const { slug } = useParams();

    const dispatch = useDispatch();
    const select = useSelector((state: RootState) => state);

    const item = select.viewMore.find(item => item.slug == slug);
    var item2 = select.episode.find(item => item.slug == slug);
    if (!item2) {
        item2 = {
            name: '',
            slug: '',
            index: 0
        }
    }
    const navigate = useNavigate();
    if (!slug) {
        navigate('/');
    }

    const handleError = (e: any) => {
        e.target.src = '/default.png';
    }

    const [viewMore, setViewMore] = useState<boolean>(item ? item.viewMore : false);
    const setviewmore = () => {
        setViewMore(!viewMore);
        dispatch({ type: 'changeViewMore', payload: { slug: slug, viewMore: !viewMore } })
    }

    const { data: info, isLoading } = useFetchInfo(slug!);

    const [final, setFinal] = useState<boolean>(isLoading ? false : true);

    const { data: infoWatch, isLoading: isInfoLoading } = useFetchWatchInfo(slug!);

    useEffect(() => {
        if (!isLoading) {
            const hihi = new Image();
            const haha = new Image();
            hihi.src = info?.image!;
            haha.src = info?.backgroundImage!;
            const images = [hihi, haha];
            var imageCount = images.length;
            var imagesLoaded = 0;
            for (var i = 0; i < imageCount; i++) {
                images[i].onload = function () {
                    imagesLoaded++;
                    if (imagesLoaded == imageCount) {
                        allLoaded();
                    }
                }
                images[i].onerror = () => {
                    allLoaded();
                }
            }
            const allLoaded = () => {
                setFinal(true);
            }
        }
    }, [isLoading]);

    useEffect(() => {
        isLoading && setFinal(false);
        window.scroll(0, 0); //cùng 1 component thì hoạt động, nếu từ component này sang component khác thì ko hoạt động
    }, [slug])

    useEffect(() => {
        if (info) {
            document.title = info.title + ' - AniMAX';
        }
    }, [info])

    if (!final) return <>
        <ProgressBarLoading />
        <Loader />
    </>;

    return (final) && (
        <div className="w-full flex flex-col">
            <div className="relative w-full self-center">
                <img
                    onError={(e) => handleError(e)}
                    src={info?.backgroundImage}
                    alt={info?.title}
                    className="object-cover w-full max-h-106 min-h-106"
                />
                <div className="flex absolute inset-0 bg-black bg-opacity-80 max-h-106">
                    <div className="flex w-full px-8 md:py-6 lg:py-14 self-center">
                        <img
                            onError={(e) => handleError(e)}
                            src={info?.image}
                            alt={info?.title}
                            className="object-cover min-w-36 h-40 md:w-72 md:h-80 lg:w-80 lg:h-96 self-center rounded-md"
                        />
                        <div className="w-full self-center space-y-2 ml-8">
                            <div>
                                <h1 className=" text-three text-sm md:text-2xl lg:text-3xl line-clamp-2 md:line-clamp-none font-bold">
                                    {info?.title}
                                    <span className='text-white'>{' (' + info?.date + ')'}</span>
                                </h1>
                                <h1 className="text-white text-xs md:text-sm lg:text-lg line-clamp-1 font-bold">
                                    {info?.altTitle}
                                </h1>
                            </div>
                            <ul className='genres text-white flex text-sm flex-wrap'>
                                {
                                    info?.genres.map(genre => (
                                        <Link key={genre.name} to={`/${genre.path.includes('the-loai') ? 'genres' : 'types'}/${genre.slug}`}><li className='mr-3 border-2 rounded-full px-3 pb-0.5 text-xs md:text-sm mb-2 hover:text-five hover:border-five transition-colors'>{genre.name}</li></Link>
                                    ))
                                }
                            </ul>
                            <p className="text-gray-400 font-bold text-xs md:text-sm lg:text-base md:line-clamp-3 lg:line-clamp-5 mb-2 max-h-64 overflow-y-scroll">
                                {info?.description}
                            </p>

                            <Button
                                className={`${info?.episodes.length !== 0 ? 'bg-primary' : 'bg-gray-500'} text-white mt-4 `}
                                iconClassName="hidden lg:block text-white"
                                startIcon={BsPlayFill}
                                to={`/watch/${slug}`}
                                onClick={() => dispatch({ type: 'EPISODE', payload: { name: infoWatch?.episodes[0].name, slug: slug } })}
                                disabled={info?.episodes.length !== 0 ? false : true}
                            >
                                Watch Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='eps text-white mt-5'>
                <h3 className='mb-2 text-lg'>Tập phim </h3>
                {
                    isInfoLoading && <ImSpinner2 size={20} className='mx-auto my-2 animate-spin' />
                }
                <ul className={classNames('flex flex-wrap justify-start', !viewMore && 'max-h-60 overflow-hidden')}>
                    {
                        infoWatch?.episodes.length !== 0 ? infoWatch?.episodes.map(episode => (
                            <Link className='mb-2' to={`/watch/${slug}`} key={episode.id}><li onClick={() => { dispatch({ type: 'EPISODE', payload: { name: episode.name, slug: slug } }) }} className={classNames('mr-2 rounded-sm px-4 py-2 hover:bg-red-600 transition-colors', item2.name === episode.name ? "bg-red-600" : "bg-four")}>{episode.name}</li></Link>
                        )) : "Phim đang được cập nhật."
                    }
                </ul>
                <button className={classNames('mt-3 flex justify-center w-full', (infoWatch?.episodes.length! <= 120 || isInfoLoading) && 'hidden')} onClick={() => setviewmore()}>{viewMore ? <IoIosArrowDropupCircle size={40} className='hover:text-secondary' /> : <IoIosArrowDropdownCircle size={40} className='hover:text-secondary' />}</button>
            </div>

            <div id='thongtinphim' className=' text-white mt-5'>
                <h3 className='mb-2 text-lg'>Thông tin phim</h3>
                <div className="space-y-1">
                    <Pair pairKey="Lịch chiếu" pairValue={info?.showtime} />
                    <Pair pairKey="Trạng thái" pairValue={info?.status} />
                    <Pair pairKey="Đạo diễn" pairValue={info?.directors} />
                    <Pair pairKey="Quốc gia" pairValue={info?.nations} />
                    <Pair pairKey="Theo dõi" pairValue={info?.followers} />
                    <Pair pairKey="Thời lượng" pairValue={info?.time} />
                    <Pair pairKey="Độ tuổi" pairValue={info?.rating} />
                    <Pair pairKey="Ngôn ngữ" pairValue={info?.language} />
                    <Pair pairKey="Studio" pairValue={info?.studio} />
                    <Pair pairKey="Season" pairValue={info?.seasons} />
                    <Pair pairKey="Chất lượng" pairValue={info?.quality} />
                    <Pair pairKey="Views" pairValue={info?.views} />
                    <Pair pairKey="Parts" pairValue={info?.includedParts} slug={slug} />
                </div>
            </div>

            {
                info?.relatedAnime.length != 0 && <Section title='Phim liên quan' isLoading={false} data={info?.relatedAnime} className='text-lg' />
            }
        </div>
    );
};

export default Info;