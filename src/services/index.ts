import thunk from 'redux-thunk'

import  * as reducers  from './reducers'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux' 
import { composeWithDevTools } from '@redux-devtools/extension'

const createReducer = () => combineReducers({
    ...reducers
})

const enhancer = composeWithDevTools(
    applyMiddleware(thunk)
)   
const store = createStore(createReducer(), enhancer)

export type AppDispatch = typeof store.dispatch

export default store