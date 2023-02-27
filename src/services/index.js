import thunk from 'redux-thunk'

import  * as reducers  from './reducers'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux' 

const createReducer = () => combineReducers({
    ...reducers
})

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose; 

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    )   
const store = createStore(createReducer(), enhancer)

export default store