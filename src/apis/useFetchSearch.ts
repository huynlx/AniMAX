//search ajax
import React from 'react';
import { useQuery } from 'react-query';
import { getSearch } from './anime';

//search ajax
const useFetchSearch = (keysearch: string) => {
    return useQuery(['search', keysearch], () => getSearch({ keysearch }), { enabled: false });
};

export default useFetchSearch;