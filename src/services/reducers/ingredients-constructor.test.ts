import { GET_INGREDIENTS_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENT_CONSTRUCTOR, UPDATE_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENTS_CONSTRUCTOR } from '../constants'
import { TIngredientsConstructorActions } from '../actions/ingredients-constructor'
import { getIngredientsConstructorReducer } from './ingredients-constructor'
import { bun, main1, main2, constructor, reverseConstructor } from './test-data'


describe('ingredients reduce', () => {
    it('should return the initial state', () => {
        expect(getIngredientsConstructorReducer(undefined, {} as TIngredientsConstructorActions)
        ).toEqual(
            {
                bun: null,
                ingredients: []
            }
        )
    })

    it('should handle GET_INGREDIENTS_CONSTRUCTOR', () => {
        expect(
            getIngredientsConstructorReducer(
                {
                    bun: bun,
                    ingredients: constructor,
                },
                {
                    type: GET_INGREDIENTS_CONSTRUCTOR
                }
            )
        ).toEqual(
            {
                bun: bun,
                ingredients: constructor,
            }
        )
    })

    it('should handle ADD_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            getIngredientsConstructorReducer(
                {
                    bun: null,
                    ingredients: [],
                },
                {
                    type: ADD_INGREDIENT_CONSTRUCTOR,
                    payload: bun
                }
            )
        ).toEqual(
            {
                bun: bun,
                ingredients: [],
            }
        )
        expect(
            getIngredientsConstructorReducer(
                {
                    bun: null,
                    ingredients: [],
                },
                {
                    type: ADD_INGREDIENT_CONSTRUCTOR,
                    payload: main1
                }
            )
        ).toEqual(
            {
                bun: null,
                ingredients: [main1],
            }
        )
    })

    it('should handle REMOVE_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            getIngredientsConstructorReducer(
                {
                    bun: bun,
                    ingredients: constructor,
                },
                {
                    type: REMOVE_INGREDIENT_CONSTRUCTOR,
                    id: "1"
                }
            )
        ).toEqual(
            {
                bun: bun,
                ingredients: [main2],
            }
        )
    })

    it('should handle UPDATE_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            getIngredientsConstructorReducer(
                {
                    bun: bun,
                    ingredients: constructor,
                },
                {
                    type: UPDATE_INGREDIENT_CONSTRUCTOR,
                    ingredients: reverseConstructor 
                }
            )
        ).toEqual(
            {
                bun: bun,
                ingredients: reverseConstructor,
            }
        )
    })

    it('should handle REMOVE_INGREDIENTS_CONSTRUCTOR', () => {
        expect(
            getIngredientsConstructorReducer(
                {
                    bun: bun,
                    ingredients: constructor,
                },
                {
                    type: REMOVE_INGREDIENTS_CONSTRUCTOR,
                }
            )
        ).toEqual(
            {
                bun: null,
                ingredients: [],
            }
        )
    })
})
