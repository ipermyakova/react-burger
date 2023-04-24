import { setCookie, deleteCookie } from "../../utils/cookie-utils";
import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED,
    GET_USER_FAILED, GET_USER_SUCCESS, GET_USER_REQUEST, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, TOKEN_FAILED, TOKEN_SUCCESS, TOKEN_REQUEST,
    RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_FAILED, CONFIRM_RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_SUCCESS
} from "../constants";

import { TUser } from '../types/data';
import { TAuthActions } from "../actions/auth";

export type TAuthState = {
    readonly isLoading: boolean,
    readonly hasError: boolean,
    user: TUser | null,
    accessToken: string| null,
    refreshToken: string | null,
    readonly messageResetPassword: string | null,
    readonly messageConfirmResetPassword: string | null,
    readonly isLoadingUser: boolean,
    readonly hasErrorUser: boolean,
    readonly isLoadingLogout: boolean,
    readonly hasErrorLogout: boolean
}

const initialState: TAuthState = {
    isLoading: false,
    hasError: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    messageResetPassword: null,
    messageConfirmResetPassword: null,
    isLoadingUser: false,
    hasErrorUser: false,
    isLoadingLogout: false,
    hasErrorLogout: false
}

export const authReducer = (state = initialState, action: TAuthActions) => {
    switch (action.type) {

        case LOGIN_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case LOGIN_SUCCESS: {
            const accessToken = action.payload?.accessToken?.split('Bearer ')?.[1];
            setCookie('token', accessToken, { expires: 1200 });
            const refreshToken = action.payload?.refreshToken;
            setCookie('refreshToken', refreshToken, undefined);
            return {
                ...state, user: action.payload.user, refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken, isLoading: false, hasError: false
            }
        }
        case LOGIN_FAILED:
            return { ...state, isLoading: false, hasError: true, user: null }

        case REGISTER_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case REGISTER_SUCCESS: {
            const accessToken = action.payload?.accessToken?.split('Bearer ')?.[1];
            setCookie('token', accessToken, { expires: 1200 });
            const refreshToken = action.payload?.refreshToken;
            setCookie('refreshToken', refreshToken, undefined);
            return {
                ...state, user: action.payload.user, refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken, isLoading: false, hasError: false
            }
        }
        case REGISTER_FAILED:
            return { ...state, isLoading: false, hasError: true, user: null }

        case RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case RESET_PASSWORD_SUCCESS:
            return { ...state, messageResetPassword: action.payload.message, isLoading: false, hasError: false }
        case RESET_PASSWORD_FAILED:
            return { ...state, messageResetPassword: null, isLoading: false, hasError: true }

        case CONFIRM_RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case CONFIRM_RESET_PASSWORD_SUCCESS:
            return { ...state, messageConfirmResetPassword: action.payload.message, isLoading: false, hasError: false }
        case CONFIRM_RESET_PASSWORD_FAILED:
            return { ...state, messageConfirmResetPassword: null, isLoading: false, hasError: true }

        case LOGOUT_REQUEST: {
            return { ...state, isLoadingLogout: true, hasErrorLogout: false }
        }
        case LOGOUT_SUCCESS: {
            deleteCookie('token');
            deleteCookie('refreshToken');
            return { ...state, user: null, messageResetPassword: null, messageConfirmResetPassword: null, refreshToken: null, accessToken: null, isLoadingLogout: false, hasErrorLogout: false }
        }
        case LOGOUT_FAILED: {
            return { ...state, isLoadingLogout: false, hasErrorLogout: true }
        }

        case GET_USER_REQUEST:
            return { ...state, isLoadingUser: true, hasErrorUser: false }
        case GET_USER_SUCCESS: {
            return { ...state, user: action.payload.user, isLoadingUser: false, hasErrorUser: false }
        }
        case GET_USER_FAILED:
            return { ...state, isLoadingUser: false, hasErrorUser: true }

        case UPDATE_USER_REQUEST:
            return { ...state, isLoading: true, hasError: false }
        case UPDATE_USER_SUCCESS: {
            return { ...state, user: action.payload.user, isLoading: false, hasError: false }
        }
        case UPDATE_USER_FAILED:
            return { ...state, isLoading: false, hasError: true }

        case TOKEN_REQUEST:
            return { ...state, isLoading: true, hasError: false }

        case TOKEN_SUCCESS: {
            const accessToken = action.payload?.accessToken?.split('Bearer ')?.[1];
            setCookie('token', accessToken, { expires: 1200 });
            const refreshToken = action.payload?.refreshToken;
            setCookie('refreshToken', refreshToken, undefined);
            return {
                ...state, refreshToken: action.payload.refreshToken,
                accessToken: action.payload.accessToken, isLoading: false, hasError: false
            }
        }
        case TOKEN_FAILED: {
            deleteCookie('token'),
                deleteCookie('refreshToken')
            return { ...state, isLoading: false, hasError: true }
        }
        default: {
            return state
        }
    }
}
