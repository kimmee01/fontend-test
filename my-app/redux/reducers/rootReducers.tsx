import { combineReducers } from "redux"
import TicketReducer from "./ticket-reducer"
export interface DefaultRootState {
    TicketReducer : any
}
const rootReducers = combineReducers({
    TicketReducer
})

export default rootReducers