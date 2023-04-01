import { checkResponse } from './utils'; 
import { getCookie } from './cookie-utils'
import { TIngredient, TOrder, TUser, TResponseBody, TResponseBodyAuth, TForm, TRegisterForm, TFormResetPassword, TFormConfirmPassword, TRequestOrder } from '../../services/types/data'

const NORMA_API = 'https://norma.nomoreparties.space/api'


export const getIngredients = ():Promise<TResponseBody<'data', ReadonlyArray<TIngredient>>> => {
    return fetch(`${NORMA_API}/ingredients`, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: { 
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
        })
    .then(checkResponse)
}

export const sendOrder = (data: TRequestOrder):Promise<TResponseBody<'order', TOrder>> => {
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: { 
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        body: JSON.stringify(data)})
    .then(checkResponse)    
}

export const loginRequest = (form: TForm): Promise<TResponseBodyAuth<'user', TUser>> => {
    return fetch(`${NORMA_API}/auth/login`, {
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
    })
    .then(checkResponse);

}

export const registerRequest = (form: TRegisterForm): Promise<TResponseBodyAuth<'user', TUser>> => {
    return fetch(`${NORMA_API}/auth/register`, {
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
    })
    .then(checkResponse);
}

export const logoutRequest = (): Promise<TResponseBody<'message', string>> => {
    const token = { token: getCookie('refreshToken')}
    return fetch(`${NORMA_API}/auth/logout`, {
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
    })
    .then(checkResponse);
}

export const getUserRequest = (): Promise<TResponseBody<'user', TUser>>  => {

    return fetch(`${NORMA_API}/auth/user`, {
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
    })
    .then(checkResponse);
}

export const patchUserRequest = (form: TRegisterForm): Promise<TResponseBody<'user', TUser>> => {
    return fetch(`${NORMA_API}/auth/user`, {
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
    })
    .then(checkResponse);
}

export const tokenRequest = (): Promise<TResponseBodyAuth> => {
    const token = { token: getCookie('refreshToken')}
    return fetch(`${NORMA_API}/auth/token`, {
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
    })
    .then(checkResponse);
}

export const resetPasswordRequest = (form: TFormResetPassword): Promise<TResponseBody<'message', string>> => {
    return fetch(`${NORMA_API}/password-reset`, {
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
    })
    .then(checkResponse);
}

export const confirmResetPasswordRequest = (form: TFormConfirmPassword): Promise<TResponseBody<'message', string>> => {
    return fetch(`${NORMA_API}/password-reset/reset`, {
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
    })
    .then(checkResponse);
}







