import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS } from '../constants'
import { sendOrder } from '../../components/utils/burger-api'
import { TOrder, TRequestOrder } from '../types/data';

export interface ISendOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: TOrder
}

export interface ISendOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export const sendOrderRequestAction = (): ISendOrderRequestAction => ({
    type: GET_ORDER_REQUEST
})

export const sendOrderSuccessAction = (data: TOrder):ISendOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    order: data
})

export const sendOrderFailedAction = (): ISendOrderFailedAction => ({
    type: GET_ORDER_FAILED
})


export const sendOrderAction = (request: TRequestOrder) => (dispatch: any) => {
    dispatch(sendOrderRequestAction)
    sendOrder(request)
    .then(data => {
        dispatch(sendOrderSuccessAction(data.order))})
    .catch(e => {
        dispatch(sendOrderFailedAction)
    })
}

export const removeOrderDetails = () => ({
    type: REMOVE_ORDER_DETAILS,
})

