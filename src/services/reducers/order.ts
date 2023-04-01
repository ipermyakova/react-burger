import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS, TOKEN_EXPIRED_ERROR } from '../constants'
import { TOrder } from '../types/data';

export type TOrderState = {
    isLoading: boolean;
    hasError: boolean;
    orderData: TOrder | null;   
}

const initialState: TOrderState = {
    isLoading: false,
    hasError: false,
    orderData: null,
}

export const getOrderReducer = (state = initialState, action: any) => {
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
                orderData: action.order,
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
