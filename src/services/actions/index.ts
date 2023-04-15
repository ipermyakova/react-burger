import { getIngredientsAction, updateCountIngredients, TIngredientsActions } from './ingredients'
import { getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, updateIngredientConstructor, removeIngredientsConstructor, TIngredientsConstructorActions } from './ingredients-constructor'
import { addIngredientDetails, removeIngredientDetails, TIngredientDetailsActions } from './ingredient-details'
import { sendOrderAction, getOrderActions, removeOrderDetails, TOrderActions } from './order'
import { login, register, getUser, updateUser, logout, resetPassword, confirmResetPassword, TAuthActions } from './auth'
import { connect, disconnect, wsOpen, wsError, wsMessage, wsConnecting, wsClose, send, TOrdersAllActions } from './ws-orders-all';

export const actions = { getIngredientsAction, getIngredientsConstructor, addIngredientConstructor, removeIngredientConstructor, addIngredientDetails, 
    removeIngredientDetails, sendOrderAction, getOrderActions, updateCountIngredients, updateIngredientConstructor, removeIngredientsConstructor, removeOrderDetails, login, register, getUser, updateUser, 
    logout, resetPassword, confirmResetPassword, connect, disconnect, wsOpen, wsError, wsMessage, wsConnecting, wsClose, send }

export type TApplicationActions = TIngredientsActions | TOrderActions | TIngredientsConstructorActions  | TIngredientDetailsActions | TAuthActions;

    