import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import pageStyles from './login.module.css';
import styles from '../components/ingredients-details/ingredient.details.module.css';
import { actions } from '../services/actions'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/reducers'
import { AppDispatch } from '../services';
import { TIngredient } from '../services/types/data';

export const IngredientDetailsPage =() => {

    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const [ ingredient, setIngredient ] = useState<TIngredient | null>(null);

    const { ingredients, hasError, isLoading } = useSelector((store: RootState) => ({
        ingredients: store?.ingredients?.ingredients || null,
        isLoading: store?.ingredients?.isLoading || false, 
        hasError: store?.ingredients?.hasError || false
    }))

    const currentIngredient = ingredients?.find( item => item._id === id);

    useEffect(() => {
        if(currentIngredient) {
            setIngredient(currentIngredient);
        }           
    }, [id, currentIngredient])

    return (
        <div>
            {isLoading && 'Загрузка'}
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