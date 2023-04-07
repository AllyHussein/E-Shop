import {createStore ,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from "./reducers/rootReducer"
const initalState = {}
const middleWare = [thunk]

const store = createStore(rootReducer , initalState , applyMiddleware(...middleWare))

export default store