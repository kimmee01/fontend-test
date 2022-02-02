import { demoType } from "../actions/demo"

const initialState = {
    name: ''
}

export const demoReducer = (state = initialState, action : any) => {
    switch (action.type) {
        case demoType.UPDATE:
            return action.data
        default:
            return state
    }
}

export default demoReducer