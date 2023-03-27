import { checkResponse, getCookie } from './utils'; 

const NORMA_API = 'https://norma.nomoreparties.space/api'

export const getIngredients = () => {
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

export const sendOrder = (data) => {
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

export const loginRequest = form => {
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

export const registerRequest = form => {
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

export const logoutRequest = () => {
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

export const getUserRequest = () => {

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

export const patchUserRequest = (form) => {
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

export const tokenRequest = () => {
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

export const resetPasswordRequest = (form) => {
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

export const confirmResetPasswordRequest = (form) => {
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







