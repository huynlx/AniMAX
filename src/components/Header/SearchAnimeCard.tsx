import React from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';

const SearchAnimeCard = (anime: any) => {

    return (
        <Link to={`/info/${anime.slug}`} title={anime.title}>
            <div
                className="flex w-full cursor-pointer rounded-sm p-2 hover:bg-white hover:bg-opacity-10"
                key={anime.slug}
            >
                <Image
                    src={anime.image}
                    alt={anime.title}
                    className="object-cover h-20 mr-2 min-w-1/4 max-w-1/4 w-1/4"
                />

                <div className="space-y-1">
                    <h1 className="text-gray-300 text-sm font-bold line-clamp-2">
                        {anime.title}
                    </h1>
                    <p className="text-gray-400 line-clamp-2 text-sm">{anime.episode}</p>
                </div>
            </div>
        </Link>
    );
};

export default SearchAnimeCard;