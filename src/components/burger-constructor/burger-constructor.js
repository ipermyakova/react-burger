import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger.constructor.module.css';
import { ingredientsPropTypes } from '../utils/prop-types';

const getElementType = (index, lastIndex) => {
    return index === 0 ? "top" : index === lastIndex ? "bottom" : undefined;
}

const Ingredient = ({ name, price, image, elementType }) => {
    return (
        <div className="mb-4">
            <div className={styles.items}>
                <div className="mr-2">
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type={elementType}
                    price={price}
                    text={name}
                    thumbnail={image}
                    isLocked={elementType === "top" || elementType === "bottom" ? true : false}
                />
            </div>
        </div>)
}

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    elementType: PropTypes.string
}

const BurgerConstructor = ({ ingredients, onButtonClick }) => {
    
    const handleButtonClick = () => {
        return onButtonClick();
    };
    
    return (
        <div className="ml-10">
            <div className={styles.burger_container}>
                <div className='pl-4 pr-4 pt-25 pb-10'>
                    <div className={styles.items_container}>
                        { ingredients.map((item, index) => 
                            <Ingredient key={item._id} name={item.name} price={item.price} image={item.image_mobile} 
                            elementType={ getElementType(index, ingredients.length - 1)}/>
                        )}
                    </div>
                </div>
                <div className="pl-4 pr-4">
                        <div className={styles.total_price_container}>
                            <div className={styles.items}>
                                <p className={styles.price}>{ ingredients.reduce((acc, item) => {
                                    return acc + item.price
                                }, 0) }</p>
                            <div className="ml-2">
                                <CurrencyIcon type="primary"/>
                            </div>
                        </div>
                        <div className="ml-10">
                            <Button htmlType="button" type="primary" size="large" onClick={handleButtonClick}>Оформить заказ</Button>
                        </div>
                        </div>
                </div>

            </div>
        </div>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    onButtonClick: PropTypes.func.isRequired
}

export default BurgerConstructor;