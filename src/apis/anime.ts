import axios from "axios";
import { API_URL } from "../constants";
import { Anime, AnimeInfo, AnimeWatchInfo, Source } from "../types";

const instance = axios.create({
    baseURL: API_URL,
});

export const getSlide = async (): Promise<Anime[]> => {
    const { data } = await instance.get("/slide");

    return data.data;
};

export const getInfo = async (slug: string): Promise<AnimeInfo> => {
    const { data } = await instance.get(`/info/${slug}`);

    return data.data;
};

export const getWatchInfo = async (slug: string): Promise<AnimeWatchInfo> => {
    const { data } = await instance.get(`/watch/${slug}`);

    return data.data;
};

export const getSource = async (hash: string, id: number): Promise<Source> => {
    const { data } = await instance.get(`/source`, { params: { hash, id } });

    return data.data;
};

interface GetListData {
    category: string;
    slug: string;
    sort?: string;
    page?: number;
}


interface GetListResponse {
    success: boolean;
    data: Anime[];
    pagination: {
        totalPage: number;
        currentPage: number;
    };
}

export const getList = async ({ category, slug, ...rest }: GetListData): Promise<GetListResponse> => {
    const { data } = await instance.get(`/${category}/${slug}`, {
        params: rest,
    });

    return data;
}

export const getSearch = async (keysearch: any): Promise<any> => {
    const { data } = await instance.get(`/search`, {
        params: {
            ...keysearch,
            ajaxSearch: 1
        },
    });

    return data;
}


