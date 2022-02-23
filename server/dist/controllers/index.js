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
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class AnimeController {
    static getSlide(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const slideList = yield (0, services_1.getSlide)();
            try {
                res.json({
                    success: true,
                    data: slideList
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, sort = 'latest' } = req.query;
            const { slug = "anime-moi" } = req.params;
            try {
                const list = yield (0, services_1.getList)(slug, page, sort);
                res.json({
                    success: true,
                    data: list.data,
                    pagination: list.paginations,
                    total: list.totalAnime
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getGenreList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, sort = 'latest' } = req.query;
            const { slug = "hanh-dong" } = req.params;
            const prefix = "the-loai";
            try {
                const list = yield (0, services_1.getList)(`${prefix}/${slug}`, page, sort);
                res.json({
                    success: true,
                    data: list.data,
                    pagination: list.paginations,
                    total: list.totalAnime
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getSeasonList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, sort = 'latest' } = req.query;
            const { season = "winter", year = "2021" } = req.params;
            const prefix = "season";
            try {
                const list = yield (0, services_1.getList)(`${prefix}/${season}/${year}`, page, sort);
                res.json({
                    success: true,
                    data: list.data,
                    pagination: list.paginations,
                    total: list.totalAnime
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            try {
                const list = yield (0, services_1.getInfo)(slug);
                res.json({
                    success: true,
                    data: list,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getWatchInfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = req.params;
            try {
                const data = yield (0, services_1.getWatchInfo)(slug);
                res.json({ success: true, data });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getSource(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { hash, id } = req.query;
            try {
                const data = yield (0, services_1.getSource)(hash, id);
                res.json({ success: true, data });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getSearchAjax(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ajaxSearch = 1, keysearch } = req.query;
            try {
                const list = yield (0, services_1.getSearchAjax)(ajaxSearch, keysearch);
                res.json({
                    success: true,
                    data: list
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getSearch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page = 1, sort = 'latest' } = req.query;
            const { keysearch } = req.params;
            try {
                const list = yield (0, services_1.getSearch)(keysearch, page, sort);
                res.json({
                    success: true,
                    data: list.data,
                    pagination: list.paginations,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = AnimeController;
