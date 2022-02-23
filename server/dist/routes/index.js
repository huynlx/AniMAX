"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//@ts-ignore
const cors_anywhere_1 = __importDefault(require("cors-anywhere"));
const index_1 = __importDefault(require("../controllers/index"));
let proxy = cors_anywhere_1.default.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [], // Do not remove any headers.
});
const router = express_1.default.Router();
router.get("/slide", index_1.default.getSlide);
router.get("/types/:slug", index_1.default.getList);
router.get("/genres/:slug", index_1.default.getGenreList);
router.get("/seasons/:season/:year", index_1.default.getSeasonList);
router.get("/info/:slug", index_1.default.getInfo);
router.get("/watch/:slug", index_1.default.getWatchInfo);
router.get("/source/", index_1.default.getSource);
router.get("/search", index_1.default.getSearchAjax);
router.get("/search/:keysearch", index_1.default.getSearch);
router.get("/cors/:proxyUrl*", (req, res) => {
    req.url = req.url.replace("/cors/", "/"); // => Strip '/proxy' from the front of the URL, else the proxy won't work.
    proxy.emit("request", req, res);
});
exports.default = router;
