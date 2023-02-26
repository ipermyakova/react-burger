import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './order.details.module.css';
import imagePath from '../images/done.png';
import { OrderContext } from  '../../services/appContext.js'

const OrderDetails = ({ orderData }) => {

    const orderNumber = orderData?.order?.number

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
