import { getIngredients, updateCountIngredients } from './ingredients'
import { getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, updateIngredientConstructor } from './ingredients-constructor'
import { addIngredientDetails, removeIngredientDetails } from './ingredient-details'
import { getOrder, removeOrderDetails } from './order'

export const actions = { getIngredients, getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, addIngredientDetails, 
    removeIngredientDetails, getOrder, updateCountIngredients, updateIngredientConstructor, removeOrderDetails }