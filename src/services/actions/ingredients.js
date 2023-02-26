import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, UPDATE_COUNT_INGREDIENT } from '../constants'
import { checkResponse } from '../../components/utils/utils';

const urlGetIngredients = 'https://norma.nomoreparties.space/api/ingredients'

export const getIngredients = () => (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST })
    fetch(urlGetIngredients)
    .then(checkResponse)
    .then(data => {
        dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: data.data
        })
    })
    .catch(e => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
        })
    });
}

export const updateCountIngredients = (id, bunId, value, itemType) => ({
    type: UPDATE_COUNT_INGREDIENT,
    id,
    bunId,
    value,
    itemType
})
