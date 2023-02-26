import React, { useContext, useEffect, useState, useMemo, useReducer, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger.constructor.module.css';
import { TotalPriceContext} from  '../../services/appContext.js';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../services/actions';
import { useDrop, useDrag } from "react-dnd";

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

const Ingredient = ({ item, index, elementType, moveItem }) => {

    const dispatch = useDispatch();
    const ref = useRef(null);

    const handleDelete = () => {
        dispatch(actions.removeIngredientConstructor(item.dragId))
        dispatch(actions.updateCountIngredients(item._id, "", -1))
    }

    const [{isDrag}, drag] = useDrag({
        type: 'sort',
        item: {index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }) 
    });

    const [{handlerId}, drop] = useDrop({
        accept: 'sort',
        collect(monitor){
            return { handlerId: monitor.getHandlerId()}
        },
        drop(item, monitor) {
            if(!ref.current){
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if(dragIndex === hoverIndex) {
                return;
            }
            const hoverBoudingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoudingRect.bottom - hoverBoudingRect.top) / 2;
            const hoverClientY = monitor.getClientOffset.y - hoverBoudingRect.top;

            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
               return;
            }
            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;       
        }

    })

    const dragDropRef = (item.type !== 'bun') ? drag(drop(ref)) : ref;
    const opacity = isDrag ? 0 : 1;

    const onDropHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="mb-4">
            <div ref={dragDropRef} style={{ opacity }} onDrop={onDropHandler}>
             <div className={styles.items} >
                <div className="mr-2">
                    <DragIcon type="primary" />
                </div>
                <ConstructorElement
                    type={elementType}
                    price={item.price}
                    text={item.name + " " + renderName[elementType]}
                    thumbnail={item.image_mobile}
                    isLocked={elementType === "top" || elementType === "bottom" ? true : false}
                    handleClose={handleDelete}
                />
              </div>
            </div>
        </div>)
}

Ingredient.propTypes = {
    item: PropTypes.object.isRequired,
    index: PropTypes.number,
    elementType: PropTypes.string.isRequired,
    moveItem: PropTypes.func
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

const BurgerConstructor = ({ onButtonClick, onDropHandler }) => {

    const {orderData, ingredientsConstructor} = useSelector(store => ({
        orderData: store?.order?.orderData,
        ingredientsConstructor: store?.ingredientsConstructor || []
    }))

    const dispatch = useDispatch();

    const [itemBunId, setItemBunId] = useState('');

    const [totalPriceState, totalPriceDispatcher] = useReducer(reducer, totalPriceInitialState);


    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver
        }),
        drop(item) {
            onDropHandler(item, itemBunId);
        }
    })

    const onSortHandler = useCallback((dragIndex, hoverIndex) => {
        const dragItem = ingredientsConstructor[dragIndex];
        const newList = [...ingredientsConstructor];
        newList.splice(dragIndex, 1);
        newList.splice(hoverIndex, 0, dragItem);
        dispatch(actions.updateIngredientConstructor(newList));
    }, [ingredientsConstructor])

    const handleButtonClick = () => {
        if(ingredientsConstructor) {
            const request = getIngredientsRequest();
            dispatch(actions.getOrder(request));
        }
        return onButtonClick();
    };

    const getIngredientsRequest = () => {
        const ingredientsId = ingredientsConstructor.filter(item => item.type !== 'bun').map(item => item._id);
        const allIngredientsId = [itemBunId, ...ingredientsId, itemBunId];
        return { ingredients: allIngredientsId };
    }


    const itemFirstBunId = useMemo(()=> ingredientsConstructor?.find((item) => item.type === "bun")?._id, [ingredientsConstructor]) || '';

    const totalPrice = useMemo(() => {
            return  ingredientsConstructor.reduce((acc, item) => { 
                    const itemPrice = (item._id === itemBunId) ? (2 * item.price) : item.price;
                    return acc + itemPrice
                }, 0)
    }, [ingredientsConstructor, itemBunId])

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
                    <section ref={dropTarget} className={`${isHover ? styles.on_hover : ''}`}>
                    <div className={styles.items_container}  >
                        {itemBunId && ingredientsConstructor.filter(item => item._id === itemBunId).map((item) => 
                            <Ingredient key={item.dragId} item={item} elementType="top"/> 
                        )}
                        <div className={styles.items_constructor}> 
                            { ingredientsConstructor.map((item, index) => item._id !== itemBunId 
                                && <Ingredient key={item.dragId} item={item} index={index} elementType='center' moveItem={onSortHandler}/>)}
                        </div>
                        {itemBunId && ingredientsConstructor.filter(item => item._id === itemBunId).map((item) => 
                            <Ingredient key={item.dragId} item={item} elementType="bottom"/> 
                        )}
                    </div>
                    </section>
                </div>
                <div className="pl-4 pr-4">
                    <div className={styles.total_price_container}>
                        <TotalPrice />
                        <div className="ml-10">
                            <Button htmlType="button" disabled={itemBunId === ''} type="primary" size="large" onClick={handleButtonClick}>Оформить заказ</Button>
                        </div>
                    </div>    
                </div>

            </div>
            </TotalPriceContext.Provider>
        </div>
    )
}

export default BurgerConstructor;
