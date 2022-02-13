import { combineReducers } from "redux";
import episode from "./episodeReducer";
import sliding from "./slidingReducer";
import sort from "./sortReducer";
import viewMore from "./viewMore";

var rootReducer = combineReducers({
    episode,
    sliding,
    viewMore,
    sort
});
export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>