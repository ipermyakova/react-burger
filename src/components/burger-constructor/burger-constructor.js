import React, { useContext, useEffect, useState, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon, LockIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger.constructor.module.css';
import { IngredientsContext, TotalPriceContext, OrderContext } from  '../../services/appContext.js';
import { checkResponse } from '../utils/utils';

const url = 'https://norma.nomoreparties.space/api/orders';

const renderName = {
    top: "(верх)",
    bottom: "(низ)",
    center: ""
}

const TotalPrice = () => {
    const { totalPriceState } = useContext(TotalPriceContext); 

    return (
        <div className={styles.total_price}>
            <p className={styles.price}>{totalPriceState.totalPrice}
            </p>
            <div className="ml-2">
                <CurrencyIcon type="primary"/>
            </div>
        </div>
    )
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
                    text={name + " " + renderName[elementType]}
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

const totalPriceInitialState = { totalPrice:  0 };

function reducer(state, action) {
    switch(action.type) {
        case "set":
            return { totalPrice: action.payload};
        case "reset":
            return totalPriceInitialState;
        default: 
            throw new Error(`Wrong type of action: ${action.type}`);        
    }

}

const BurgerConstructor = ({ onButtonClick }) => {

    const { ingredientsState, setIngredientsState } = useContext(IngredientsContext);
   
    const { orderState, setOrderState } = useContext(OrderContext);

    const [itemBunId, setItemBunId] = useState('');

    const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState);

    const { data } = ingredientsState;
    
    const handleButtonClick = () => {
        if(data) {
            getOrder();
        }
        return onButtonClick();
    };

    const getOrder = () => {
        setOrderState({ ...orderState, hasError: false, isLoading: true });
        fetch(url, 
            { method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8'}, body: JSON.stringify(getIngredientsRequest())})
        .then(checkResponse)
        .then(data => setOrderState({ ...orderState, orderData: { order: data.order, name: data.name }, isLoading: false, hasError: false }))
        .catch(e => {
            setOrderState( { ...orderState, hasError: true, isLoading: false })
        });
    }

    const getIngredientsRequest = () => {
        const ingredientsId = getIngredients().map(item => item._id);
        return { ingredients: ingredientsId };

    }

    const getIngredients = () => {
        return data.filter(item => item.type !== 'bun' || item._id === itemBunId);
    }

    const itemFirstBunId = useMemo(()=> data.find((item) => item.type === "bun")._id, [data]);

    const totalPrice = useMemo(() => {
            return getIngredients().reduce((acc, item) => { 
                    const itemPrice = (item._id === itemBunId) ? (2 * item.price) : item.price;
                    return acc + itemPrice
                }, 0)
    }, [data, itemBunId])

    useEffect(() => {
        setItemBunId(itemFirstBunId);

    }, [itemFirstBunId])

    useEffect(() => {
        totalPriceDispatcher({ type: "set", payload: totalPrice });

    }, [totalPrice])

    
    return (
        <div className="ml-10">
            <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
            <div className={styles.burger_container}>
                <div className='pl-4 pr-4 pt-25 pb-10'>
                    <div className={styles.items_container}>
                        {itemBunId && data.filter(item => item._id === itemBunId).map((item, index) => 
                            <Ingredient key={item._id} name={item.name} price={item.price} image={item.image_mobile} 
                            elementType="top"/> 
                        )}
                        <div className={styles.items_constructor}> 
                            { data.filter(item => item.type !== 'bun').map((item, index) => 
                                <Ingredient key={item._id} name={item.name} price={item.price} image={item.image_mobile} 
                                elementType={ item.type === 'bun' ? "top" : 'center'}/>
                            )}
                        </div>
                        {itemBunId && data.filter(item => item._id === itemBunId).map((item, index) => 
                            <Ingredient key={item._id} name={item.name} price={item.price} image={item.image_mobile} 
                            elementType="bottom"/> 
                        )}
                    </div>
                </div>
                <div className="pl-4 pr-4">
                    <div className={styles.total_price_container}>
                        <TotalPrice />
                        <div className="ml-10">
                            <Button htmlType="button" type="primary" size="large" onClick={handleButtonClick}>Оформить заказ</Button>
                        </div>
                    </div>    
                </div>

            </div>
            </TotalPriceContext.Provider>
        </div>
    )
}

BurgerConstructor.propTypes = {
    onButtonClick: PropTypes.func.isRequired
}

export default BurgerConstructor;