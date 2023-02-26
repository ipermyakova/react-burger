import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS } from '../constants'
import { checkResponse } from '../../components/utils/utils';

const url = 'https://norma.nomoreparties.space/api/orders';


export const getOrder = (ingredientsRequest) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST })
    fetch(url, 
        { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(ingredientsRequest)})
    .then(checkResponse)
    .then(data => {
        dispatch({
            type: GET_ORDER_SUCCESS,
            data: data
        })
    })
    .catch(e => {
        dispatch({
            type: GET_ORDER_FAILED
        })
    })
}

export const removeOrderDetails = () => ({
    type: REMOVE_ORDER_DETAILS,
})

