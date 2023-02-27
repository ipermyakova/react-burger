import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, REMOVE_ORDER_DETAILS } from '../constants'
import { sendOrder } from '../../components/utils/burger-api'


export const sendOrderAction = (request) => (dispatch) => {
    dispatch({type: GET_ORDER_REQUEST })
    sendOrder(request)
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

