import { ORDERS_WS_CLOSE, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN, ORDERS_WS_CONNECTING } from '../constants'
import { TOrdersAll, WebSocketStatus } from '../types/data';
import { TOrdersActions } from '../actions/ws-orders';

export type TOrdersState = {
    status: WebSocketStatus;
    connectionError: string;
    orders: TOrdersAll | null;
}

export const initialState: TOrdersState = {
    status: WebSocketStatus.OFFLINE,
    connectionError: "",
    orders: null,
}

export const getOrdersReducer = (state = initialState, action: TOrdersActions) => {
    switch (action.type) {
        case ORDERS_WS_CONNECTING:
            return { ...state, status: WebSocketStatus.CONNECTING }
        case ORDERS_WS_OPEN:
            return { ...state, status: WebSocketStatus.ONLINE }
        case ORDERS_WS_ERROR:
            return { ...state, connectionError: action.payload }
        case ORDERS_WS_MESSAGE:
            return { ...state, orders: action.payload }
        case ORDERS_WS_CLOSE:
            return { ...state, status: WebSocketStatus.OFFLINE, orders: null }
        default: {
            return state
        }
    }
}
