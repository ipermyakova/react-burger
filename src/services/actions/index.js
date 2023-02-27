import { getIngredientsAction, updateCountIngredients } from './ingredients'
import { getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, updateIngredientConstructor } from './ingredients-constructor'
import { addIngredientDetails, removeIngredientDetails } from './ingredient-details'
import { sendOrderAction, removeOrderDetails } from './order'

export const actions = { getIngredientsAction, getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, addIngredientDetails, 
    removeIngredientDetails, sendOrderAction, updateCountIngredients, updateIngredientConstructor, removeOrderDetails }