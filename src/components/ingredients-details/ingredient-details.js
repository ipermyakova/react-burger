import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient.details.module.css';

const IngredientDetails = ({ name, calories, proteins, fat, carbohydrates, image_large }) => {
    return (
    <div className={styles.container}>
        <img src={image_large}></img>
        <div className="mt-4 mb-8">
            <p className={styles.title}>{name}</p>
        </div>
        <div className="mb-5">
            <div className={styles.item_container}>
                <div className={styles.item}>
                    <div className="mb-2">
                        <p className={styles.title_description}>Калории, ккал</p>
                    </div>
                    <p className={styles.number}>{calories}</p>
                </div>
                <div className={styles.item}>
                    <div className="mb-2">
                        <p className={styles.title_description}>Белки, г</p>
                    </div>
                    <p className={styles.number}>{proteins}</p>
                </div>
                <div className={styles.item}>
                    <div className="mb-2">
                        <p className={styles.title_description}>Жиры, г</p>
                    </div>
                    <p className={styles.number}>{fat}</p>
                </div>
                <div className={styles.item}>
                    <div className="mb-2">
                        <p className={styles.title_description}>Углеводы, г</p>
                    </div>
                    <p className={styles.number}>{carbohydrates}</p>
                </div>
            </div>
        </div>
    </div>
    )
};

IngredientDetails.propTypes = {
    name: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    image_large: PropTypes.string
}

export default IngredientDetails;