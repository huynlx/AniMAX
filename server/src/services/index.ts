import axios from "axios";
import cheerio from "cheerio";
import { parseList, parseSlide, parseInfo, serialize, parseSearchAjax } from '../utils';

const client = axios.create({
    baseURL: "http://animevietsub.tv"
});

export const getSlide = async () => {
    const { data } = await client.get("/");
    const $ = cheerio.load(data);

    return parseSlide($(".MovieListSldCn").html()!);
}

export const getList = async (slug: String = 'anime-moi', page: Number = 1, sort: String = 'latest') => {

    var url = slug.includes('list') ? `/danh-sach/${slug}/////trang-${page}.html?sort=${sort}` : `/${slug}/trang-${page}.html?sort=${sort}`;
    if (slug == 'de-cu') url = ' ';
    const { data } = await client.get(url);
    const $ = cheerio.load(data);
    const totalPage = $('.wp-pagenavi .pages').first().text().split('của')[1];
    const currentPage = $(".current").first().attr('title')!;
    const totalAnime = $('.ml-title-page > span').text().match(/(\d+)/);

    const paginations = {
        totalPage: totalPage ? totalPage.trim() : '1',
        currentPage: currentPage ? currentPage.trim() : '1'
    }

    return {
        data: parseList($(url == ' ' ? '#hot-home > .MovieList.Rows' : '.MovieList.Rows').html()!),
        paginations,
        totalAnime
    }
}

export const getInfo = async (slug: String) => {
    const { data } = await client.get(`/phim/${slug}/`);
    const $ = cheerio.load(data);

    return parseInfo($);
}

export const getWatchInfo = async (slug: String) => {
    const { data } = await client.get(`/phim/${slug}/xem-phim.html`);
    const $ = cheerio.load(data);

    const episodes = $(".list-episode li a").toArray().map((e) => {
        const episode = $(e);
        const id = episode.data("id");
        const hash = episode.data("hash");
        const name = episode.text().trim()

        return { id, hash, name };
    });
    const title = $(".Title").first().text().trim();
    const description = $(".Description").first().text().trim();

    const filmIdRegex = /filmInfo.filmID = parseInt\('(.*?)'\)/g;

    const [_, id] = filmIdRegex.exec(data)!; // return [a,b,c,d,....]

    return {
        id: Number(id),
        episodes,
        title,
        description,
    };
}

export const getSource = async (hash: string, filmId: number) => {
    const { data } = await client.post(
        "/ajax/player?v=2019a", serialize({ // serialize => `link=${hash}&id=${film}`
            link: hash,
            id: filmId,
        })
    );

    const returnObj = {
        source: "",
        type: "",
    };

    if (data.playTech == "api" || data.playTech == "all") {
        if (typeof data.link === "string") {
            returnObj.source = data.link;
        } else {
            returnObj.source = data.link[0].file;
        }
        returnObj.type = "hls";
    } else {
        returnObj.type = "mp4";
        returnObj.source = data.link;
    }

    return returnObj;
}

export const getSearchAjax = async (ajaxSearch: number, keysearch: string) => {
    const { data } = await client.post(
        `/ajax/suggest`, serialize({ // serialize => `ajaxSearch=${ajaxSearch}&keysearch=${keysearch}`
            ajaxSearch: ajaxSearch,
            keysearch: keysearch
        })
    );
    const $ = cheerio.load(data);
    return parseSearchAjax($);
}

export const getSearch = async (keysearch: string, page: number = 1, sort: string = 'latest') => {
    const { data } = await client.get(
        `/tim-kiem/${keysearch}/trang-${page}.html?sort=${sort}`);
    const $ = cheerio.load(data);
    const totalPage = $('.wp-pagenavi .pages').first().text().split('của')[1];
    const currentPage = $(".current").first().attr('title')!;
    const paginations = {
        totalPage: totalPage ? totalPage.trim() : '1',
        currentPage: currentPage ? currentPage.trim() : '1'
    }

    return {
        data: parseList($('.MovieList.Rows').html()!),
        paginations
    }
}