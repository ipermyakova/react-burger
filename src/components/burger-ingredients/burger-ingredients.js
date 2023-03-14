import React, { useRef, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './burger.ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { mapToColums, filter} from '../utils/utils';
import {ingredientsPropTypes} from '../utils/prop-types';
import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../services/actions';


const renderName = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки"
}

const types = ['bun', 'sauce', 'main'];

const Item = ({ item }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredient",
        item: {...item},
        collect: monitor => ({
            opacity: monitor.isDragging ? 0.5 : 1
        }) 
    });

    const handleClick = (e) => {
        const ingredientId = item._id;
        dispatch(actions.addIngredientDetails(item));
        navigate(`/ingredients/${ingredientId}`, {state: { background: location }} )
    }

    return (
        <div onClick={handleClick} className={styles.item}>
            {item.count && <Counter count={item.count} size="default" extraClass='m-1'></Counter>}
            < div styles={{ opacity }}>
                <div className={styles.item_drag} ref={dragRef}>
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
            </div>
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

    const handleScroll = () => {
        const topBun = Math.abs(nameBunRef.current?.getBoundingClientRect().top);
        const topSauce = Math.abs(nameSauceRef.current?.getBoundingClientRect().top);
        const topMain = Math.abs(nameMainRef.current?.getBoundingClientRect().top);

        if(topBun < topSauce && topBun < topMain) {
            setCurrent('bun');
        } else if(topSauce < topBun && topSauce < topMain) {
            setCurrent('sauce');
        } else {
            setCurrent('main')
        }    
    };

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
            <div className={styles.types_container} onScroll={handleScroll}>
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
    onCardClick: PropTypes.func.isRequired,   
}

export default BurgerIngredients;