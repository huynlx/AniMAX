import React from 'react';
import { useInfiniteQuery } from 'react-query';
import { getList } from './anime';

interface Props {
    category: string;
    slug: string;
    sort: string;
}
const useBrowseList = (props: Props) => {
    const fetchList = ({ pageParam = 1 }) => getList({ ...props, page: pageParam });

    return useInfiniteQuery(["browse", props], fetchList, {
        getNextPageParam: ({ pagination }) =>
            Number(pagination.currentPage) >= Number(pagination.totalPage)
                ? null
                : Number(pagination.currentPage) + 1,
    });
};

export default useBrowseList;