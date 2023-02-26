import { GET_INGREDIENTS_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENT_CONSTRUCTOR, UPDATE_INGREDIENT_CONSTRUCTOR } from '../constants'
import { updateCountIngredients } from './ingredients';
import uuid from 'react-uuid';

export const getIngredientsConstructor = () => ({
    type: GET_INGREDIENTS_CONSTRUCTOR
});

export const addIngredientConstructor = (ingredient) => ({
    type: ADD_INGREDIENT_CONSTRUCTOR,
    ingredient: {...ingredient},
    dragId: uuid()
});

export const removeIngredientConstructor = (id) => ({
    type: REMOVE_INGREDIENT_CONSTRUCTOR,
    id: id
});

export const updateIngredientConstructor = (ingredients) => ({
    type: UPDATE_INGREDIENT_CONSTRUCTOR,
    ingredients: [...ingredients]
})