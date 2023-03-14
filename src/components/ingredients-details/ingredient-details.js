import React , { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.details.module.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const IngredientDetails = () => {

    const { ingredientId } = useParams();
    const [ ingredient, setIngredient ] = useState(null);

    const { ingredientDetails } = useSelector(store => ({
        ingredientDetails: store?.ingredientDetails?.currentIngredient || null,
    }))

    const { ingredients } = useSelector(store => ({
        ingredients: store?.ingredients?.ingredients || null
    }))

    const currentIngredient = ingredients?.find(item => item._id === ingredientId);

    useEffect(() => {
        if(!ingredientDetails && currentIngredient) {
            setIngredient(currentIngredient)
        } else  {
            setIngredient(ingredientDetails)
        }
    }, [ingredientDetails, currentIngredient])

    return (
    <div className={styles.container}>
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
    )
};

export default IngredientDetails;