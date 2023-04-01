import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants'
import { TIngredient } from '../types/data';

export type TIngredientDetailsState = {
    readonly currentIngredient: TIngredient | null;
}

const initialState: TIngredientDetailsState = {
    currentIngredient: null
}

export const ingredientDetailsReducer = (state=initialState, action: any) => {
    switch(action.type) {
        case ADD_INGREDIENT_DETAILS: 
            return {
                ...state,
                currentIngredient: {...action.ingredient}
            }
        case REMOVE_INGREDIENT_DETAILS:
            return {
                ...state,
                currentIngredient: null 
            }    

        default: return state;    
    }
}