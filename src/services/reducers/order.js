import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS } from '../constants'
const initialState = {
    isLoading: false,
    hasError: false,
    orderData: null,
}

export const getOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: 
            return {
                ...state,
                isLoading: true,
                hasError: false
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orderData: {
                    name: action.data.name,
                    order: action.data.order
                },
                isLoading: false,
                hasError: false
            } 
        case GET_ORDER_FAILED:
            return {
                ...state,
                isLoading: false,
                hasError: true,
                orderData: null
            } 
        case REMOVE_ORDER_DETAILS:
            return {
                ...state,
                ...initialState
            }     
        default: {
            return state
        }         
    }
}
