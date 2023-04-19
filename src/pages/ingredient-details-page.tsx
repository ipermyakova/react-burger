import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import pageStyles from './login.module.css';
import styles from '../components/ingredients-details/ingredient.details.module.css';
import { TIngredient } from '../services/types/data';
import { useSelector, useDispatch } from '../hooks/hooks';
import Loader from '../components/loader/loader';
import { actions } from '../services/actions';


export const IngredientDetailsPage = () => {

    const { id } = useParams();
    const [ingredient, setIngredient] = useState<TIngredient | null>(null);
    const dispatch = useDispatch();

    const { ingredients, hasError, isLoading } = useSelector(store => ({
        ingredients: store?.ingredients?.ingredients || null,
        isLoading: store?.ingredients?.isLoading || false,
        hasError: store?.ingredients?.hasError || false
    }))

    useEffect(() => {
        if (ingredients && ingredients.length === 0) {
            dispatch(actions.getIngredientsAction());
        }
    }, []);

    const currentIngredient = ingredients?.find(item => item._id === id);

    useEffect(() => {
        if (currentIngredient) {
            setIngredient(currentIngredient);
        }
    }, [id, currentIngredient])

    return (
        <div>
            {isLoading && <div className={styles.loader_wrapper}><Loader /></div>}
            {hasError && 'Возникла ошибка'}
            {!isLoading && !hasError && ingredients && ingredients.length > 0 &&
                <div className={pageStyles.ingredient_wrapper}>
                    <div className={pageStyles.ingredient_container}>
                        <h2 className={pageStyles.ingredient_heading}>Детали ингредиента</h2>
                        <img src={ingredient?.image_large}></img>
                        <div className="mt-4 mb-8">
                            <p className={styles.title}>{ingredient?.name}</p>
                        </div>
                        <div className="mb-5">
                            <div className={styles.item_container}>
                                <div className={styles.item}>
                                    <div className="mb-2">
                                        <p className={styles.title_description}>Калории, ккал</p>
                                    </div>
                                    <p className={styles.number}>{ingredient?.calories}</p>
                                </div>
                                <div className={styles.item}>
                                    <div className="mb-2">
                                        <p className={styles.title_description}>Белки, г</p>
                                    </div>
                                    <p className={styles.number}>{ingredient?.proteins}</p>
                                </div>
                                <div className={styles.item}>
                                    <div className="mb-2">
                                        <p className={styles.title_description}>Жиры, г</p>
                                    </div>
                                    <p className={styles.number}>{ingredient?.fat}</p>
                                </div>
                                <div className={styles.item}>
                                    <div className="mb-2">
                                        <p className={styles.title_description}>Углеводы, г</p>
                                    </div>
                                    <p className={styles.number}>{ingredient?.carbohydrates}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}