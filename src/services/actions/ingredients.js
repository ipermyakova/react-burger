import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, UPDATE_COUNT_INGREDIENT } from '../constants'
import { getIngredients } from '../../components/utils/burger-api'

export const getIngredientsAction = () => (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST })
    getIngredients()
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
