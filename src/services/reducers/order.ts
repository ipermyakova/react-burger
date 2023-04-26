import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS, SEND_ORDER_SUCCESS, SEND_ORDER_REQUEST, SEND_ORDER_FAILED } from '../constants'
import { TOrder, TGetOrder } from '../types/data';
import { TOrderActions } from '../actions/order';

export type TOrderState = {
    isLoading: boolean;
    hasError: boolean;
    orderData: TOrder | TGetOrder | null;
}

export const initialState: TOrderState = {
    isLoading: false,
    hasError: false,
    orderData: null,
}

export const getOrderReducer = (state = initialState, action: TOrderActions) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case SEND_ORDER_SUCCESS:
            return { ...state, orderData: action.order, isLoading: false, hasError: false }
        case SEND_ORDER_FAILED:
            return { ...state, isLoading: false, hasError: true, orderData: null }
        case REMOVE_ORDER_DETAILS:
            return { ...state, ...initialState }
        case GET_ORDER_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case GET_ORDER_SUCCESS:
            return { ...state, isLoading: false, hasError: false, orderData: action.order }
        case GET_ORDER_FAILED:
            return { ...state, isLoading: false, hasError: true, orderData: null }
        default: {
            return state
        }
    }
}
