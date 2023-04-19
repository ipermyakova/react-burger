import thunk from 'redux-thunk'
import { ORDERS_CONNECT, ORDERS_DISCONNECT, ORDERS_WS_CLOSE, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN, ORDERS_WS_CONNECTING, ORDERS_SEND,
    FEED_CONNECT, FEED_DISCONNECT, FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FEED_WS_CONNECTING, FEED_SEND } from './constants'

import  * as reducers  from './reducers'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux' 
import { composeWithDevTools } from '@redux-devtools/extension'
import { createSocketMiddleware } from './middleware/socket-middleware'

const ordersWsActions = {
    connect: ORDERS_CONNECT,
    disconnect: ORDERS_DISCONNECT,
    wsConnecting: ORDERS_WS_CONNECTING,
    wsOpen: ORDERS_WS_OPEN,
    wsClose: ORDERS_WS_CLOSE,
    wsMessage: ORDERS_WS_MESSAGE,
    wsError: ORDERS_WS_ERROR, 
    send: ORDERS_SEND
}

const feedWsActions = {
    connect: FEED_CONNECT,
    disconnect: FEED_DISCONNECT,
    wsConnecting: FEED_WS_CONNECTING,
    wsOpen: FEED_WS_OPEN,
    wsClose: FEED_WS_CLOSE,
    wsMessage: FEED_WS_MESSAGE,
    wsError: FEED_WS_ERROR, 
    send: FEED_SEND
}

const createReducer = () => combineReducers({
    ...reducers
})

const middleware = [thunk, createSocketMiddleware(feedWsActions), createSocketMiddleware(ordersWsActions)]

const enhancer = composeWithDevTools(
    applyMiddleware(...middleware)
)   
const store = createStore(createReducer(), enhancer)

export default store