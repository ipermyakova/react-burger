import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from '../constants'
import { TIngredientsActions } from '../actions/ingredients'
import { getIngredientsReducer } from './ingredients'
import { ingredients } from './test-data'

describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getIngredientsReducer(undefined, {} as TIngredientsActions)
        ).toEqual(
            {
                isLoading: false,
                hasError: false,
                ingredients: []
            }
        )
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            getIngredientsReducer(
                {
                    ingredients: [],
                    isLoading: false,
                    hasError: false
                },
                {
                    type: GET_INGREDIENTS_REQUEST
                }
            )
        ).toEqual(
            {
                ingredients: [],
                isLoading: true,
                hasError: false,
            }
        )
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            getIngredientsReducer(
                {
                    ingredients: [],
                    isLoading: true,
                    hasError: false
                },
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: ingredients
                }
            )
        ).toEqual(
            {
                isLoading: false,
                hasError: false,
                ingredients: ingredients
            }
        )  
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            getIngredientsReducer(
                {
                    ingredients: [],
                    isLoading: true,
                    hasError: false
                },
                {
                    type: GET_INGREDIENTS_FAILED
                }
            )
        ).toEqual(
            {
                isLoading: false,
                hasError: true,
                ingredients: []
            }
        )       
    })
})
