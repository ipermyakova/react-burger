import { request } from './utils'; 
import { getCookie } from './cookie-utils'
import { TIngredient, TOrder, TUser, TResponseBody, TResponseBodyAuth, TForm, TRegisterForm, TFormResetPassword, TFormConfirmPassword, TRequestOrder } from '../services/types/data'

export const getIngredients = ():Promise<TResponseBody<'data', ReadonlyArray<TIngredient>>> => {
    return request(`/ingredients`, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: { 
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
        });
}

export const sendOrder = (data: TRequestOrder):Promise<TResponseBody<'order', TOrder>> => {
    return request(`/orders`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        body: JSON.stringify(data)});
}

export const getOrder = (orderNumber: string):Promise<TResponseBody<'orders', ReadonlyArray<TOrder>>> => {
    return request(`/orders/${orderNumber}`, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: { 
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'})
}

export const loginRequest = (form: TForm): Promise<TResponseBodyAuth<'user', TUser>> => {
    return request(`/auth/login`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}

export const registerRequest = (form: TRegisterForm): Promise<TResponseBodyAuth<'user', TUser>> => {
    return request(`/auth/register`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}

export const logoutRequest = (): Promise<TResponseBody<'message', string>> => {
    const token = { token: getCookie('refreshToken')}
    return request(`/auth/logout`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(token)
    });
}

export const getUserRequest = (): Promise<TResponseBody<'user', TUser>>  => {
    return request(`/auth/user`, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
}

export const patchUserRequest = (form: TRegisterForm): Promise<TResponseBody<'user', TUser>> => {
    return request(`/auth/user`, {
        method: 'PATCH', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}

export const tokenRequest = (): Promise<TResponseBodyAuth> => {
    const token = { token: getCookie('refreshToken')}
    return request(`/auth/token`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(token)
    });
}

export const resetPasswordRequest = (form: TFormResetPassword): Promise<TResponseBody<'message', string>> => {
    return request(`/password-reset`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}

export const confirmResetPasswordRequest = (form: TFormConfirmPassword): Promise<TResponseBody<'message', string>> => {
    return request(`/password-reset/reset`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(form)
    });
}







