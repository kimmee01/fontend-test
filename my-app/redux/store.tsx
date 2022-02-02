import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk"
import rootReducers from './reducers/rootReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
const middleware = [thunk]


const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware)),
  )

export default store