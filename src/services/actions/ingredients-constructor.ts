import { GET_INGREDIENTS_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENT_CONSTRUCTOR, UPDATE_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENTS_CONSTRUCTOR } from '../constants'
import uuid from 'react-uuid';
import { TIngredient } from '../types/data'

export interface IGetIngredientsConstructor {
    readonly type: typeof GET_INGREDIENTS_CONSTRUCTOR
};

export interface IAddIngredientConstructor {
    readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR
    readonly ingredient: TIngredient
    readonly dragId: string
};

export interface IRemoveIngredientConstructor {
    readonly type: typeof REMOVE_INGREDIENT_CONSTRUCTOR
    readonly id: string
};

export interface IUpdateIngredientConstructor {
    readonly type: typeof UPDATE_INGREDIENT_CONSTRUCTOR
    ingredients: Array<TIngredient>
};

export interface IRemoveIngredientsConstructor {
    readonly type: typeof REMOVE_INGREDIENTS_CONSTRUCTOR 
}

export type TIngredientsConstructorActions = IGetIngredientsConstructor | IAddIngredientConstructor | IRemoveIngredientConstructor | IUpdateIngredientConstructor | IRemoveIngredientsConstructor

export const getIngredientsConstructor = (): IGetIngredientsConstructor => ({
    type: GET_INGREDIENTS_CONSTRUCTOR
});

export const addIngredientConstructor = (ingredient: TIngredient): IAddIngredientConstructor => ({
    type: ADD_INGREDIENT_CONSTRUCTOR,
    ingredient: ingredient,
    dragId: uuid()
});

export const removeIngredientConstructor = (id: string): IRemoveIngredientConstructor => ({
    type: REMOVE_INGREDIENT_CONSTRUCTOR,
    id: id
});

export const updateIngredientConstructor = (ingredients: Array<TIngredient>): IUpdateIngredientConstructor => ({
    type: UPDATE_INGREDIENT_CONSTRUCTOR,
    ingredients: [...ingredients]
});

export const removeIngredientsConstructor = (): IRemoveIngredientsConstructor => ({
    type: REMOVE_INGREDIENTS_CONSTRUCTOR
});