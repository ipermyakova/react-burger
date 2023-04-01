import { getIngredientsAction, updateCountIngredients } from './ingredients'
import { getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, updateIngredientConstructor } from './ingredients-constructor'
import { addIngredientDetails, removeIngredientDetails } from './ingredient-details'
import { sendOrderAction, removeOrderDetails } from './order'
import { login, register, getUser, updateUser, logout, resetPassword, confirmResetPassword } from './auth'

export const actions = { getIngredientsAction, getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, addIngredientDetails, 
    removeIngredientDetails, sendOrderAction, updateCountIngredients, updateIngredientConstructor, removeOrderDetails, login, register, getUser, updateUser, 
    logout, resetPassword, confirmResetPassword }
    