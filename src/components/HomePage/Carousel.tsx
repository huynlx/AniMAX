import React, { PropsWithChildren, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import classNames from "classnames";
import { useDispatch } from 'react-redux';

interface CarouselProps {
    settings?: Settings;
}

interface ArrowButtonProps {
    onClick?: () => void;
}

function NextArrow(props: ArrowButtonProps) {
    const { onClick } = props;
    return (
        <div
            className={classNames(
                "bg-black -right-6 transform p-3 cursor-pointer z-10"
            )}
            style={{
                borderRadius: "50%",
                position: 'absolute',
                top: ' 46%',
                transform: 'translate(0, -50%)'
            }}
            onClick={onClick}
        >
            <BsChevronRight size={20} className="text-white hover:text-secondary" />
        </div>
    );
}

function PrevArrow(props: ArrowButtonProps) {
    const { onClick } = props;
    return (
        <div
            className={classNames(
                "bg-black -left-6 transform p-3 cursor-pointer z-10"
            )}
            style={{
                borderRadius: "50%",
                position: 'absolute',
                top: ' 46%',
                transform: 'translate(0, -50%)'
            }}
            onClick={onClick}
        >
            <BsChevronLeft size={20} className="text-white hover:text-secondary" />
        </div>
    );
}


const Carousel = (props: PropsWithChildren<CarouselProps>) => {
    const defaultSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        autoplay: true,
        beforeChange: () => {
            dispatch({ type: 'changeSliding', payload: true })
        },
        afterChange: () => {
            dispatch({ type: 'changeSliding', payload: false })
        }
    };
    const settings = { ...defaultSettings, ...props.settings };
    var dispatch = useDispatch();

    return <Slider {...settings}>{props.children}</Slider>;
};

export default Carousel;
