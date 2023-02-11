import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './burger.ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { mapToColums, filter} from '../utils/utils';
import { ingredientsPropTypes } from '../utils/prop-types';

const renderName = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
}

const types = ['bun', 'sauce', 'main'];

const Item = ({ item, onItemClick }) => {
    const handleClick = () => onItemClick(item._id);
    return (
        <div className={styles.item} onClick={handleClick}>
            <Counter count={1} size="default" extraClass='m-1'></Counter>
            <img src={item.image} />
            <div className={styles.items}>
                <div className="mt-2 mb-2">
                    <p className={styles.price}>{item.price}</p>
                </div>
                <div className="ml-2">
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
            <p className={styles.text}>{item.name}</p>
        </div>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired
}

const Items = (props) => {
    return (
        <div className={styles.items}>
            {props.children}
        </div>
    )
}

Items.propTypes = {
    children: PropTypes.array
}

const BurgerIngredients = ({ ingredients, onCardClick }) => {

    const [current, setCurrent] = React.useState('bun');

    const nameBunRef = useRef();
    const nameSauceRef = useRef();
    const nameMainRef = useRef();

    const getNameRef = (name) => name === 'bun' ? nameBunRef : name === 'sauce' ? nameSauceRef : nameMainRef;

    const handleClick = (value) => {
        setCurrent(value);
        getNameRef(value).current.scrollIntoView();
    };
    
    return (
        <div className={styles.container}>
            <div className="mt-10 mb-5">
                <h2 className={styles.main_title}>Соберите бургер</h2>
            </div>
            <div style={{ display: 'flex' }}>
                <Tab value="bun" active={current === 'bun'} onClick={handleClick}>Булки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>Соусы</Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClick}>Начинки</Tab>
            </div>
            <div className={styles.types_container}>
            {types.map((name, index) => <div key={index} ref={getNameRef(name)}>
                <div className="mt-10 mb-6">
                    <h2 className={styles.tab_title}>{renderName[name]}</h2>
                </div>
                <div className={styles.items_container}>
                        { mapToColums(filter(ingredients, name)).map((items, index) => {
                            return (
                            <Items key={index}>
                             { items.first && <div className="ml-4 mb-8">
                                <Item key={items.first._id} item={items.first} onItemClick={onCardClick}></Item></div>}
                             { items.second && <div className="ml-6 mb-8">
                                <Item key={items.second._id} item={items.second} onItemClick={onCardClick}></Item></div>}
                            </Items>)
                        })}
                </div>
            </div>)}
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
    onCardClick: PropTypes.func.isRequired
}

export default BurgerIngredients;