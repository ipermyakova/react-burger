import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS, SEND_ORDER_SUCCESS, SEND_ORDER_REQUEST, SEND_ORDER_FAILED } from '../constants'
import { TOrderActions } from '../actions/order'
import { getOrderReducer } from './order'
import { order1, order2 } from './test-data'
import { initialState } from './order'



describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getOrderReducer(undefined, {} as TOrderActions)
        ).toEqual(
            {
                ...initialState
            }
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState
                },
                {
                    type: GET_ORDER_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState,
                },
                {
                    type: GET_ORDER_SUCCESS,
                    order: order1
                }
            )
        ).toEqual(
            {
                ...initialState,
                orderData: order1
            }
        )
    })
    it('should handle GET_ORDER_FAILED', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState,
                    isLoading: true
                },
                {
                    type: GET_ORDER_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState
                },
                {
                    type: SEND_ORDER_SUCCESS,
                    order: {...order2}
                }
            )
        ).toEqual(
            {
                ...initialState,
                orderData: {...order2}
            }
        )
    })
    it('should handle SEND_ORDER_REQUEST', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState,
                },
                {
                    type: SEND_ORDER_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })  
    it('should handle SEND_ORDER_FAILED', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState
                },
                {
                    type: SEND_ORDER_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    it('should handle REMOVE_ORDER_DETAILS', () => {
        expect(
            getOrderReducer(
                {
                    ...initialState,
                    orderData: {...order2}
                },
                {
                    type: REMOVE_ORDER_DETAILS
                }
            )
        ).toEqual(
            {
                ...initialState
            }
        )
    })      
})
