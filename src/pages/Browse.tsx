import React, { useEffect, useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import useBrowseList from '../apis/useBrowseList';
import AnimeCard from '../components/BrowserPage/AnimeCard';
import Select from '../components/BrowserPage/Select';
import Loader from '../components/Loader/Loader';
import { GENRES, SEASONS, TYPES, SORTS } from '../constants';
import ProgressBarLoading from '../utils/ProgressBar';
import { RootState } from '../reducers';
import classNames from 'classnames';

const ALL = [...TYPES, ...GENRES, ...SEASONS];

const Browse = () => {
    const dispatch = useDispatch();
    const selectSort = useSelector((state: RootState) => state.sort);

    const [selectedSorting, setSelectedSorting] = useState(SORTS[selectSort.index].slug);
    const { pathname } = useLocation();

    const [category, ...slug] = pathname.replace("/", "").split("/");

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useBrowseList({ category, sort: selectedSorting, slug: slug.join("/") });

    const [sentryRef] = useInfiniteScroll({
        loading: isFetchingNextPage,
        hasNextPage: !!hasNextPage,
        onLoadMore: fetchNextPage,
        rootMargin: "0px 0px 100px 0px",
    });

    const handleSortingSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedSorting(e.target.value);
        dispatch({ type: 'SORT', payload: { index: SORTS.findIndex(item => item.slug === e.target.value) } });
    };

    const current = ALL.find((type) => pathname.includes(type.slug)); //lọc ra cái nào có slug nằm trong pathname

    const list = data?.pages.map((list) => list.data).flat(); //lọc ra mảng data

    useEffect(() => {
        document.title = "Browser - AniMAX"
    }, [])

    return (
        <>
            <div className="w-full">
                <div className="w-full p-2">
                    <div className="flex items-center justify-between">
                        <p className="text-white font-bold text-3xl">{!current?.name ? `KẾT QUẢ TÌM KIẾM: \xa0'${decodeURI(slug[0].toUpperCase())}'` : current?.name}</p>
                        <Select value={selectedSorting} onChange={handleSortingSelectChange} className='bg-black'>
                            {
                                SORTS.map(sort => (
                                    <option value={sort.slug} key={sort.slug}>
                                        {sort.name}
                                    </option>
                                ))
                            }
                        </Select>
                    </div>

                    {isLoading && (
                        <div className="w-full flex justify-center items-center">
                            <ProgressBarLoading />
                            <Loader />
                        </div>
                    )}

                    <div className="my-6 flex flex-wrap">
                        {
                            !isLoading && list?.map(anime => (
                                <div
                                    className="mt-2 -mr-0 pr-2 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7"
                                    key={anime.slug}
                                >
                                    <AnimeCard {...anime} />
                                </div>
                            ))
                        }
                    </div>

                    {(hasNextPage) && (
                        <div ref={sentryRef} className='flex justify-center pt-5'>
                            <ImSpinner3 size={20} className="text-white animate-spin mr-2" />
                        </div>
                    )}
                    {
                        (!hasNextPage && !isLoading) && (<h1 className={classNames('text-2xl text-center font-semibold', list?.length == 0 ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : 'pt-6')}>{list?.length == 0 ? 'Kết quả không tìm thấy!' : '-  The End  -'}</h1>)
                    }
                    {
                        isFetchingNextPage && <ProgressBarLoading />
                    }
                </div>
            </div>
        </>
    );
};

export default Browse;