import React from 'react';
import styles from './order.details.module.css';
let imagePath = require ('../images/done.png');
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

const OrderDetails = () => {

    const { orderData } = useSelector((store: RootState) => ({
        orderData: store?.order?.orderData,
    }))

    const orderNumber = orderData?.number

    return (
        <div className={styles.container}>
            <p className={styles.order_number_title}>{orderNumber || "" }</p>
            <div className="mt-8"> 
                <p className={styles.title}>идентификатор заказа</p>
            </div>
            <div className="m-15">
                <img src={imagePath}/>
            </div>
            <div className="mb-2">
                <p className={styles.status_title}>Ваш заказ начали готовить</p>
            </div>
            <div className="mb-20">
                <p className={styles.description_title}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>

    )
};

export default OrderDetails;
