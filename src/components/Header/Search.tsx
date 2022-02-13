import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import useFetchSearch from '../../apis/useFetchSearch';
import Loader from '../Loader/Loader';
import Input from './Input';
import SearchAnimeCard from './SearchAnimeCard';

const Search = () => {
    const [showResultPanel, setShowResultPanel] = useState(false);
    const [keyword, setKeyword] = useState("");
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const [cache, setCache] = useState([]);
    const navigate = useNavigate();

    const { data: dataSearch, isLoading: isLoadingSearch, refetch } = useFetchSearch(keyword);

    const handleKeywordChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setKeyword(e.target.value);

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => refetch(), 0);

    };

    const handleShowResultPanel = (isVisible: boolean) => {
        return () => {
            setShowResultPanel(isVisible);
        };
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (keyword !== '') {
                navigate(`/search/${keyword}`);
                e.target.blur();
                e.target.value = '';
                setKeyword(e.target.value);
            } else {
                alertPopup();
            }
        }
    }

    const alertPopup = () => {
        alert("Bạn chưa nhập từ khóa. (Không tính các ký tự đặc biệt vào độ dài từ khóa)")
    }

    useEffect(() => {
        if (dataSearch) {
            setCache(dataSearch.data);
        }
    }, [dataSearch])

    return (
        <div className="relative xl:w-64 md:w-44">
            <div className="flex items-center p-2 border-gray-600 border bg-background-darker rounded-sm">
                <AiOutlineSearch onClick={() => keyword !== '' ? navigate('/search/' + keyword) : alertPopup()} size={20} className="text-gray-500 mr-2" />
                <Input
                    onFocus={handleShowResultPanel(true)}
                    onBlur={handleShowResultPanel(false)}
                    type="text"
                    placeholder="Tìm kiếm"
                    onChange={handleKeywordChange}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />
            </div>
            <Transition
                show={keyword ? showResultPanel : false}
                as={Fragment}
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-300 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <div
                    className={classNames(
                        "absolute space-y-2 w-full h-auto rounded-sm bg-background-lighter mt-1"
                    )}
                >
                    {isLoadingSearch ? (
                        // <>
                        //     <div className="flex items-center py-2 justify-center w-full">
                        //         <ImSpinner2 size={20} className=' animate-spin' />
                        //     </div>
                        // </>
                        cache?.map((anime: any) => (
                            <SearchAnimeCard key={anime.slug} {...anime} />
                        ))
                    ) : cache.length > 0 ? (
                        cache?.map((anime: any) => (
                            <SearchAnimeCard key={anime.slug} {...anime} />
                        ))
                    ) : (<p className='p-2 font-bold text-gray-300 text-sm'>Không tìm thấy kết quả.</p>)}

                    <Link to={`/search/${keyword}`}>
                        <div className="flex p-2 cursor-pointer rounded-b-sm bg-secondary justify-center">
                            <div className="text-white text-base font-bold">
                                Enter để tìm kiếm
                            </div>
                        </div>
                    </Link>
                </div>
            </Transition>
        </div>
    );
};

export default Search;