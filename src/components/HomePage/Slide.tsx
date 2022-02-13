import {
    AiFillStar,
    AiFillVideoCamera,
    AiOutlineCalendar,
    AiOutlineUnorderedList,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import TextIcon from './TextIcon';
import { BiTime } from "react-icons/bi";
import { Anime } from "../../types";
import { useSelector } from 'react-redux';
import { RootState } from "../../reducers";

const Slide = (props: Anime) => {
    const isSliding: boolean = useSelector((state: RootState) => state.sliding);
    const handleOnClick = (event: any) => {
        if (isSliding) {
            event.preventDefault();
            return;
        }
    }

    return (
        <Link to={`/info/${props.slug}`} key={props.slug} onClick={e => handleOnClick(e)}>
            <div className="relative slide-anime-image">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black bg-opacity-80">
                    <div className="absolute bottom-0 w-2/3 space-y-2 p-6">
                        <h1 className="text-white text-3xl line-clamp-2 font-bold">
                            {props.title}
                        </h1>

                        <div className="flex items-center">
                            <TextIcon
                                icon={AiFillStar}
                                iconClassName="text-three mr-1"
                                text={props.stars.toString()}
                                textClassName="text-three text-sm"
                            />

                            <TextIcon
                                className="mx-2"
                                icon={BiTime}
                                iconClassName="text-gray-400 mr-1"
                                text={props.time!}
                                textClassName="text-white text-sm"
                            />

                            <TextIcon
                                className="mx-2"
                                icon={AiOutlineCalendar}
                                iconClassName="text-gray-400 mr-1"
                                text={props.date!}
                                textClassName="text-white text-sm"
                            />

                            <p className="px-2 py-1 text-xs font-medium bg-primary text-white rounded-md">
                                {props.quality}
                            </p>
                        </div>

                        <p className="text-gray-400 line-clamp-4">{props.description}</p>

                        <div>
                            <TextIcon
                                icon={AiFillVideoCamera}
                                iconClassName=" text-three mr-1"
                                text={`Studio: ${props.studio}`}
                                textClassName="text-white text-sm"
                            />
                            <TextIcon
                                icon={AiOutlineUnorderedList}
                                iconClassName="text-three mr-1"
                                text={`Thể loại: ${props.genres
                                    ?.map(({ name }) => name)
                                    .join(", ")}`}
                                textClassName="text-white text-sm"
                            />
                        </div>
                    </div>
                </div>
                <img
                    src={props.image}
                    key={props.slug}
                    alt={props.title}
                    className="rounded-md w-full h-full object-cover"
                />
            </div>
        </Link>
    );
};

export default Slide;