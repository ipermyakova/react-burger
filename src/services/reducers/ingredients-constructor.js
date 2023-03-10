import { GET_INGREDIENTS_CONSTRUCTOR, ADD_INGREDIENT_CONSTRUCTOR, REMOVE_INGREDIENT_CONSTRUCTOR, UPDATE_INGREDIENT_CONSTRUCTOR } from '../constants'

const initialState = []

export const getIngredientsConstructorReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_INGREDIENTS_CONSTRUCTOR: 
            return state
        case ADD_INGREDIENT_CONSTRUCTOR: {
            const item = action.ingredient;
            if (item.type !== 'bun') {
                return [...state, { ...item, dragId: action.dragId }]
            }
            const currentBun = state.find(item => item.type === 'bun')
            if(currentBun) {
                if(currentBun._id !== item._id) {
                    return [...state.filter(item => item._id !== currentBun._id), { ...item, dragId: action.dragId}]
                } 
                return state;
            }
            return [...state, { ...item, dragId: action.dragId }] 
        }
        
        case REMOVE_INGREDIENT_CONSTRUCTOR: {
            return [...state.filter(item => item.dragId !== action.id)]
        } 

        case UPDATE_INGREDIENT_CONSTRUCTOR: {
            return [... action.ingredients]
        }

        default: return state;    
    }
}