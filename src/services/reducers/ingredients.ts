import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, UPDATE_COUNT_INGREDIENT } from '../constants'
import { TIngredient } from '../types/data';
import { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsState = {
    isLoading: boolean;
    hasError: boolean;
    ingredients: Array<TIngredient>

}
const initialState: TIngredientsState = {
    isLoading: false,
    hasError: false,
    ingredients: []
}

export const getIngredientsReducer = (state = initialState, action: TIngredientsActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: 
            return {
                ...state, 
                isLoading: true,
                hasError: false 
            }
        
        case GET_INGREDIENTS_SUCCESS: 
            return {
                ...state,
                ingredients: action.ingredients,
                isLoading: false,
                hasError: false
            }
        
        case GET_INGREDIENTS_FAILED: 
            return {
                ...state,
                isLoading: false,
                hasError: true,
                ingredients: []
            }
        
        default: {
            return state
        }
    }
}
