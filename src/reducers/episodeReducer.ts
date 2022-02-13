const episodeInitialState = [{
    index: 0,
    name: '01',
    slug: ''
}]
const episode = (state = episodeInitialState, action: any) => {
    switch (action.type) {
        case "EPISODE":
            return [{ ...state }, action.payload]
        default:
            return state
    }
}

export default episode;