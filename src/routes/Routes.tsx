import { GENRES, SEASONS, TYPES } from "../constants";
import { Route, Type, Genre, Season } from '../types';
import lazyLoading from "../utils/lazyLoading";

const Home = lazyLoading(() => import("../pages/Home"));
const Browse = lazyLoading(() => import("../pages/Browse"));
const Info = lazyLoading(() => import("../pages/Info"));
const Watch = lazyLoading(() => import("../pages/Watch"));
const Error = lazyLoading(() => import("../pages/Error"));
const Rules = lazyLoading(() => import("../pages/Rules"));
const DMCA = lazyLoading(() => import("../pages/DMCA"));
const Contact = lazyLoading(() => import("../pages/Contact"));

const routes: Route[] = [
    {
        name: "TRANG CHỦ",
        path: "/",
        component: Home,
        header: true,
        dropdown: false
    },
    {
        name: "DẠNG ANIME",
        path: "/types/:slug",
        component: Browse,
        header: true,
        dropdown: true,
        dropdownData: TYPES,
        dropdownPath: (data: Type) => `types/${data.slug}`,
        listKey: (data: Type) => data.slug //=> trả về slug
    },
    {
        name: "THỂ LOẠI",
        path: '/genres/:slug',
        component: Browse,
        header: true,
        dropdown: true,
        dropdownData: GENRES,
        dropdownPath: (data: Genre) => `/genres/${data.slug}`,
        listKey: (data: Genre) => data.slug,
    },
    {
        name: "SEASON",
        path: "/seasons/:season/:year",
        component: Browse,
        header: true,
        dropdown: true,
        dropdownData: SEASONS,
        dropdownPath: (data: Season) => `/seasons/${data.season}/${data.year}`,
        listKey: (data: Season) => `${data.season}/${data.year}`,
    },
    {
        name: "Thông tin phim",
        path: "/info/:slug",
        component: Info,
        header: false,
    },
    {
        name: "Xem phim",
        path: "/watch/:slug",
        component: Watch,
        header: false,
    },
    {
        name: "Lỗi cmnr",
        path: "/*",
        component: Error,
        header: false,
    },
    {
        name: "Search",
        path: "/search/:keyword",
        component: Browse,
        header: false,
    },
    {
        name: "Điều khoản",
        path: "/tos",
        component: Rules,
        header: false,
    },
    {
        name: "DMCA",
        path: "/dmca",
        component: DMCA,
        header: false,
    },
    {
        name: "Contact",
        path: "/contact",
        component: Contact,
        header: false,
    }
]

export default routes;