import React from 'react';
import { useQuery } from 'react-query';
import { getList } from './anime';

//list & search infinity scroll
const useFetchList = (category: string, slug: string) => {
    return useQuery([category, slug], () => getList({category, slug}));
};

export default useFetchList;