import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../constants'
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

export type TIngredientsActions = IGetIngredientsRequestAction | IGetIngredientsFailedAction | IGetIngredientsSuccessAction

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
