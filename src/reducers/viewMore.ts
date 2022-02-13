const viewMoreInitialState = [{
    slug: '',
    viewMore: false
}]
const viewMore = (state = viewMoreInitialState, action: any) => {
    switch (action.type) {
        case 'changeViewMore':
            return [{ ...state }, action.payload]
        default:
            return state
    }
}
export default viewMore;