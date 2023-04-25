import React, { FC, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient, TWsOrder, TStatusOrder } from '../services/types/data';
import { FEED_CONNECT, FEED_DISCONNECT} from '../services/constants';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../hooks/hooks';
import styles from './feed.module.css';
import { toDate } from '../utils/utils'
import { BURGER_API_WSS_FEED } from '../utils/burger-api'

const maxIngredients = 6;


type TRenderName = {
    [key in TStatusOrder]: string
}

const renderStatus: TRenderName = {
    created: "Создан",
    pending: "Готовиться",
    done: "Выполнен"
}

type TItemProps = {
    item: TWsOrder;
    ingredients: ReadonlyArray<TIngredient>;
    withStatus: boolean;
}

export const Item: FC<TItemProps> = ({ item, ingredients, withStatus = false }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const currentIngredients = useMemo(() =>{
        const result: Array<TIngredient> = [];
        item.ingredients.forEach(id => {
            const ingredient = ingredients.find(ingredient => ingredient._id === id);
            if (ingredient) {
                result.push(ingredient)
            }
        })
        return result;
    }, [item])

    const totalPrice = currentIngredients.reduce((acc, item) => {
        return acc + item.price
    }, 0)

    const ingredientsToShow = currentIngredients.slice(0, maxIngredients)

    const remains = currentIngredients.length > maxIngredients
        ? currentIngredients.length - maxIngredients : null


    const handleClick = () => {
        const id = item.number
        navigate(`${location.pathname}/${id}`, { state: { background: location } })
    }

    return (
        <div className="mb-4 mr-2">
            <div className={styles.item} onClick={handleClick}>
                <div className="m-6">
                    <div className={styles.number_time_container}>
                        <p className={styles.item_number}>{`#${item.number}`}</p>
                        <FormattedDate date={toDate(item.createdAt)} className={styles.date} />
                    </div>
                </div>
                <div className="ml-6">
                    <p className={styles.item_title}>{item.name}</p>
                </div>
                {withStatus && <div className="mt-2 ml-6">
                    <p className={item.status === 'done' ? styles.status_name_ready : styles.status_name}>{renderStatus[item.status]}</p>
                </div>}
                <div className="mb-6 mt-6 mr-6 ml-6">
                    <div className={styles.container_price}>
                        <div className={styles.container_image}>
                            {ingredientsToShow.map((ingredient, index) => {
                                return <div  key={ingredient.dragId} className={styles.box}>
                                    <img className={remains && index === 0 ? styles.image_opacity : styles.image} src={ingredient?.image_mobile} />
                                    {remains && index === 0 && <p className={styles.count}>+{remains}</p>}
                                </div>
                            })}
                        </div>
                        <div className={styles.total_price}>
                            <div className="ml-6">
                                <p className={styles.item_number}>{totalPrice}</p>
                            </div>
                            <div className='ml-2'>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const FeedPage = () => {

    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => ({
        ingredients: state?.ingredients?.ingredients || null,
    }))
    const { orders } = useSelector(state => ({
        orders: state?.feed.orders
    }))

    useEffect(() => {
        dispatch({type: FEED_CONNECT, payload: BURGER_API_WSS_FEED})
        return () => { 
            dispatch({type: FEED_DISCONNECT}) 
        }
    }, [dispatch])

    const ordersDone = orders?.orders.filter(item => item.status === 'done')
    const ordersPending = orders?.orders.filter(item => item.status === 'pending')

    return (
        <div>
            <div className="mt-10 mb-5">
                <h2 className={styles.main_title}>Лента заказов</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.order_container}>
                    <div className={styles.items_container}>
                        {orders?.orders.map(item => <Item key={item._id} item={item} ingredients={ingredients} withStatus={false} />)}
                    </div>
                </div>
                <div className="ml-15">
                    <div className={styles.analyze_order_container}>
                        <div className={styles.flex_row}>
                            <div className={styles.flex_column_status}>
                                <div className="mb-6">
                                    <p className={styles.status_header}>Готовы:</p>
                                </div>
                                <div className={styles.flex_row}>
                                    <div className={styles.flex_one_column}>
                                        <ul className={styles.status_ready}>
                                            {ordersDone?.filter((_, index) => index < 5).map((item) =>
                                                <li key={item._id}>{item.number}</li>)}
                                        </ul>
                                    </div>
                                    <div className={styles.flex_one_column}>
                                        <div className="ml-6">
                                            <ul className={styles.status_ready}>
                                                {ordersDone?.filter((_, index) => index >= 5 && index < 10).map((item) =>
                                                    <li key={item._id}>{item.number}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-9">
                                <div className={styles.flex_column_status}>
                                    <div className="mb-6">
                                        <p className={styles.status_header}>В работе:</p>
                                    </div>
                                    <div className={styles.flex_row}>
                                        <div className={styles.flex_one_column}>
                                            <ul className={styles.status_progress}>
                                                {ordersPending?.filter((_, index) => index < 5).map((item) =>
                                                    <li key={item._id}>{item.number}</li>)}
                                            </ul>
                                        </div>
                                        <div className={styles.flex_one_column}>
                                            <div className="ml-6">
                                                <ul className={styles.status_progress}>
                                                    {ordersPending?.filter((_, index) => index >= 5 && index < 10).map((item) =>
                                                        <li key={item._id}>{item.number}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-15">
                            <p className={styles.status_header}>Выполнено за все время:</p>
                            <p className={styles.order_count_title}>{orders?.total}</p>
                        </div>
                        <div className="mt-15">
                            <p className={styles.status_header}>Выполнено за сегодня:</p>
                            <p className={styles.order_count_title}>{orders?.totalToday}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

