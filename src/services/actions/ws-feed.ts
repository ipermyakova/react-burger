import { FEED_CONNECT, FEED_DISCONNECT, FEED_WS_CLOSE, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FEED_WS_CONNECTING, FEED_SEND} from '../constants'
import { TOrdersAll } from '../types/data';

export interface IConnect {
    readonly type: typeof FEED_CONNECT,
    readonly payload: string 
}

export interface IDisconnect {
    readonly type: typeof FEED_DISCONNECT
}

export interface IWSConnecting {
    readonly type: typeof FEED_WS_CONNECTING
}

export interface IWSOpen {
    readonly type: typeof FEED_WS_OPEN
}

export interface IWSClose {
    readonly type: typeof FEED_WS_CLOSE
}

export interface IWSMessage {
    readonly type: typeof FEED_WS_MESSAGE
    payload: TOrdersAll
}

export interface IWSError {
    readonly type: typeof FEED_WS_ERROR
    payload: string
}

export interface ISend {
    readonly type: typeof FEED_SEND
    payload: string
}

export type TFeedActions = IConnect | IDisconnect | IWSConnecting | IWSOpen | IWSClose | IWSMessage | IWSError | ISend;

export const connect = (url: string): IConnect => ({
    type: FEED_CONNECT,
    payload: url
})

export const disconnect = (): IDisconnect => ({
    type: FEED_DISCONNECT
})

export const wsConnecting = (): IWSConnecting => ({
    type: FEED_WS_CONNECTING
})

export const wsOpen = (): IWSOpen => ({
    type: FEED_WS_OPEN
})

export const wsClose = (): IWSClose => ({
    type: FEED_WS_CLOSE
})

export const wsMessage = (orders: TOrdersAll): IWSMessage => ({
    type: FEED_WS_MESSAGE,
    payload: orders,
})

export const wsError = (messageError: string): IWSError => ({
    type: FEED_WS_ERROR,
    payload: messageError,
})

export const send = (data: any): ISend => ({
    type: FEED_SEND,
    payload: data
})
