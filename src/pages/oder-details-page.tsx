import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import styles from '../components/order-details/order.details.module.css';
const imagePath = require('../components/images/done.png');
import { RootState } from '../services/reducers'

export const OrderDetailsPage = () => {

    const { orderData } = useSelector((store: RootState) => ({
        orderData: store?.order?.orderData,
    }))

    return (
        <div className={styles.container}>
            <p className={styles.order_number_title}>{orderData?.number || "" }</p>
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
