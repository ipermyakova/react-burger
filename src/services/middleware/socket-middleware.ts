import { Middleware } from "redux";
import { RootState } from '../reducers';
import { TOrdersAll } from "../types/data";
import { actions } from '../actions';
import { getCookie } from '../../utils/cookie-utils'

export type TwsActionTypes = {
    connect: string;
    disconnect: string;
    wsConnecting: string;
    wsOpen: string;
    wsClose: string;
    wsMessage: string;
    wsError: string;
    send: string
}

export const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let url = '';
        let isConnected = false;
        let reconnectTimer = 0
        return (next) => (action) => {
            const { dispatch } = store
            const { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen, send } = wsActions

            if (action.type === connect) {
                console.log('Websocket connecting')
                url = action.payload
                socket = new WebSocket(url)
                window.clearTimeout(reconnectTimer)
                reconnectTimer = 0
                isConnected = true
                dispatch({ type: wsConnecting })
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: wsOpen })
                }
                socket.onerror = () => {
                    dispatch({ type: wsError, payload: 'Websocket error' })
                }
                socket.onmessage = (event: MessageEvent) => {
                    const { data } = event
                    const parsedData: TOrdersAll = JSON.parse(data)
                    dispatch({ type: wsMessage, payload: parsedData })
                }
                socket.onclose = (event: CloseEvent) => {
                    if (event.code !== 1000) {
                        console.log('error')
                        dispatch({ type: wsError, payload: event.code.toString() })
                    }
                    if (socket?.readyState === 3 && isConnected) {
                        dispatch({ type: wsConnecting })
                        reconnectTimer = window.setTimeout(() => {
                            dispatch({ type: connect, payload: url })
                        }, 6000)
                    }
                }
            }

            if (socket && action.type === disconnect) {
                console.log('Websocket disconnect')
                isConnected = false
                reconnectTimer = 0
                dispatch({ type: wsClose })
                socket.close()
            }

            if (socket && action.type === send) {
                console.log('Websocket send')
                socket.send(JSON.stringify(action.payload))
            }

            next(action)
        }
    }
}