import { getIngredientsReducer as ingredients, TIngredientsState } from './ingredients'
import { getIngredientsConstructorReducer as ingredientsConstructor, TIngredientsConstructorState} from './ingredients-constructor'
import { ingredientDetailsReducer as ingredientDetails, TIngredientDetailsState } from './ingredient-details'
import { getOrderReducer as order, TOrderState } from './order'
import { authReducer as auth, TAuthState } from './auth'

export { ingredients, ingredientsConstructor, ingredientDetails, order, auth }

export type RootState = {
    ingredients: TIngredientsState,
    order: TOrderState, 
    ingredientDetails: TIngredientDetailsState,
    ingredientsConstructor: TIngredientsConstructorState,
    auth: TAuthState
}