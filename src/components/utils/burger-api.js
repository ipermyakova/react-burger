import { checkResponse } from '../utils/utils';

const urlGetIngredients = 'https://norma.nomoreparties.space/api/ingredients'

export const getIngredients = (ingredientsState, setIngredientsState) => {
    setIngredientsState({ ...ingredientsState, hasError: false, isLoading: true });
    fetch(urlGetIngredients)
    .then(checkResponse)
    .then(data => setIngredientsState({ ...ingredientsState, data: data.data, isLoading: false }))
    .catch(e => {
        setIngredientsState({ ...ingredientsState, hasError: true, isLoading: false })
    });
};