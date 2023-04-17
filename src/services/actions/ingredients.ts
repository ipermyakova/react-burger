import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, UPDATE_COUNT_INGREDIENT } from '../constants'
import { getIngredients } from '../../utils/burger-api'
import { TIngredient } from '../types/data'
import { AppDispatch } from '../types';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
};
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IUpdateCountIngredientsAction {
    readonly type: typeof UPDATE_COUNT_INGREDIENT;
    readonly id: string;
    readonly bunId: string;
    readonly value: number;
    readonly itemType: string;
}

export type TIngredientsActions = IGetIngredientsRequestAction | IGetIngredientsFailedAction | IGetIngredientsSuccessAction | IUpdateCountIngredientsAction

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
})

export const getIngredientsSuccessAction = (data: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: data
})

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_FAILED
})

export const getIngredientsAction = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequestAction())
    getIngredients()
    .then(data => {
        dispatch(getIngredientsSuccessAction(data.data))
    })
    .catch(e => {
        dispatch(getIngredientsFailedAction())
    });
}

export const updateCountIngredients = (id: string, bunId: string, value: number, itemType: string): IUpdateCountIngredientsAction => ({
    type: UPDATE_COUNT_INGREDIENT,
    id,
    bunId,
    value,
    itemType
})
