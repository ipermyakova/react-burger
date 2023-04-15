import { ORDERS_ALL_WS_CLOSE, ORDERS_ALL_WS_ERROR, ORDERS_ALL_WS_MESSAGE, ORDERS_ALL_WS_OPEN, ORDERS_ALL_WS_CONNECTING} from '../constants'
import { TOrdersAll, WebSocketStatus } from '../types/data';
import { TOrdersAllActions } from '../actions/ws-orders-all';

export type TOrdersALLState = {
    status: WebSocketStatus;
    connectionError: string;
    orders: TOrdersAll | null;
}

const initialState: TOrdersALLState = {
    status: WebSocketStatus.OFFLINE,
    connectionError: "",
    orders: null,
}

export const getOrdersAllReducer = (state = initialState, action: TOrdersAllActions) => {
    switch (action.type) {
        case ORDERS_ALL_WS_CONNECTING:
            return { ...state, status: WebSocketStatus.CONNECTING }  
        case ORDERS_ALL_WS_OPEN:
            return { ...state, status: WebSocketStatus.ONLINE }
        case ORDERS_ALL_WS_ERROR:
            return { ...state, connectionError: action.payload }   
        case ORDERS_ALL_WS_MESSAGE: 
            return { ...state, orders: action.payload }
        case ORDERS_ALL_WS_CLOSE: 
            return { ...state, status: WebSocketStatus.OFFLINE }               
        default: {
            return state
        }         
    }
}
