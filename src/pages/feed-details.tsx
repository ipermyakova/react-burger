import React, { FC, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../services/actions';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../hooks/hooks';
import feedStyles from './feed.module.css';
import styles from './feed.details.module.css';
import { TIngredient, TWsOrder, TStatusOrder, TOrder } from '../services/types/data';
import { uniq, toDate } from '../utils/utils';

type TRenderName = {
    [key in TStatusOrder] : string
}

const renderStatus: TRenderName = {
    created: "Создан",
    pending: "Готовиться",
    done: "Выполнен"
}

type TItemProps = {
    ingredient: TIngredient,
    count: number
} 

export const Item: FC<TItemProps> = ({ingredient, count}) => {
    return (
        <div className="mt-4 mr-6">
            <div className={styles.item_container}>
                <div className={styles.box_container}>
                    <div className={feedStyles.box}>
                        <img className={feedStyles.image} src={ingredient.image_mobile}/>
                    </div>
                </div>
                <div className={styles.text_container}>
                    <div className="ml-4">
                        <p className={styles.text}>{ingredient.name}</p>
                    </div>
                </div>
                <div className="ml-4">
                    <div className={styles.total_price}>
                        <p className={feedStyles.item_number}>{`${count} x ${ingredient.price}`}</p>
                        <div className="ml-2">
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

export const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [order, setOrder] = useState<TWsOrder | null | TOrder>(null)

    const { ingredients } = useSelector(state => ({
        ingredients: state?.ingredients?.ingredients || null, 
    }))

    const { orders } = useSelector(state => ({
        orders: state?.orders?.orders
    }))

    const { orderData } = useSelector(store => ({
        orderData: store?.order?.orderData,
    }))

    useEffect(()=> {
        if(ingredients && ingredients.length === 0) {
            dispatch(actions.getIngredientsAction());
        }
    },[]);


    useEffect(() => {
        if(!orders && !orderData && id) {
            dispatch(actions.getOrderActions(id))
        }
    }, [])


    const currentOrder = orders?.orders.find(item =>  item.number.toString() === id)

    useEffect(() => {
        if(currentOrder){
            setOrder(currentOrder)
        } else if(orderData) {
            setOrder(orderData)
        }
        
    }, [id, currentOrder, orderData])

    useEffect(() => {
        return ()=> { dispatch(actions.removeOrderDetails()) }   
    }, [])

    const currentIngredients: Array<TIngredient> = []
    order?.ingredients.forEach(id => {
        const ingredient = ingredients.find(ingredient => ingredient._id === id);
        if(ingredient) {
            currentIngredients.push(ingredient)
        }
    })
    const currentIngredientsWithCount = currentIngredients.reduce((acc: any, item) => {
        const count = acc[item._id] || 0
        acc[item._id] = count + 1
        return acc
    }, {})


    return (
            <div className={styles.container}>
                <p className={feedStyles.feed_item_number}>{`#${order?.number}`}</p>
                <div className="mt-10">
                    <p className={feedStyles.item_title}>{order?.name}</p>
                </div>
                <div className="mt-3">
                    <p className={order?.status !== 'done' ? feedStyles.status_name : feedStyles.status_name_ready}>{order? renderStatus[order.status] : ''}</p>
                </div>
                <div className="mt-15 mb-6">
                    <p className={feedStyles.item_title}>Состав:</p>
                </div>
                <div className={styles.items_container}>
                    {uniq(currentIngredients).map(item => <Item key={item._id} ingredient={item} count={currentIngredientsWithCount[item._id]}/>)}              
                </div>
                <div className="mt-10">
                    <div className={styles.footer_container}>
                        <FormattedDate date={toDate(order?.createdAt)} className={feedStyles.date}/>
                        <div className={styles.total_price}>
                            <p className={feedStyles.item_number}>{currentIngredients.reduce((acc, item) => {
                                return acc + item.price 
                                }, 0)}</p>
                            <div className="ml-2">
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export const OrderDetailsPage = () => {
    return (
        <div className={styles.wrapper}>
            <OrderDetails />
        </div>
    );

}