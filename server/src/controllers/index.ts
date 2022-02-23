import { NextFunction, Request, Response } from "express";
import { getSlide, getList, getInfo, getWatchInfo, getSource, getSearchAjax, getSearch } from '../services';


export default class AnimeController {
    static async getSlide(_req: Request, res: Response, next: NextFunction) {
        const slideList = await getSlide();

        try {
            res.json({
                success: true,
                data: slideList
            })
        } catch (error) {
            next(error);
        }
    }

    static async getList(req: Request<{ slug: string }, unknown, unknown, { sort: string, page: number }>, res: Response, next: NextFunction) {
        const { page = 1, sort = 'latest' } = req.query;
        const { slug = "anime-moi" } = req.params;

        try {
            const list = await getList(slug, page, sort);

            res.json({
                success: true,
                data: list.data,
                pagination: list.paginations,
                total: list.totalAnime
            });
        } catch (err) {
            next(err);
        }
    }

    static async getGenreList(req: Request<{ slug: string }, unknown, unknown, { sort: string, page: number }>, res: Response, next: NextFunction) {
        const { page = 1, sort = 'latest' } = req.query;
        const { slug = "hanh-dong" } = req.params;
        const prefix = "the-loai";

        try {
            const list = await getList(`${prefix}/${slug}`, page, sort)
            res.json({
                success: true,
                data: list.data,
                pagination: list.paginations,
                total: list.totalAnime
            })
        } catch (error) {
            next(error)
        }
    }

    static async getSeasonList(req: Request<{ season: string; year: string }, unknown, unknown, { sort: string, page: number }>, res: Response, next: NextFunction) {
        const { page = 1, sort = 'latest' } = req.query;
        const { season = "winter", year = "2021" } = req.params;
        const prefix = "season";

        try {
            const list = await getList(`${prefix}/${season}/${year}`, page, sort);
            res.json({
                success: true,
                data: list.data,
                pagination: list.paginations,
                total: list.totalAnime
            });
        } catch (error) {
            next(error)
        }
    }

    static async getInfo(req: Request<{ slug: string }, unknown, unknown, unknown>, res: Response, next: NextFunction) {
        const { slug } = req.params;

        try {
            const list = await getInfo(slug);
            res.json({
                success: true,
                data: list,
            });
        } catch (err) {
            next(err);
        }
    }

    static async getWatchInfo(req: Request<{ slug: string }, unknown, unknown, unknown>, res: Response, next: NextFunction) {
        const { slug } = req.params;

        try {
            const data = await getWatchInfo(slug);

            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }

    static async getSource(req: Request<unknown, unknown, unknown, { hash: string; id: number }>, res: Response, next: NextFunction) {
        const { hash, id } = req.query;

        try {
            const data = await getSource(hash, id);

            res.json({ success: true, data });
        } catch (err) {
            next(err);
        }
    }

    static async getSearchAjax(req: Request<unknown, unknown, unknown, { ajaxSearch: number; keysearch: string }>, res: Response, next: NextFunction) {
        const { ajaxSearch = 1, keysearch } = req.query;

        try {
            const list = await getSearchAjax(ajaxSearch, keysearch);

            res.json({
                success: true,
                data: list
            });
        } catch (err) {
            next(err);
        }
    }

    static async getSearch(req: any, res: any, next: any) { //như này cho nó nhanh :))
        const { page = 1, sort = 'latest' } = req.query;
        const { keysearch } = req.params;

        try {
            const list = await getSearch(keysearch, page, sort);

            res.json({
                success: true,
                data: list.data,
                pagination: list.paginations,
            });
        } catch (err) {
            next(err);
        }
    }
}

