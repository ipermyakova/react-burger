import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger.ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { mapToColums } from '../utils/utils'

const filter = (ingredients, current) => {
    return ingredients.filter(item => item.type === current);  
}

const renderTabName = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
}

const Item = ({ name, price, image }) => {
    return (
        <div className={styles.item}>
            <Counter count={1} size="default" extraClass='m-1'></Counter>
            <img src={image} />
            <div className={styles.items}>
                <div className="mt-2 mb-2">
                    <p className={styles.price}>{price}</p>
                </div>
                <div className="ml-2">
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            <p className={styles.text}>{name}</p>
        </div>
    )
}

Item.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

const Items = (props) => {
    return (
        <div className={styles.items}>
            {props.children}
        </div>
    )
}

const ingredientsPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
}) 

const BurgerIngredients = ({ ingredients }) => {
    const [current, setCurrent] = React.useState('bun');

    return (
        <div className={styles.container}>
            <div className="mt-10 mb-5">
                <h2 className={styles.main_title}>Соберите бургер</h2>
            </div>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
            </div>
            <div className="mt-10 mb-6">
                <h2 className={styles.tab_title}>{renderTabName[current]}</h2>
            </div>
            <div className={styles.items_container}>
                    { mapToColums(filter(ingredients, current)).map((items, index) => {
                        const first = items.first;
                        const second = items.second;
                        return (
                         <Items key={index}>
                            { first && <div className="ml-4 mb-8">
                                <Item key={first._id} name={first.name} price={first.price} image={first.image}></Item></div>}
                            { second && <div className="ml-6 mb-8">
                                <Item key={second._id} name={second.name} price={second.price} image={second.image}></Item></div>}
                        </Items>)
                    })}
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes)
}

export default BurgerIngredients;