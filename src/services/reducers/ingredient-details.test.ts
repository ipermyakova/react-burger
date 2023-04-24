import { ingredientDetailsReducer } from './ingredient-details'
import { bun } from './test-data'
import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../constants'
import { TIngredientDetailsActions } from '../actions/ingredient-details';


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(ingredientDetailsReducer(undefined, {} as TIngredientDetailsActions)
        ).toEqual(
            {
                currentIngredient: null
            }
        )
    })
    it('should handle ADD_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            ingredientDetailsReducer(
                {
                    currentIngredient: null
                },
                {
                    type: ADD_INGREDIENT_DETAILS,
                    ingredient: bun
                }
            )
        ).toEqual(
            {
                currentIngredient: bun
            }
        )
    })

    it('should handle REMOVE_INGREDIENT_DETAILS', () => {
        expect(
            ingredientDetailsReducer(
                {
                    currentIngredient: bun
                },
                {
                    type: REMOVE_INGREDIENT_DETAILS
                }
            )
        ).toEqual(
            {
                currentIngredient: null
            }
        )
    })
})