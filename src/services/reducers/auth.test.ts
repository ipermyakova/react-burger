import { TAuthActions } from '../actions/auth'
import { authReducer } from './auth'
import { user, response, authResponse, userResponse, tokenResponse } from './test-data'
import { TAuthState } from './auth';

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED,
    GET_USER_FAILED, GET_USER_SUCCESS, GET_USER_REQUEST, UPDATE_USER_FAILED, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, TOKEN_FAILED, TOKEN_SUCCESS, TOKEN_REQUEST,
    RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_FAILED, CONFIRM_RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_SUCCESS
} from "../constants";

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


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {} as TAuthActions)
        ).toEqual(
            {...initialState}
        )
    })
    it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: LOGIN_SUCCESS,
                    payload: authResponse
                }
            )
        ).toEqual(
            {
                ...initialState,
                user: user,
                accessToken: authResponse.accessToken,
                refreshToken: authResponse.refreshToken,
            }
        )
    })
    it('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: LOGIN_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle LOGIN_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: LOGIN_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    it('should handle REGISTER_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: REGISTER_SUCCESS,
                    payload: authResponse
                }
            )
        ).toEqual(
            {
                ...initialState,
                user: user,
                accessToken: authResponse.accessToken,
                refreshToken: authResponse.refreshToken,
            }
        )
    })
    it('should handle REGISTER_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: REGISTER_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle REGISTER_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: REGISTER_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: RESET_PASSWORD_SUCCESS,
                    payload: response
                }
            )
        ).toEqual(
            {
                ...initialState,
                messageResetPassword: "message",                
            }
        )
    })
    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: RESET_PASSWORD_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: RESET_PASSWORD_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    
    it('should handle CONFIRM_RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: CONFIRM_RESET_PASSWORD_SUCCESS,
                    payload: response
                }
            )
        ).toEqual(
            {
                ...initialState,
                messageConfirmResetPassword: "message",                
            }
        )
    })
    it('should handle CONFIRM_RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: CONFIRM_RESET_PASSWORD_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle CONFIRM_RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: CONFIRM_RESET_PASSWORD_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState, user: user, accessToken: "12345", refreshToken: "6789"},
                {
                    type: LOGOUT_SUCCESS,
                    payload: response
                }
            )
        ).toEqual(
            {
                ...initialState               
            }
        )
    })

    it('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: LOGOUT_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoadingLogout: true
            }
        )
    })
    it('should handle LOGOUT_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: LOGOUT_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasErrorLogout: true
            }
        )
    })
    
    it('should handle GET_USER_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: GET_USER_SUCCESS,
                    payload: userResponse
                }
            )
        ).toEqual(
            {
                ...initialState,
                user: user               
            }
        )
    })

    it('should handle GET_USER_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: GET_USER_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoadingUser: true
            }
        )
    })
    it('should handle GET_USER_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: GET_USER_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasErrorUser: true
            }
        )
    })

    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: UPDATE_USER_SUCCESS,
                    payload: userResponse
                }
            )
        ).toEqual(
            {
                ...initialState,
                user: user               
            }
        )
    })
    it('should handle UPDATE_USER_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: UPDATE_USER_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle UPDATE_USER_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: UPDATE_USER_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    it('should handle TOKEN_SUCCESS', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: TOKEN_SUCCESS,
                    payload: tokenResponse
                }
            )
        ).toEqual(
            {
                ...initialState,
                accessToken: tokenResponse.accessToken,
                refreshToken: tokenResponse.refreshToken               
            }
        )
    })
    it('should handle TOKEN_REQUEST', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: TOKEN_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true
            }
        )
    })
    it('should handle TOKEN_FAILED', () => {
        expect(
            authReducer(
                {...initialState},
                {
                    type: TOKEN_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )
    })
    
})
