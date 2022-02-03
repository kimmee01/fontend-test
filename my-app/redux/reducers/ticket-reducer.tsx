import { updateList } from "../actions/ticket.action"

const initialState : any[] = []


export const TicketReducer = (state = initialState, action : any) => {
    switch (action.type) {
        case updateList.UPDATE:
            return action.data
        default:
            return state
    }
}

export default TicketReducer