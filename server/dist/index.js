"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const routes_1 = __importDefault(require("./routes"));
const cache_1 = __importDefault(require("./middlewares/cache"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); //đọc req.body của post request
app.use((0, cache_1.default)(3600));
app.use("/api/v1", routes_1.default);
app.use(errorHandler_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
// @ts-ignore
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
});
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});
