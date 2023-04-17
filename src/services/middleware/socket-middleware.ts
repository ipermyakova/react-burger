import { Middleware } from "redux";
import { RootState } from '../reducers';
import { TOrdersAll } from "../types/data";
import { TOrdersAllActions, IConnect, IDisconnect, IWSConnecting, IWSOpen, IWSClose, IWSMessage, IWSError, ISend } from '../actions/ws-orders-all';

export type TwsActionTypes = {
    connect: (url: string) => IConnect;
    disconnect: () => IDisconnect;
    wsConnecting: () => IWSConnecting;
    wsOpen: () => IWSOpen;
    wsClose: () => IWSClose;
    wsMessage: (orders: TOrdersAll) => IWSMessage;
    wsError: (messageError: string) => IWSError; 
    send: (data: any) => ISend   
}

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = '';
        let isConnected = false;
        let reconnectTimer = 0
        return (next) => (action: TOrdersAllActions) => {
            const { dispatch } = store
            const { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen} = wsActions

            if(action.type === "ORDERS_ALL_CONNECT") {
                console.log('Websocket connecting')
                url = action.payload
                socket = new WebSocket(url)
                window.clearTimeout(reconnectTimer)
                reconnectTimer = 0
                isConnected = true
                dispatch(wsConnecting)
            }

            if(socket) {
                socket.onopen = () => {
                    dispatch(wsOpen)
                } 
                socket.onerror = () => {
                    dispatch(wsError('Websocket error'))
                }
                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event
                    const parsedData: TOrdersAll = JSON.parse(data)
                    dispatch(wsMessage(parsedData)) 
                }
                socket.onclose = (event: CloseEvent) => {
                    if(event.code !== 1000) {
                        console.log('error')
                        dispatch(wsError(event.code.toString()))
                    }
                    if(socket?.readyState === 3 && isConnected) {
                        dispatch(wsConnecting())
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url))
                        }, 6000)

                    }
                }
            }

            if(socket && action.type === "ORDERS_ALL_DISCONNECT") {
                console.log('Websocket disconnect')
                isConnected = false
                reconnectTimer = 0
                dispatch(wsClose())
                socket.close()
            }

            if(socket && action.type === "ORDERS_ALL_SEND") {
                console.log('Websocket send')
                socket.send(JSON.stringify(action.payload))
            }
            
            next(action)
        }
    }
}