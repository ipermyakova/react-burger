import { getOrdersReducer } from './ws-orders'
import { orders } from './test-data'

import { ORDERS_WS_CLOSE, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN, ORDERS_WS_CONNECTING } from '../constants'
import { WebSocketStatus } from '../types/data';
import { TOrdersActions } from '../actions/ws-orders';


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getOrdersReducer(undefined, {} as TOrdersActions)
        ).toEqual(
            {
                status: WebSocketStatus.OFFLINE,
                connectionError: "",
                orders: null
            }
        )
    })
    it('should handle ORDERS_WS_CONNECTING', () => {
        expect(
            getOrdersReducer(
                {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: ORDERS_WS_CONNECTING
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
    it('should handle ORDERS_WS_OPEN', () => {
        expect(
            getOrdersReducer(
                {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: ORDERS_WS_OPEN
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
    it('should handle ORDERS_WS_ERROR', () => {
        expect(
            getOrdersReducer(
                {
                    status: WebSocketStatus.OFFLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: ORDERS_WS_ERROR,
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
    it('should handle ORDERS_WS_MESSAGE', () => {
        expect(
            getOrdersReducer(
                {
                    status: WebSocketStatus.ONLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: ORDERS_WS_MESSAGE,
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
    it('should handle ORDERS_WS_CLOSE', () => {
        expect(
            getOrdersReducer(
                {
                    status: WebSocketStatus.ONLINE,
                    connectionError: "",
                    orders: null
                },
                {
                    type: ORDERS_WS_CLOSE,
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
