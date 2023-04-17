import thunk from 'redux-thunk'

import  * as reducers  from './reducers'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux' 
import { composeWithDevTools } from '@redux-devtools/extension'
import { 
    connect as OrdersAllWsConnect,
    disconnect as OrdersAllWsDisconnect,
    wsConnecting as OrdersAllWsConnecting,
    wsOpen as OrdersAllWsOpen,
    wsClose as OrdersAllWsClose,
    wsMessage as OrdersAllWsMessage,
    wsError as OrdersAllWsError,
    send as OrderAllWsSend
} from './actions/ws-orders-all'
import { createSocketMiddleware } from './middleware/socket-middleware'

const wsActions = {
    connect: OrdersAllWsConnect,
    disconnect: OrdersAllWsDisconnect,
    wsConnecting: OrdersAllWsConnecting,
    wsOpen: OrdersAllWsOpen,
    wsClose: OrdersAllWsClose,
    wsMessage: OrdersAllWsMessage,
    wsError: OrdersAllWsError, 
    send: OrderAllWsSend
}

const websocketMiddleware = createSocketMiddleware(wsActions)

const createReducer = () => combineReducers({
    ...reducers
})

const middleware = [thunk, websocketMiddleware]

const enhancer = composeWithDevTools(
    applyMiddleware(...middleware)
)   
const store = createStore(createReducer(), enhancer)

export default store