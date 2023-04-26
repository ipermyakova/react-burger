import { getIngredientsReducer as ingredients, TIngredientsState } from './ingredients'
import { getIngredientsConstructorReducer as ingredientsConstructor, TIngredientsConstructorState} from './ingredients-constructor'
import { ingredientDetailsReducer as ingredientDetails, TIngredientDetailsState } from './ingredient-details'
import { getOrderReducer as order, TOrderState } from './order'
import { authReducer as auth, TAuthState } from './auth'
import { getOrdersReducer as orders, TOrdersState } from './ws-orders'
import { getFeedReducer as feed, TFeedState  } from './ws-feed'

export { ingredients, ingredientsConstructor, ingredientDetails, order, auth, orders, feed }

export type RootState = {
    ingredients: TIngredientsState,
    order: TOrderState, 
    ingredientDetails: TIngredientDetailsState,
    ingredientsConstructor: TIngredientsConstructorState,
    auth: TAuthState,
    feed: TFeedState,
    orders: TOrdersState
}