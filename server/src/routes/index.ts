import express from 'express';

//@ts-ignore
import corsAnywhere from "cors-anywhere";
import AnimeController from "../controllers/index";

let proxy = corsAnywhere.createServer({
    originWhitelist: [], // Allow all origins
    requireHeaders: [], // Do not require any headers.
    removeHeaders: [], // Do not remove any headers.
});

const router = express.Router();

router.get("/slide", AnimeController.getSlide);
router.get("/types/:slug", AnimeController.getList);
router.get("/genres/:slug", AnimeController.getGenreList);
router.get("/seasons/:season/:year", AnimeController.getSeasonList);
router.get("/info/:slug", AnimeController.getInfo);
router.get("/watch/:slug", AnimeController.getWatchInfo);
router.get("/source/", AnimeController.getSource);
router.get("/search", AnimeController.getSearchAjax);
router.get("/search/:keysearch", AnimeController.getSearch);

router.get("/cors/:proxyUrl*", (req, res) => { //bypass cors => để call các route url khác chưa được định nghĩa  
    req.url = req.url.replace("/cors/", "/"); // => Strip '/proxy' from the front of the URL, else the proxy won't work.
    proxy.emit("request", req, res);
});

export default router;