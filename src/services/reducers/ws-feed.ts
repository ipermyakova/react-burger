import { FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FEED_WS_CONNECTING } from '../constants'
import { TOrdersAll, WebSocketStatus } from '../types/data';
import { TFeedActions } from '../actions/ws-feed';

export type TFeedState = {
    status: WebSocketStatus;
    connectionError: string;
    orders: TOrdersAll | null;
}

const initialState: TFeedState = {
    status: WebSocketStatus.OFFLINE,
    connectionError: "",
    orders: null,
}

export const getFeedReducer = (state = initialState, action: TFeedActions) => {
    switch (action.type) {
        case FEED_WS_CONNECTING:
            return { ...state, status: WebSocketStatus.CONNECTING }
        case FEED_WS_OPEN:
            return { ...state, status: WebSocketStatus.ONLINE }
        case FEED_WS_ERROR:
            return { ...state, connectionError: action.payload }
        case FEED_WS_MESSAGE:
            return { ...state, orders: action.payload }
        case FEED_WS_CLOSE:
            return { ...state, status: WebSocketStatus.OFFLINE, orders: null }
        default: {
            return state
        }
    }
}
