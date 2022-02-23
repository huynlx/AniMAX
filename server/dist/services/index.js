"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearch = exports.getSearchAjax = exports.getSource = exports.getWatchInfo = exports.getInfo = exports.getList = exports.getSlide = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const utils_1 = require("../utils");
const client = axios_1.default.create({
    baseURL: "http://animevietsub.tv"
});
const getSlide = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield client.get("/");
    const $ = cheerio_1.default.load(data);
    return (0, utils_1.parseSlide)($(".MovieListSldCn").html());
});
exports.getSlide = getSlide;
const getList = (slug = 'anime-moi', page = 1, sort = 'latest') => __awaiter(void 0, void 0, void 0, function* () {
    var url = slug.includes('list') ? `/danh-sach/${slug}/////trang-${page}.html?sort=${sort}` : `/${slug}/trang-${page}.html?sort=${sort}`;
    if (slug == 'de-cu')
        url = ' ';
    const { data } = yield client.get(url);
    const $ = cheerio_1.default.load(data);
    const totalPage = $('.wp-pagenavi .pages').first().text().split('của')[1];
    const currentPage = $(".current").first().attr('title');
    const totalAnime = $('.ml-title-page > span').text().match(/(\d+)/);
    const paginations = {
        totalPage: totalPage ? totalPage.trim() : '1',
        currentPage: currentPage ? currentPage.trim() : '1'
    };
    return {
        data: (0, utils_1.parseList)($(url == ' ' ? '#hot-home > .MovieList.Rows' : '.MovieList.Rows').html()),
        paginations,
        totalAnime
    };
});
exports.getList = getList;
const getInfo = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield client.get(`/phim/${slug}/`);
    const $ = cheerio_1.default.load(data);
    return (0, utils_1.parseInfo)($);
});
exports.getInfo = getInfo;
const getWatchInfo = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield client.get(`/phim/${slug}/xem-phim.html`);
    const $ = cheerio_1.default.load(data);
    const episodes = $(".list-episode li a").toArray().map((e) => {
        const episode = $(e);
        const id = episode.data("id");
        const hash = episode.data("hash");
        const name = episode.text().trim();
        return { id, hash, name };
    });
    const title = $(".Title").first().text().trim();
    const description = $(".Description").first().text().trim();
    const filmIdRegex = /filmInfo.filmID = parseInt\('(.*?)'\)/g;
    const [_, id] = filmIdRegex.exec(data); // return [a,b,c,d,....]
    return {
        id: Number(id),
        episodes,
        title,
        description,
    };
});
exports.getWatchInfo = getWatchInfo;
const getSource = (hash, filmId) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield client.post("/ajax/player?v=2019a", (0, utils_1.serialize)({
        link: hash,
        id: filmId,
    }));
    const returnObj = {
        source: "",
        type: "",
    };
    if (data.playTech == "api" || data.playTech == "all") {
        if (typeof data.link === "string") {
            returnObj.source = data.link;
        }
        else {
            returnObj.source = data.link[0].file;
        }
        returnObj.type = "hls";
    }
    else {
        returnObj.type = "mp4";
        returnObj.source = data.link;
    }
    return returnObj;
});
exports.getSource = getSource;
const getSearchAjax = (ajaxSearch, keysearch) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield client.post(`/ajax/suggest`, (0, utils_1.serialize)({
        ajaxSearch: ajaxSearch,
        keysearch: keysearch
    }));
    const $ = cheerio_1.default.load(data);
    return (0, utils_1.parseSearchAjax)($);
});
exports.getSearchAjax = getSearchAjax;
const getSearch = (keysearch, page = 1, sort = 'latest') => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield client.get(`/tim-kiem/${keysearch}/trang-${page}.html?sort=${sort}`);
    const $ = cheerio_1.default.load(data);
    const totalPage = $('.wp-pagenavi .pages').first().text().split('của')[1];
    const currentPage = $(".current").first().attr('title');
    const paginations = {
        totalPage: totalPage ? totalPage.trim() : '1',
        currentPage: currentPage ? currentPage.trim() : '1'
    };
    return {
        data: (0, utils_1.parseList)($('.MovieList.Rows').html()),
        paginations
    };
});
exports.getSearch = getSearch;
