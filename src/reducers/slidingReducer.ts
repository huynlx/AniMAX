const slidingInitialState = false;
const sliding = (state = slidingInitialState, action: any) => {
    switch (action.type) {
        case 'changeSliding':
            return action.payload
        default:
            return state
    }
}

export default sliding;