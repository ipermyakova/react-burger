import { loginRequest, registerRequest, logoutRequest, getUserRequest, patchUserRequest, tokenRequest, resetPasswordRequest, confirmResetPasswordRequest } from "../../utils/burger-api";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGOUT_REQUEST, 
    LOGOUT_SUCCESS, LOGOUT_FAILED, GET_USER_REQUEST, GET_USER_FAILED, GET_USER_SUCCESS, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS, 
    UPDATE_USER_REQUEST, TOKEN_SUCCESS, TOKEN_REQUEST, TOKEN_FAILED, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_REQUEST, 
    CONFIRM_RESET_PASSWORD_FAILED, CONFIRM_RESET_PASSWORD_REQUEST, CONFIRM_RESET_PASSWORD_SUCCESS, TOKEN_EXPIRED_ERROR, TOKEN_MALFORMED_ERROR } from "../constants";
import { AppDispatch } from "../types";

import { TForm, TRegisterForm, TFormConfirmPassword, TFormResetPassword, TUser, TResponseBodyAuth, TResponseBody } from '../types/data'  

export interface ILoginRequestAction {
    readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccessAction {
    readonly type: typeof LOGIN_SUCCESS;
    readonly payload: TResponseBodyAuth<'user', TUser>;
}

export interface ILoginFailedAction {
    readonly type: typeof LOGIN_FAILED;
}

export interface IRegisterRequestAction {
    readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    readonly payload: TResponseBodyAuth<'user', TUser>;
}

export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_FAILED;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    readonly payload: TResponseBody<"message", string>;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IConfirmResetPasswordRequestAction {
    readonly type: typeof CONFIRM_RESET_PASSWORD_REQUEST;
}

export interface IConfirmResetPasswordSuccessAction {
    readonly type: typeof CONFIRM_RESET_PASSWORD_SUCCESS;
    readonly payload: TResponseBody<"message", string>;
}

export interface IConfirmResetPasswordFailedAction {
    readonly type: typeof CONFIRM_RESET_PASSWORD_FAILED;
}

export interface ILogoutRequestAction {
    readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccessAction {
    readonly type: typeof LOGOUT_SUCCESS;
    readonly payload: TResponseBody<"message", string>;
}

export interface ILogoutFailedAction {
    readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly payload: TResponseBody<'user', TUser>;
}

export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserRequestAction {
    readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserSuccessAction {
    readonly type: typeof UPDATE_USER_SUCCESS;
    readonly payload: TResponseBody<'user', TUser>;
}

export interface IUpdateUserFailedAction {
    readonly type: typeof UPDATE_USER_FAILED;
}

export interface ITokenRequestAction {
    readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenSuccessAction {
    readonly type: typeof TOKEN_SUCCESS;
    readonly payload: TResponseBodyAuth;
}

export interface ITokenFailedAction {
    readonly type: typeof TOKEN_FAILED;
}

export type TAuthActions = ILoginRequestAction | ILoginSuccessAction | ILoginFailedAction 
                           | IConfirmResetPasswordFailedAction | IConfirmResetPasswordRequestAction | IConfirmResetPasswordSuccessAction
                           | IGetUserSuccessAction | IGetUserRequestAction | IGetUserFailedAction
                           | IResetPasswordSuccessAction | IResetPasswordRequestAction | IResetPasswordFailedAction
                           | ILogoutSuccessAction | ILogoutRequestAction | ILogoutFailedAction
                           | IUpdateUserSuccessAction | IUpdateUserRequestAction | IUpdateUserFailedAction
                           | IRegisterSuccessAction | IRegisterRequestAction | IRegisterFailedAction
                           | ITokenSuccessAction | ITokenRequestAction | ITokenFailedAction

export const loginRequestAction = (): ILoginRequestAction => ({
    type: LOGIN_REQUEST
})

export const loginSuccessAction = (data: TResponseBodyAuth<'user', TUser>): ILoginSuccessAction => ({
    type: LOGIN_SUCCESS,
    payload: data
})

export const loginFailedAction = (): ILoginFailedAction => ({
    type: LOGIN_FAILED
})

export const registerRequestAction = (): IRegisterRequestAction => ({
    type: REGISTER_REQUEST
})

export const registerSuccessAction = (data: TResponseBodyAuth<'user', TUser>): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    payload: data
})

export const registerFailedAction = (): IRegisterFailedAction => ({
    type: REGISTER_FAILED
})

export const resetPasswordRequestAction = (): IResetPasswordRequestAction => ({
    type: RESET_PASSWORD_REQUEST
})

export const resetPasswordSuccessAction = (data: TResponseBody<"message", string>): IResetPasswordSuccessAction => ({
    type: RESET_PASSWORD_SUCCESS,
    payload: data
})

export const resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_FAILED
})

export const confirmResetPasswordRequestAction = (): IConfirmResetPasswordRequestAction => ({
    type: CONFIRM_RESET_PASSWORD_REQUEST
})

export const confirmResetPasswordSuccessAction = (data: TResponseBody<"message", string>): IConfirmResetPasswordSuccessAction => ({
    type: CONFIRM_RESET_PASSWORD_SUCCESS,
    payload: data
})

export const confirmResetPasswordFailedAction = (): IConfirmResetPasswordFailedAction => ({
    type: CONFIRM_RESET_PASSWORD_FAILED
})

export const logoutRequestAction = (): ILogoutRequestAction => ({
    type: LOGOUT_REQUEST
})

export const logoutSuccessAction = (data: TResponseBody<"message", string>): ILogoutSuccessAction => ({
    type: LOGOUT_SUCCESS,
    payload: data
})

export const logoutFailedAction = (): ILogoutFailedAction => ({
    type: LOGOUT_FAILED
})

export const getUserRequestAction = (): IGetUserRequestAction => ({
    type: GET_USER_REQUEST
})

export const getUserSuccessAction = (data: TResponseBody<'user', TUser>): IGetUserSuccessAction => ({
    type: GET_USER_SUCCESS,
    payload: data
})

export const getUserFailedAction = (): IGetUserFailedAction => ({
    type: GET_USER_FAILED
})

export const tokenRequestAction = (): ITokenRequestAction => ({
    type: TOKEN_REQUEST
})

export const tokenSuccessAction = (data: TResponseBodyAuth): ITokenSuccessAction => ({
    type: TOKEN_SUCCESS,
    payload: data
})

export const tokenFailedAction = (): ITokenFailedAction => ({
    type: TOKEN_FAILED
})

export const updateUserRequestAction = (): IUpdateUserRequestAction => ({
    type: UPDATE_USER_REQUEST
})

export const updateUserSuccessAction = (data: TResponseBody<'user', TUser>): IUpdateUserSuccessAction => ({
    type: UPDATE_USER_SUCCESS,
    payload: data
})

export const updateUserFailedAction = (): IUpdateUserFailedAction => ({
    type: UPDATE_USER_FAILED
})

export const login = (form: TForm) => (dispatch: AppDispatch) => {
    dispatch(loginRequestAction())
    loginRequest(form)
    .then(data => {
        if(data.success) {
            dispatch(loginSuccessAction(data))
        } else {
            dispatch(loginFailedAction()) 
        }
    })
    .catch(e => {
        dispatch(loginFailedAction())
    })
}

export const register = (form: TRegisterForm) => (dispatch: AppDispatch) => {
    dispatch(registerRequestAction())
    registerRequest(form)
    .then(data => {
        if(data.success) {
            dispatch(registerSuccessAction(data))
        } else {
            dispatch(registerFailedAction())
        }
    }) 
    .catch(e => {
        dispatch(registerFailedAction())
    })  
}

export const resetPassword = (form: TFormResetPassword) => (dispatch: AppDispatch) => {
    dispatch(resetPasswordRequestAction())
    resetPasswordRequest(form)
    .then(data => {
        if(data.success) {
            dispatch(resetPasswordSuccessAction(data))
        } else {
            dispatch(resetPasswordFailedAction())
        }
    }) 
    .catch(e => {
        dispatch(resetPasswordFailedAction())
    })  
}

export const confirmResetPassword = (form: TFormConfirmPassword) => (dispatch: AppDispatch) => {
    dispatch(confirmResetPasswordRequestAction())
    confirmResetPasswordRequest(form)
    .then(data => {
        if(data.success) {
            dispatch(confirmResetPasswordSuccessAction(data))
        } else {
            dispatch(confirmResetPasswordFailedAction())
        }
    }) 
    .catch(e => {
        dispatch(confirmResetPasswordFailedAction())
    })  
}

export const logout = () => (dispatch: AppDispatch) => {
    dispatch(logoutRequestAction())
    logoutRequest()
    .then(data => {
        if(data.success) {
            dispatch(logoutSuccessAction(data))
        } else {
            dispatch(logoutFailedAction())
        }
    })
    .catch(e => {
        dispatch(loginFailedAction())
    })
}

export const getUser = () => (dispatch: AppDispatch) => {
    dispatch(getUserRequestAction())
    getUserRequest()
    .then(data => {
        if(data.success) {
            dispatch(getUserSuccessAction(data))
        } else {
            dispatch(getUserFailedAction())
        }
                
    })
    .catch(error => {
        if(error.message === TOKEN_EXPIRED_ERROR || error.message === TOKEN_MALFORMED_ERROR) {
            dispatch(tokenRequestAction())
            tokenRequest()
                .then(dataToken => {
                    if(dataToken.success) {
                        dispatch(tokenSuccessAction(dataToken))
                        getUserRequest()
                        .then(dataUser => {
                            if(dataUser.success) {
                                dispatch(getUserSuccessAction(dataUser))
                            } else {
                                dispatch(getUserFailedAction())
                            }
                        })
                        .catch(e => { 
                            dispatch(getUserFailedAction())
                        })   
                    } else {
                        dispatch(tokenFailedAction())
                    }              
                })
                .catch(e => { 
                    dispatch(tokenFailedAction())
                    dispatch(getUserFailedAction())
                })   
        } else {
            dispatch(getUserFailedAction())
        }
    })
}

export const updateUser = (form: TRegisterForm) => (dispatch: AppDispatch) => {
    dispatch(updateUserRequestAction())
    patchUserRequest(form)
    .then(data => {
        if(data.success) {
            dispatch(updateUserSuccessAction(data))
        } else {
            dispatch(updateUserFailedAction())
        }             
    })
    .catch(error => {
        if(error.message === TOKEN_EXPIRED_ERROR || error.message === TOKEN_MALFORMED_ERROR) {
            dispatch(tokenRequestAction())
            tokenRequest()
            .then(dataToken => {
                if(dataToken.success) {
                    dispatch(tokenSuccessAction(dataToken))
                    patchUserRequest(form)
                    .then(dataUser => {
                        if(dataUser.success) {
                            dispatch(updateUserSuccessAction(dataUser))
                        } else {
                            dispatch(updateUserFailedAction())
                        }
                    })
                } else {
                    dispatch(tokenFailedAction())
                }              
            })
            .catch(e => { 
                dispatch(tokenFailedAction())
                dispatch(updateUserFailedAction())
            })  
        } else {
            dispatch(updateUserFailedAction())
        }
    })      
}


