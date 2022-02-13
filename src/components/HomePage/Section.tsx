import classNames from "classnames";
import { ImSpinner, ImSpinner2 } from "react-icons/im";
import { Anime } from "../../types";
import ProgressBarLoading from "../../utils/ProgressBar";
import Loader from "../Loader/Loader";
import Carousel2 from "./Carousel2";

interface SectionProps {
    title: string;
    data?: Anime[];
    isLoading: boolean;
    className?: string;
    onClick?: () => void;
}
const Section = (props: SectionProps) => {
    const { title, data = [], isLoading = false, className = 'text-2xl font-bold', onClick } = props;

    return (
        <div className="mt-6">
            <h1 className={classNames("text-white font-medium mb-3 -ml-2 pl-2", className)}>{title}</h1>
            {isLoading ? <><ImSpinner2 size={20} className="text-white animate-spin mx-auto my-5" /><ProgressBarLoading /></> : <Carousel2 data={data} />}
        </div>
    );
};

export default Section;