import { getSlide } from "./anime";
import { useQuery } from "react-query";

const useFetchSlide = () => {
    return useQuery("slides", getSlide); //ko có đối số truyền vào thì viết kiểu này
}

export default useFetchSlide;