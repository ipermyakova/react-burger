import { checkResponse } from './utils'; 

const NORMA_API = 'https://norma.nomoreparties.space/api'

export const getIngredients = () => {
    return fetch(`${NORMA_API}/ingredients`)
        .then(checkResponse)
}

export const sendOrder = (data) => {
    return fetch(`${NORMA_API}/orders`, 
        { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(data)})
    .then(checkResponse)    
}


