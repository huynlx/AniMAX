import classNames from 'classnames';
import { AiFillStar, AiOutlineCalendar } from 'react-icons/ai';
import { BiTime } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../reducers';
import { Anime } from '../../types';
import TextIcon from '../HomePage/TextIcon';
import { useSelector } from 'react-redux';
import { BsPlayCircle } from 'react-icons/bs';
import { GrView } from 'react-icons/gr';

interface AnimeCardProps extends Anime {
    className?: string;
    onClick?: () => void;
    classNameImg?: string;
}
const AnimeCard = (props: AnimeCardProps) => {
    const { pathname } = useLocation();

    const isSliding: boolean = useSelector((state: RootState) => state.sliding);
    const handleOnClick = (event: any) => {
        if (isSliding) {
            event.preventDefault();
            return;
        }
    }
    const conditions = ["giờ", "phút", "Giờ", "Phút"];
    const conditions2 = ["HD", "BD", "FHD"];
    const handleError = (e: any) => {
        e.target.src = '/default.png';
    }

    return (
        <Link to={`/info/${props.slug}`} onClick={e => handleOnClick(e)}>
            <div className={classNames("relative shadow-lg group", props.className)}>
                <img
                    onError={(e) => handleError(e)}
                    src={props.image}
                    alt={props.title}
                    className={classNames(
                        "w-full h-48 md:h-60 object-cover rounded-md rounded-b-none",
                        props.classNameImg ? props.classNameImg : 'lg:h-80'
                    )}
                // loading='lazy'
                />

                {props.isUpcoming && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <p className="text-white text-3xl font-bold">
                            {props.upcomingYear}
                        </p>
                        <h1 className='font-bold z-10 absolute bottom-0 p-2 bg-red-500 w-full text-center bg-opacity-80'>SẮP CHIẾU</h1>
                    </div>
                )}

                <div className="absolute inset-0 invisible group-hover:visible bg-black bg-opacity-60 flex items-center justify-center">
                    <BsPlayCircle size={70} className="text-white" />
                </div>

                <div className="absolute top-2 z-10 left-2 bg-black px-3 py-1 rounded-2xl text-white text-xs bg-opacity-70">
                    <TextIcon icon={AiFillStar} text={props.stars.toString()} className='text-base text-yellow-200'></TextIcon>
                </div>
                {
                    !props.isUpcoming && <div className={classNames("absolute top-2 right-2 text-white text-xs text-center", conditions.some(el => props.time?.includes(el)) || props.currentEpisode === '' || conditions2.some(el => props.currentEpisode?.includes(el)) ? ' bg-three rounded-md w-auto px-2' : 'bg-red-500 rounded-full w-12 px-1 pt-3 py-1 h-12')} style={{ "lineHeight": '0.5em' }}>
                        {
                            conditions.some(el => props.time?.includes(el)) || props.currentEpisode === '' || conditions2.some(el => props.currentEpisode?.includes(el)) ?
                                <span className='text-base text-black font-thin'>{props.quality || props.currentEpisode}</span>
                                :
                                (props.isCompleted) ?
                                    <>HOÀN <span className='font-bold text-lg'>TẤT</span></>
                                    :
                                    <>TẬP <span className='font-bold text-lg'>{props.currentEpisode}</span></>
                        }
                    </div>
                }
            </div>
            <div
                className={classNames(
                    "bg-background-darker p-3 w-full space-y-2 rounded-b-md",
                    pathname.includes('info') ? 'max-h-20 min-h-5' : 'max-h-20 min-h-11'
                )}
            >
                <p className={classNames("uppercase text-white font-bold text-sm hover:text-three", pathname.includes('info') ? 'line-clamp-2' : 'line-clamp-1')} title={props.title}>
                    {props.title}
                </p>

                <div className="space-y-1">
                    <div className="flex items-center">
                        {/* <TextIcon
                            icon={AiFillStar}
                            iconClassName="text-yellow-400 mr-1"
                            text={props.stars.toString()}
                            textClassName="text-yellow-400 text-xs"
                            iconSize={12}
                        /> */}

                        {props.time && (
                            <TextIcon
                                // className="ml-2"
                                icon={BiTime}
                                iconClassName="text-gray-400 mr-1"
                                text={props.time.includes('Chưa') ? '...' : props.time}
                                textClassName="text-white text-xs"
                                iconSize={12}
                            />
                        )}

                        <p className="px-2 ml-2 text-xs font-medium bg-primary text-white rounded-md mt-0.5">
                            {props.quality?.includes('Chưa') ? '?' : props.quality}
                        </p>

                        {props.date && (
                            <TextIcon
                                icon={AiOutlineCalendar}
                                iconClassName="text-gray-400 mr-1 ml-2"
                                text={props.date}
                                textClassName="text-white text-xs"
                                iconSize={12}
                            />
                        )}
                    </div>
                    <div className='flex items-center'>
                        {props.views && (
                            <TextIcon
                                // className="ml-2"
                                icon={GrView}
                                iconClassName="text-gray-400 mr-1"
                                text={'Lượt xem: ' + props.views.toLocaleString()}
                                textClassName="text-white text-xs"
                                iconSize={12}
                            />
                        )}
                    </div>
                </div>

                <p className="text-gray-400 text-xs line-clamp-3">
                    {props.description}
                </p>
            </div>
        </Link>
    );
};

export default AnimeCard;