import React, { PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import { Settings } from "react-slick";
import { Anime } from "../../types";
import AnimeCard from "../BrowserPage/AnimeCard";
import Carousel from './Carousel';

import './Carousel2.css';

interface AnimeCarouselProps {
    settings?: Settings;
    data?: Anime[];
    onClick?: () => void;
}

const Carousel2 = (props: PropsWithChildren<AnimeCarouselProps>) => {
    const location = useLocation();
    const defaultSettings = {
        slidesToShow: location.pathname.includes('info') ? 7 : 6,
        slidesToScroll: 6,
        infinite: false,
        dots: false,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };
    const { data = [], settings, onClick } = props;
    const finalSettings = { ...defaultSettings, ...settings };

    return (
        <Carousel settings={finalSettings}>
            {
                data.map(anime => (
                    <AnimeCard key={anime.slug} {...anime} classNameImg=' lg:h-72' />
                ))
            }
        </Carousel>
    );
};

export default Carousel2;