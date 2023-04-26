import { ORDERS_CONNECT, ORDERS_DISCONNECT, ORDERS_WS_CLOSE, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN, ORDERS_WS_CONNECTING, ORDERS_SEND} from '../constants'
import { TOrdersAll } from '../types/data';

export interface IConnect {
    readonly type: typeof ORDERS_CONNECT,
    readonly payload: string 
}

export interface IDisconnect {
    readonly type: typeof ORDERS_DISCONNECT
}

export interface IWSConnecting {
    readonly type: typeof ORDERS_WS_CONNECTING
}

export interface IWSOpen {
    readonly type: typeof ORDERS_WS_OPEN
}

export interface IWSClose {
    readonly type: typeof ORDERS_WS_CLOSE
}

export interface IWSMessage {
    readonly type: typeof ORDERS_WS_MESSAGE
    payload: TOrdersAll
}

export interface IWSError {
    readonly type: typeof ORDERS_WS_ERROR
    payload: string
}

export interface ISend {
    readonly type: typeof ORDERS_SEND
    payload: string
}

export type TOrdersActions = IConnect | IDisconnect | IWSConnecting | IWSOpen | IWSClose | IWSMessage | IWSError | ISend;

export const connect = (url: string): IConnect => ({
    type: ORDERS_CONNECT,
    payload: url
})

export const disconnect = (): IDisconnect => ({
    type: ORDERS_DISCONNECT
})

export const wsConnecting = (): IWSConnecting => ({
    type: ORDERS_WS_CONNECTING
})

export const wsOpen = (): IWSOpen => ({
    type: ORDERS_WS_OPEN
})

export const wsClose = (): IWSClose => ({
    type: ORDERS_WS_CLOSE
})

export const wsMessage = (orders: TOrdersAll): IWSMessage => ({
    type: ORDERS_WS_MESSAGE,
    payload: orders,
})

export const wsError = (messageError: string): IWSError => ({
    type: ORDERS_WS_ERROR,
    payload: messageError,
})

export const send = (data: any): ISend => ({
    type: ORDERS_SEND,
    payload: data
})
