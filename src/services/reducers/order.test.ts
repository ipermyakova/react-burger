import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS, SEND_ORDER_SUCCESS, SEND_ORDER_REQUEST, SEND_ORDER_FAILED } from '../constants'
import { TOrderActions } from '../actions/order'
import { getOrderReducer } from './order'
import { order1, order2 } from './test-data'


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getOrderReducer(undefined, {} as TOrderActions)
        ).toEqual(
            {
                isLoading: false,
                hasError: false,
                orderData: null
            }
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            getOrderReducer(
                {
                    orderData: null,
                    isLoading: false,
                    hasError: false
                },
                {
                    type: GET_ORDER_REQUEST
                }
            )
        ).toEqual(
            {
                orderData: null,
                isLoading: true,
                hasError: false,
            }
        )
    })
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            getOrderReducer(
                {
                    orderData: null,
                    isLoading: false,
                    hasError: false
                },
                {
                    type: GET_ORDER_SUCCESS,
                    order: order1
                }
            )
        ).toEqual(
            {
                orderData: order1,
                isLoading: false,
                hasError: false,
            }
        )
    })
    it('should handle GET_ORDER_FAILED', () => {
        expect(
            getOrderReducer(
                {
                    orderData: null,
                    isLoading: false,
                    hasError: false
                },
                {
                    type: GET_ORDER_FAILED
                }
            )
        ).toEqual(
            {
                orderData: null,
                isLoading: false,
                hasError: true
            }
        )
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(
            getOrderReducer(
                {
                    orderData: null,
                    isLoading: false,
                    hasError: false
                },
                {
                    type: SEND_ORDER_SUCCESS,
                    order: {...order2}
                }
            )
        ).toEqual(
            {
                orderData: {...order2},
                isLoading: false,
                hasError: false
            }
        )
    })
    it('should handle SEND_ORDER_REQUEST', () => {
        expect(
            getOrderReducer(
                {
                    orderData: null,
                    isLoading: false,
                    hasError: false
                },
                {
                    type: SEND_ORDER_REQUEST
                }
            )
        ).toEqual(
            {
                orderData: null,
                isLoading: true,
                hasError: false
            }
        )
    })  
    it('should handle SEND_ORDER_FAILED', () => {
        expect(
            getOrderReducer(
                {
                    orderData: null,
                    isLoading: false,
                    hasError: false
                },
                {
                    type: SEND_ORDER_FAILED
                }
            )
        ).toEqual(
            {
                orderData: null,
                isLoading: false,
                hasError: true
            }
        )
    })
    it('should handle REMOVE_ORDER_DETAILS', () => {
        expect(
            getOrderReducer(
                {
                    orderData: {...order2},
                    isLoading: false,
                    hasError: false
                },
                {
                    type: REMOVE_ORDER_DETAILS
                }
            )
        ).toEqual(
            {
                orderData: null,
                isLoading: false,
                hasError: false,
            }
        )
    })      
})
