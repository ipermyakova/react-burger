import { loginRequest, registerRequest, logoutRequest, getUserRequest, patchUserRequest, tokenRequest, resetPasswordRequest, confirmResetPasswordRequest } from "../../components/utils/burger-api";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, LOGOUT_FAILED, GET_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS, 
    UPDATE_USER_REQUEST, TOKEN_SUCCESS, TOKEN_REQUEST, TOKEN_FAILED, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, 
    CONFIRM_RESET_PASSWORD_FAILED, CONFIRM_RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_SUCCESS, TOKEN_EXPIRED_ERROR, TOKEN_MALFORMED_ERROR } from "../constants";

import { TForm, TRegisterForm, TFormConfirmPassword, TFormResetPassword } from '../types/data'    

export const login = (form: TForm) => (dispatch: any) => {
    dispatch({ type: LOGIN_REQUEST })
    loginRequest(form)
    .then(data => {
        if(data.success) {
            dispatch({ type: LOGIN_SUCCESS, payload: data })
        } else {
            dispatch({ type: LOGIN_FAILED }) 
        }
    })
    .catch(e => {
        dispatch({
            type: LOGIN_FAILED
        })
    })
}

export const register = (form: TRegisterForm) => (dispatch: any) => {
    dispatch({ type: REGISTER_REQUEST})
    registerRequest(form)
    .then(data => {
        if(data.success) {
            dispatch({ type: REGISTER_SUCCESS, payload: data })
        } else {
            dispatch({ type: REGISTER_FAILED})
        }
    }) 
    .catch(e => {
        dispatch({
            type: REGISTER_FAILED
        })
    })  
}

export const resetPassword = (form: TFormResetPassword) => (dispatch: any) => {
    dispatch({ type: RESET_PASSWORD_REQUEST})
    resetPasswordRequest(form)
    .then(data => {
        if(data.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data})
        } else {
            dispatch({ type: RESET_PASSWORD_FAILED})
        }
    }) 
    .catch(e => {
        dispatch({
            type: RESET_PASSWORD_FAILED
        })
    })  
}

export const confirmResetPassword = (form: TFormConfirmPassword) => (dispatch: any) => {
    dispatch({ type: CONFIRM_RESET_PASSWORD_REQUEST})
    confirmResetPasswordRequest(form)
    .then(data => {
        if(data.success) {
            dispatch({ type: CONFIRM_RESET_PASSWORD_SUCCESS, payload: data})
        } else {
            dispatch({ type: CONFIRM_RESET_PASSWORD_FAILED})
        }
    }) 
    .catch(e => {
        dispatch({
            type: CONFIRM_RESET_PASSWORD_FAILED
        })
    })  
}

export const logout = () => (dispatch: any) => {
    dispatch({ type: LOGOUT_REQUEST})
    logoutRequest()
    .then(data => {
        if(data.success) {
            dispatch({ type: LOGOUT_SUCCESS, payload: data })
        } else {
            dispatch({ type: LOGOUT_FAILED})
        }
    })
    .catch(e => {
        dispatch({
            type: LOGOUT_FAILED
        })
    })
}

export const getUser = () => (dispatch: any) => {
    dispatch({ type: GET_USER_REQUEST})
    getUserRequest()
    .then(data => {
        if(data.success) {
            dispatch({ type: GET_USER_SUCCESS, payload: data })
        } else {
            dispatch({ type: GET_USER_FAILED})
        }
                
    })
    .catch(error => {
        if(error.message === TOKEN_EXPIRED_ERROR || error.message === TOKEN_MALFORMED_ERROR) {
            dispatch({ type: TOKEN_REQUEST })
            tokenRequest()
                .then(dataToken => {
                    if(dataToken.success) {
                        dispatch({ type: TOKEN_SUCCESS, payload: dataToken })
                        getUserRequest()
                        .then(dataUser => {
                            if(dataUser.success) {
                                dispatch({ type: GET_USER_SUCCESS, payload: dataUser })
                            } else {
                                dispatch({ type: GET_USER_FAILED})
                            }
                        })
                        .catch(e => { 
                            dispatch({ type: GET_USER_FAILED })
                        })   
                    } else {
                        dispatch({ type: TOKEN_FAILED })
                    }              
                })
                .catch(e => { 
                    dispatch({ type: TOKEN_FAILED })
                    dispatch({ type: GET_USER_FAILED })
                })   
        } else {
            dispatch({ type: GET_USER_FAILED})
        }
    })
}

export const updateUser = (form: TRegisterForm) => (dispatch: any) => {
    dispatch({ type: UPDATE_USER_REQUEST})
    patchUserRequest(form)
    .then(data => {
        if(data.success) {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
        } else {
            dispatch({ type: UPDATE_USER_FAILED})
        }
                
    })
    .catch(error => {
        if(error.message === TOKEN_EXPIRED_ERROR || error.message === TOKEN_MALFORMED_ERROR) {
            dispatch({ type: TOKEN_REQUEST })
            tokenRequest()
            .then(dataToken => {
                if(dataToken.success) {
                    dispatch({ type: TOKEN_SUCCESS, payload: dataToken })
                    patchUserRequest(form)
                    .then(dataUser => {
                        if(dataUser.success) {
                            dispatch({ type: UPDATE_USER_SUCCESS, payload: dataUser })
                        } else {
                            dispatch({ type: UPDATE_USER_FAILED})
                        }
                    })
                } else {
                    dispatch({ type: TOKEN_FAILED })
                }              
            })
            .catch(e => { 
                dispatch({ type: TOKEN_FAILED })
                dispatch({ type: UPDATE_USER_FAILED })
            })  
        } else {
            dispatch({ type: UPDATE_USER_FAILED})
        }
    })      
}


