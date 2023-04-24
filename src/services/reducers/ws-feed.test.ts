import { TFeedActions } from '../actions/ws-feed'
import { getFeedReducer } from './ws-feed'
import { orders } from './test-data'

import { FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FEED_WS_CONNECTING } from '../constants'
import { WebSocketStatus } from '../types/data';


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getFeedReducer(undefined, {} as TFeedActions)
        ).toEqual(
            {
                status: WebSocketStatus.OFFLINE,
                connectionError: "",
                orders: null
            }
        )
    })
    it('should handle FEED_WS_CONNECTING', () => {
        expect(
            getFeedReducer(
                {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: FEED_WS_CONNECTING
                }
            )
        ).toEqual(
            {
                    status: WebSocketStatus.CONNECTING,
                    connectionError: "",
                    orders: null
            }
        )
    })
    it('should handle FEED_WS_OPEN', () => {
        expect(
            getFeedReducer(
                {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: FEED_WS_OPEN
                }
            )
        ).toEqual(
            {
                    status: WebSocketStatus.ONLINE,
                    connectionError: "",
                    orders: null
            }
        )
    })
    it('should handle FEED_WS_ERROR', () => {
        expect(
            getFeedReducer(
                {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: FEED_WS_ERROR,
                    payload: "Error"
                }
            )
        ).toEqual(
            {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "Error",
                    orders: null
            }
        )
    })
    it('should handle FEED_WS_MESSAGE', () => {
        expect(
            getFeedReducer(
                {
                    status: WebSocketStatus.ONLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: FEED_WS_MESSAGE,
                    payload: orders
                }
            )
        ).toEqual(
            {
                    status: WebSocketStatus.ONLINE,
                    connectionError: "",
                    orders: orders
            }
        )
    })
    it('should handle FEED_WS_CLOSE', () => {
        expect(
            getFeedReducer(
                {
                    status: WebSocketStatus.ONLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: FEED_WS_CLOSE,
                }
            )
        ).toEqual(
            {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
            }
        )
    })
    
})
