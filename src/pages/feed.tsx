import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TIngredient, TWsOrder, TStatusOrder } from '../services/types/data';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../hooks/hooks';
import styles from './feed.module.css';
import { actions } from '../services/actions'
import { toDate } from '../utils/utils'
const url = 'wss://norma.nomoreparties.space/orders/all'


type TRenderName = {
    [key in TStatusOrder] : string
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

const boxWithCount = (index: number, count: number) => index === 0 && count > 6

export const Item: FC<TItemProps> = ({item, ingredients, withStatus = false}) => {

    const location = useLocation();
    const navigate = useNavigate();

    const currentIngredients: Array<TIngredient> = []
    item.ingredients.forEach(id => {
        const ingredient = ingredients.find(ingredient => ingredient._id === id);
        if(ingredient) {
            currentIngredients.push(ingredient)
        }
    })

    const count = currentIngredients.length

    const handleClick = () => {
        const id = item.number
        navigate(`${location.pathname}/${id}`, {state: { background: location }} )
    }

    return (
    <div className="mb-4 mr-2">
        <div className={styles.item} onClick={handleClick}>
            <div className="m-6">
                <div className={styles.number_time_container}>
                    <p className={styles.item_number}>{`#${item.number}`}</p>
                    <FormattedDate date={toDate(item.createdAt)} className={styles.date}/>
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
                        {currentIngredients.filter((_, index) => index < 6 ).map((ingredient, index) => {
                            return <div className={styles.box}>
                                <img className={boxWithCount(index, count) ? styles.image_opacity : styles.image} src={ingredient?.image_mobile}/>
                                {boxWithCount(index, count) && <p className={styles.count}>+{count - 6}</p>}
                            </div>
                        })}
                    </div>
                    <div className={styles.total_price}>
                        <div className="ml-6">
                        <p className={styles.item_number}>{currentIngredients.reduce((acc, item) => {
                            return acc + item.price 
                        }, 0)}</p>
                        </div>
                        <div className='ml-2'>
                            <CurrencyIcon type="primary"/>
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
        orders: state?.orders?.orders
    }))

    useEffect(() => {
        dispatch(actions.connect(url))
    }, [])

    useEffect(() => {
        return () => { dispatch(actions.disconnect()) }
    }, [])

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
                        {orders?.orders.map(item => <Item key={item._id} item={item} ingredients={ingredients} withStatus={false}/>)}
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
                                            <li>{item.number}</li>)}                                           
                                        </ul>
                                    </div>
                                    <div className={styles.flex_one_column}>
                                        <div className="ml-6">
                                            <ul className={styles.status_ready}>
                                                {ordersDone?.filter((_, index) => index >= 5 && index < 10).map((item) =>
                                                <li>{item.number}</li>)}  
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
                                            <li>{item.number}</li>)} 
                                        </ul>
                                    </div>
                                    <div className={styles.flex_one_column}>
                                        <div className="ml-6">
                                            <ul className={styles.status_progress}>
                                                {ordersPending?.filter((_, index) => index >= 5 && index < 10).map((item) =>
                                                <li>{item.number}</li>)}  
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

