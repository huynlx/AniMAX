import useFetchSlide from '../../apis/useFetchSlide';
import { memo, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Slide from './Slide';
import Carousel from './Carousel';
import Section from './Section';
import useFetchList from '../../apis/useFetchList';
import ProgressBarLoading from '../../utils/ProgressBar';
import useFetchSearch from '../../apis/useFetchSearch';

const Index = memo(() => {
    const { data: slides, isLoading: isSlideLoading } = useFetchSlide(); // => data as slides (dùng với tên slides)

    const { data: latestList, isLoading: isLatestLoading } = useFetchList('types', 'anime-moi');
    const { data: upcomingList, isLoading: isUpcomingLoading } = useFetchList("types", "anime-sap-chieu");
    const { data: decuList, isLoading: isDecuLoading } = useFetchList("types", "de-cu");
    
    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    return (
        <div className='w-full space-y-6'>
            <div className='hidden md:block'>
                {
                    isSlideLoading ? <ProgressBarLoading /> :
                        <Carousel>
                            {slides?.map((slide) => (
                                <Slide {...slide} key={slide.slug} />
                            ))}
                        </Carousel>
                }
            </div>

            <div className='space-y-6'>
                <Section title='MỚI CẬP NHẬT' data={latestList?.data} isLoading={isLatestLoading} />
            </div>

            <div className='space-y-6'>
                <Section title='SẮP CHIẾU' data={upcomingList?.data} isLoading={isUpcomingLoading} />
            </div>

            <div className='space-y-6'>
                <Section title='ĐỀ CỬ' data={decuList?.data} isLoading={isDecuLoading} />
            </div>
        </div>
    );
});

export default Index;