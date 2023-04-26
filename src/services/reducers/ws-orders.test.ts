import { getOrdersReducer } from './ws-orders'
import { orders } from './test-data'

import { ORDERS_WS_CLOSE, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN, ORDERS_WS_CONNECTING } from '../constants'
import { WebSocketStatus } from '../types/data';
import { TOrdersActions } from '../actions/ws-orders';
import { initialState } from './ws-orders';

describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getOrdersReducer(undefined, {} as TOrdersActions)
        ).toEqual(
            {
                ...initialState 
            }
        )
    })
    it('should handle ORDERS_WS_CONNECTING', () => {
        expect(
            getOrdersReducer(
                {
                    ...initialState 
                },
                {
                    type: ORDERS_WS_CONNECTING
                }
            )
        ).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.CONNECTING,
            }
        )
    })
    it('should handle ORDERS_WS_OPEN', () => {
        expect(
            getOrdersReducer(
                {
                    ...initialState,
                },
                {
                    type: ORDERS_WS_OPEN
                }
            )
        ).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.ONLINE,
            }
        )
    })
    it('should handle ORDERS_WS_ERROR', () => {
        expect(
            getOrdersReducer(
                {
                    ...initialState
                },
                {
                    type: ORDERS_WS_ERROR,
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
    it('should handle ORDERS_WS_MESSAGE', () => {
        expect(
            getOrdersReducer(
                {
                    ...initialState,
                    status: WebSocketStatus.ONLINE,
                },
                {
                    type: ORDERS_WS_MESSAGE,
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
    it('should handle ORDERS_WS_CLOSE', () => {
        expect(
            getOrdersReducer(
                {
                    ...initialState,
                    status: WebSocketStatus.ONLINE,
                },
                {
                    type: ORDERS_WS_CLOSE,
                }
            )
        ).toEqual(
            {
                ...initialState,
                status: WebSocketStatus.OFFLINE,
            }
        )
    })
    
})
