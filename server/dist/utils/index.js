"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSearchAjax = exports.serialize = exports.parseInfo = exports.parseList = exports.parseSlide = exports.parseInfoList = exports.urlToSlug = exports.COMPLETED_TEXT = void 0;
const cheerio_1 = __importDefault(require("cheerio"));
exports.COMPLETED_TEXT = "HOÀNTẤT";
function urlToSlug(url) {
    const parts = url.split("/");
    return parts[parts.length - 2];
}
exports.urlToSlug = urlToSlug;
function parseInfoList(html) {
    if (!html)
        return null;
    const $ = cheerio_1.default.load(html);
    const list = $("a").toArray().map((genre) => {
        const name = $(genre).text().trim();
        const slug = urlToSlug($(genre).attr("href"));
        const path = $(genre).attr("href");
        if (!name && !slug)
            return false;
        return { name, slug, path };
    });
    return list.length > 0 ? list : [];
}
exports.parseInfoList = parseInfoList;
const parseSlide = (html) => {
    const json = [];
    if (!html)
        return null;
    const $ = cheerio_1.default.load(html);
    for (let anime of $(".MovieListSld .TPostMv").toArray()) {
        const url = $("a", anime).attr("href");
        const image = $("img", anime).attr("src");
        const title = $(".Title", anime).text().trim();
        const stars = $(".Vote", anime).text().trim();
        const time = $(".Time", anime).text().trim();
        const date = $(".Date", anime).text().trim();
        const quality = $(".Qlty", anime).text().trim();
        const description = $(".Description p:not([class])", anime).text().trim();
        const studio = $(".Studio", anime).text().trim().replace("Studio: ", "");
        const genres = parseInfoList($(".Genre", anime).html());
        const slug = urlToSlug(url); //https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
        json.push({
            image,
            slug,
            title,
            stars: Number(stars),
            time,
            date,
            quality,
            description,
            studio,
            genres
        });
    }
    return json;
};
exports.parseSlide = parseSlide;
const parseList = (html) => {
    if (!html)
        return null;
    const $ = cheerio_1.default.load(html);
    $.prototype.exists = function (selector) {
        return this.find(selector).length > 0;
    };
    return $(".TPostMv").toArray().map((e) => {
        const item = $(e);
        const url = $("a", item).attr("href");
        const image = $("img", item).attr("src");
        const title = $(".Title", item).first().text().trim();
        const slug = urlToSlug(url);
        const views = $(".Year", item).text().trim().replace("Lượt xem: ", "");
        const stars = $(".anime-avg-user-rating", item).text().trim();
        const quality = $(".Qlty", item).text().trim();
        const time = $(".Time", item).text().trim();
        const date = $(".Date", item).text().trim();
        const description = $(".Description p:not([class])", item).text().trim();
        const studio = $(".Director", item).text().trim().replace("Studio: ", "");
        const genres = parseInfoList($(".Genre", item).html());
        const isCompleted = $(".mli-eps", item).text().trim() === exports.COMPLETED_TEXT;
        const isUpcoming = item.exists(".mli-timeschedule"); //check xem có class này ko
        const currentEpisode = $(".mli-eps i", item).text().trim();
        return {
            stars: Number(stars),
            image,
            title,
            slug,
            views: !views ? null : Number(views.replace(/,/g, "")),
            isCompleted,
            isUpcoming,
            upcomingYear: isUpcoming ? $('.b', item).text().trim() : null,
            totalEpisodes: !isUpcoming && !isCompleted && currentEpisode
                ? Number(currentEpisode)
                : null,
            quality,
            date,
            time,
            description,
            studio,
            genres,
            currentEpisode: currentEpisode == '' ? $(".mli-quality", item).text().trim() : currentEpisode
        };
    });
};
exports.parseList = parseList;
const parseInfo = ($) => {
    const getInfoElement = (name) => {
        const li = $(`.InfoList .AAIco-adjust strong:contains("${name}")`).closest("li");
        li.find("strong").remove();
        return li;
    };
    const backgroundImage = $("img.TPostBg").attr("src");
    const title = $(".TPost.Single .Title").text().trim();
    const altTitle = $(".SubTitle").text().trim();
    const image = $(".Image img").attr("src");
    const description = $(".Description").text().trim();
    const time = $(".TPost.Single .Time").text().trim();
    const date = $(".TPost.Single .Date").text().trim();
    const views = $(".TPost.Single .View").text().trim();
    const includedParts = $(".season_item a").toArray().map((item) => {
        const slug = urlToSlug($(item).attr("href"));
        const name = $(item).text().trim();
        const altName = $(item).attr("title");
        return { slug, name, altName };
    });
    const episodes = $(".latest_eps a").toArray().map((episode) => {
        const slug = urlToSlug($(episode).attr("href"));
        const name = $(episode).text().trim();
        const altName = $(episode).attr("title");
        return { slug, name, altName };
    });
    const status = getInfoElement("Trạng thái").text().trim();
    const showtime = getInfoElement("Lịch chiếu").text().trim();
    const followers = getInfoElement("Số người theo dõi").text().trim();
    const quality = getInfoElement("Chất lượng").text().trim();
    const rating = getInfoElement("Rating").text().trim();
    const language = getInfoElement("Ngôn ngữ").text().trim();
    const studio = getInfoElement("Studio").text().trim();
    const genres = parseInfoList(getInfoElement("Thể loại").html());
    const directors = parseInfoList(getInfoElement("Đạo diễn").html());
    const nations = parseInfoList(getInfoElement("Quốc gia").html());
    const seasons = $("a", getInfoElement("Season")).toArray().map((e) => {
        var _a;
        const genre = $(e);
        const name = genre.text().trim();
        const parts = (_a = genre.attr("href")) === null || _a === void 0 ? void 0 : _a.split("season/");
        const slug = parts === null || parts === void 0 ? void 0 : parts[1].replace(new RegExp("/" + "$"), "");
        return { name, slug };
    });
    const relatedAnime = (0, exports.parseList)($(".MovieListRelated").html());
    return {
        backgroundImage,
        title,
        altTitle,
        image,
        description,
        time,
        date,
        views,
        episodes,
        status,
        showtime,
        followers,
        quality,
        rating,
        language,
        studio,
        genres,
        directors,
        nations,
        seasons,
        relatedAnime,
        includedParts,
    };
};
exports.parseInfo = parseInfo;
const serialize = function (obj) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
};
exports.serialize = serialize;
const parseSearchAjax = ($) => {
    const array = $('li').toArray();
    const animes = [];
    const length = array.length - 1;
    for (const index in array) {
        if (index == String(length)) {
            break;
        }
        const slug = urlToSlug($('.ss-info > a', array[index]).attr('href'));
        const bg = $('a', array[index]).css('background-image');
        const image = bg === null || bg === void 0 ? void 0 : bg.replace('url(', '').replace(')', '').replace(/\'/gi, "");
        const title = $('.ss-title', array[index]).text().trim();
        const episode = $('.ss-info > p', array[index]).text().trim();
        animes.push({
            title,
            episode,
            image,
            slug
        });
    }
    return (animes);
};
exports.parseSearchAjax = parseSearchAjax;
