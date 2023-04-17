import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants'
import { TIngredient } from '../types/data'


export interface IAddIngredientDetails {
    readonly type: typeof ADD_INGREDIENT_DETAILS,
    readonly ingredient: TIngredient 
}

export interface IRemoveIngredientDetails {
    readonly type: typeof REMOVE_INGREDIENT_DETAILS
}
export type TIngredientDetailsActions = IAddIngredientDetails | IRemoveIngredientDetails;

export const addIngredientDetails = (ingredient: TIngredient): IAddIngredientDetails => ({
    type: ADD_INGREDIENT_DETAILS,
    ingredient
});

export const removeIngredientDetails = (): IRemoveIngredientDetails => ({
    type: REMOVE_INGREDIENT_DETAILS,
})