import { getWatchInfo } from "./anime";
import { useQuery } from "react-query";

const useFetchWatchInfo = (slug: string) => useQuery(["watch-info", slug], () => getWatchInfo(slug));

export default useFetchWatchInfo;