import { GET_INGREDIENTS_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENT_CONSTRUCTOR, UPDATE_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENTS_CONSTRUCTOR } from '../constants'
import { TIngredient } from '../types/data';
import { TIngredientsConstructorActions } from '../actions/ingredients-constructor';

export type TIngredientsConstructorState = {
    bun: TIngredient | null;
    ingredients: Array<TIngredient>
}

const initialState: TIngredientsConstructorState = {
    bun: null,
    ingredients: []
}

export const getIngredientsConstructorReducer = (state = initialState, action: TIngredientsConstructorActions) => {
    switch (action.type) {
        case GET_INGREDIENTS_CONSTRUCTOR:
            return state
        case ADD_INGREDIENT_CONSTRUCTOR: {
            if (action.payload.type === 'bun') {
                return { ...state, bun: action.payload }
            }
            return { ...state, ingredients: [...state.ingredients, action.payload] }
        }

        case REMOVE_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state, ingredients: [
                    ...state.ingredients.filter(item => item.dragId !== action.id)
                ]
            }
        }

        case UPDATE_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state, ingredients: [
                    ...action.ingredients
                ]
            }
        }

        case REMOVE_INGREDIENTS_CONSTRUCTOR: {
            return initialState;
        }

        default: return state;
    }
}