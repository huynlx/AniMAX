const sortInitialState = {
    index: 0
}
const sort = (state = sortInitialState, action: any) => {
    switch (action.type) {
        case 'SORT':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default sort;