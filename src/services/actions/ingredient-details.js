import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants'

export const addIngredientDetails = (ingredient) => ({
    type: ADD_INGREDIENT_DETAILS,
    ingredient
});

export const removeIngredientDetails = () => ({
    type: REMOVE_INGREDIENT_DETAILS,
})