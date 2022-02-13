import React from 'react';
import { useQuery } from 'react-query';
import { getSource } from './anime';

const useFetchSource = (
    hash?: string,
    id?: number,
    enabled?: boolean
) => {
    return useQuery(['source', { hash, id }], () => getSource(hash!, id!), { enabled })
};

export default useFetchSource;