import React, { useEffect, useMemo, useCallback, FC } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { actions } from '../../services/actions';
import { useDrop, DropTargetMonitor } from "react-dnd";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth'
import { TIngredient, TRequestOrder } from '../../services/types/data';
import styles from './burger.constructor.module.css';
import { getCookie } from '../../utils/cookie-utils';
import { useSelector, useDispatch } from '../../hooks/hooks';
import Loader from '../loader/loader';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient'


type TBurgerConstructorProps = {
    onDropHandler: (item: TIngredient, itemBunId: string) => void
}

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ onDropHandler }) => {

    const auth = useAuth();
    const dispatch = useDispatch();

    const { orderData, ingredientsConstructor, isLoading, hasError } = useSelector(store => ({
        orderData: store?.order?.orderData,
        isLoading: store?.order?.isLoading,
        hasError: store?.order?.hasError,
        ingredientsConstructor: store?.ingredientsConstructor
    }))

    const { ingredients, bun } = ingredientsConstructor

    const navigate = useNavigate();

    useEffect(() => {
        const orderNumber = orderData?.number
        if (!isLoading && !hasError && orderNumber) {
            dispatch(actions.removeIngredientsConstructor());
        }

    }, [orderData])


    const [collectedProps, dropTarget] = useDrop<TIngredient>({
        accept: 'ingredient',
        collect: (monitor: DropTargetMonitor<TIngredient, unknown>) => ({
            isHover: monitor.isOver
        }),
        drop(item: TIngredient) {
            onDropHandler(item, bun?._id || '');
        }
    })

    const onSortHandler = useCallback((dragIndex: number, hoverIndex: number) => {
        const dragItem = ingredients[dragIndex];
        const newList = [...ingredients];
        newList.splice(dragIndex, 1);
        newList.splice(hoverIndex, 0, dragItem);
        dispatch(actions.updateIngredientConstructor(newList));
    }, [ingredients])

    const handleButtonClick = () => {
        if (!getCookie('accessToken') && !auth.user) {
            navigate(`/login`);
        }
        if (ingredients) {
            const request = getIngredientsRequest();
            dispatch(actions.sendOrderAction(request));
        }
    };

    const getIngredientsRequest = (): TRequestOrder => {
        const ingredientsId = ingredients.map(item => item._id);
        const bunId = bun?._id
        const allIngredientsId = bunId ? [bunId, ...ingredientsId, bunId] : ingredientsId;
        return { ingredients: allIngredientsId };
    }


    const totalPrice = useMemo(() => {
        return (bun ? (bun.price * 2) : 0) +
            ingredients.reduce((acc, item) => {
                return acc + item.price
            }, 0)
    }, [ingredients, bun])

    return (
        <section className="ml-10">
            <div className={`${styles.burger_container} pl-4 pr-4 pt-25 pb-10`}>
                <section ref={dropTarget} className={`${(collectedProps as { isHover: boolean }).isHover ? styles.on_hover : ''}`}>
                    <div className={styles.items_container}  >
                        {bun && <ConstructorIngredient item={bun} elementType="top" />}
                        <div className={styles.items_constructor}>
                            {ingredients.map((item, index) =>
                                <ConstructorIngredient key={item.dragId} item={item} index={index} moveItem={onSortHandler} />)}
                        </div>
                        {bun && <ConstructorIngredient item={bun} elementType="bottom" />}
                    </div>
                </section>
                <div className="pl-4 pr-4">
                    <div className={styles.total_price_container}>
                        {isLoading && <div className="mr-10"><Loader /></div>}
                        <div className={styles.total_price}>
                            <p className={styles.price}>{totalPrice}</p>
                            <div className="ml-2">
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                        <div className="ml-10">
                            <Button htmlType="button" disabled={!bun || isLoading} type="primary" size="large"
                                onClick={handleButtonClick}>Оформить заказ</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BurgerConstructor;
