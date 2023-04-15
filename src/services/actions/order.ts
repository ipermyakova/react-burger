import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS, SEND_ORDER_SUCCESS, SEND_ORDER_REQUEST, SEND_ORDER_FAILED } from '../constants'
import { sendOrder, getOrder } from '../../utils/burger-api'
import { TOrder, TRequestOrder } from '../types/data';
import { AppDispatch } from '../types';

export interface ISendOrderRequestAction {
    readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly order: TOrder
}

export interface ISendOrderFailedAction {
    readonly type: typeof SEND_ORDER_FAILED;
}

export interface IRemoveOrderDetailsAction {
    readonly type: typeof REMOVE_ORDER_DETAILS;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: TOrder
}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions = ISendOrderRequestAction | ISendOrderSuccessAction | ISendOrderFailedAction | IRemoveOrderDetailsAction | IGetOrderSuccessAction | IGetOrderRequestAction | IGetOrderFailedAction;  

export const sendOrderRequestAction = (): ISendOrderRequestAction => ({
    type: SEND_ORDER_REQUEST
})

export const sendOrderSuccessAction = (data: TOrder): ISendOrderSuccessAction => ({
    type: SEND_ORDER_SUCCESS,
    order: data
})

export const sendOrderFailedAction = (): ISendOrderFailedAction => ({
    type: SEND_ORDER_FAILED
})

export const getOrderRequestAction = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
})

export const getOrderSuccessAction = (data: TOrder): IGetOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
    order: data
})

export const getOrderFailedAction = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED
})

export const sendOrderAction = (request: TRequestOrder) => (dispatch: AppDispatch) => {
    dispatch(sendOrderRequestAction());
    sendOrder(request)
    .then(data => {
        dispatch(sendOrderSuccessAction(data.order))})
    .catch(e => {
        dispatch(sendOrderFailedAction())
    })
}

export const removeOrderDetails = (): IRemoveOrderDetailsAction => ({
    type: REMOVE_ORDER_DETAILS,
})

export const getOrderActions = (orderNumber: string) => (dispatch: AppDispatch) => {
    dispatch(getOrderRequestAction());
    getOrder(orderNumber)
    .then(data => {
        dispatch(getOrderSuccessAction(data.orders[0]))})
    .catch(e => {
        dispatch(getOrderFailedAction())
    })
}

