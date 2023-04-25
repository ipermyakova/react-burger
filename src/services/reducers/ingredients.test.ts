import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../constants'
import { TIngredientsActions } from '../actions/ingredients'
import { getIngredientsReducer } from './ingredients'
import { ingredients } from './test-data'
import { initialState } from './ingredients'

describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getIngredientsReducer(undefined, {} as TIngredientsActions)
        ).toEqual(
            {
                ...initialState
            }
        )
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            getIngredientsReducer(
                {
                    ...initialState
                },
                {
                    type: GET_INGREDIENTS_REQUEST
                }
            )
        ).toEqual(
            {
                ...initialState,
                isLoading: true,
            }
        )
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            getIngredientsReducer(
                {
                    ...initialState,
                    isLoading: true
                },
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: ingredients
                }
            )
        ).toEqual(
            {
                ...initialState,
                ingredients: ingredients
            }
        )  
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            getIngredientsReducer(
                {
                    ...initialState,
                    isLoading: true
                },
                {
                    type: GET_INGREDIENTS_FAILED
                }
            )
        ).toEqual(
            {
                ...initialState,
                hasError: true
            }
        )       
    })
})
