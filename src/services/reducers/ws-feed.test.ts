import { TFeedActions } from '../actions/ws-feed'
import { getFeedReducer } from './ws-feed'
import { orders } from './test-data'

import { FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FEED_WS_CONNECTING } from '../constants'
import { WebSocketStatus } from '../types/data';
import { initialState } from './ws-feed';


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getFeedReducer(undefined, {} as TFeedActions)
        ).toEqual(
            {
                ...initialState
            }
        )
    })
    it('should handle FEED_WS_CONNECTING', () => {
        expect(
            getFeedReducer(
                {
                    ...initialState
                },
                {
                    type: FEED_WS_CONNECTING
                }
            )
        ).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.CONNECTING,
            }
        )
    })
    it('should handle FEED_WS_OPEN', () => {
        expect(
            getFeedReducer(
                {
                    ...initialState
                },
                {
                    type: FEED_WS_OPEN
                }
            )
        ).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.ONLINE,
            }
        )
    })
    it('should handle FEED_WS_ERROR', () => {
        expect(
            getFeedReducer(
                {
                    ...initialState
                },
                {
                    type: FEED_WS_ERROR,
                    payload: "Error"
                }
            )
        ).toEqual(
            {
                ...initialState,   
                connectionError: "Error",
            }
        )
    })
    it('should handle FEED_WS_MESSAGE', () => {
        expect(
            getFeedReducer(
                {
                    ...initialState,
                    status: WebSocketStatus.ONLINE,
                },
                {
                    type: FEED_WS_MESSAGE,
                    payload: orders
                }
            )
        ).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.ONLINE,
                orders: orders
            }
        )
    })
    it('should handle FEED_WS_CLOSE', () => {
        expect(
            getFeedReducer(
                {
                    ...initialState,
                    status: WebSocketStatus.ONLINE
                },
                {
                    type: FEED_WS_CLOSE,
                }
            )
        ).toEqual(
            {
                ...initialState
            }
        )
    })
    
})
