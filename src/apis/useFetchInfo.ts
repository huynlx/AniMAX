import { getInfo } from "./anime";
import { useQuery } from "react-query";

const useFetchInfo = (slug: string) => {
    return useQuery(["infos", slug], () => getInfo(slug)); //có đối số truyền vào thì viết kiểu này
}

export default useFetchInfo;