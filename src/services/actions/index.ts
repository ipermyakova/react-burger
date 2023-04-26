import { getIngredientsAction, TIngredientsActions } from './ingredients'
import { getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, updateIngredientConstructor, removeIngredientsConstructor, TIngredientsConstructorActions } from './ingredients-constructor'
import { addIngredientDetails, removeIngredientDetails, TIngredientDetailsActions } from './ingredient-details'
import { sendOrderAction, getOrderActions, removeOrderDetails, TOrderActions } from './order'
import { login, register, getUser, updateUser, logout, resetPassword, confirmResetPassword, getToken, TAuthActions } from './auth'

export const actions = { getIngredientsAction, getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, addIngredientDetails, 
    removeIngredientDetails, sendOrderAction, getOrderActions, updateIngredientConstructor, removeIngredientsConstructor, removeOrderDetails, login, register, getUser, updateUser, 
    logout, resetPassword, confirmResetPassword, getToken }    

export type TApplicationActions = TIngredientsActions | TOrderActions | TIngredientsConstructorActions  | TIngredientDetailsActions | TAuthActions 

    