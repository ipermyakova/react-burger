import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ORDERS_CONNECT, ORDERS_DISCONNECT } from '../services/constants'

import styles from './login.module.css';
import feedStyles from './feed.module.css';
import { getCookie } from '../utils/cookie-utils';
import { useAuth } from '../services/auth';
import { useSelector, useDispatch } from '../hooks/hooks';
import { Item } from './feed';
import { BURGER_API_WSS_ORDERS } from '../utils/burger-api';

export const ProfileOrdersPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { getUser, updateUser, user, signOut, ...auth } = useAuth();

    const { ingredients } = useSelector(state => ({
        ingredients: state?.ingredients?.ingredients || null,
    }))

    const { orders } = useSelector(state => ({
        orders: state?.orders?.orders
    }))

    const { isLoadingLogout, hasErrorLogout } = useSelector(store => ({
        isLoadingLogout: store?.auth?.isLoadingLogout || false,
        hasErrorLogout: store?.auth?.hasErrorLogout || false
    }));

    useEffect(() => {
        if (getCookie('token')) {
            dispatch({ type: ORDERS_CONNECT, payload: `${BURGER_API_WSS_ORDERS}?token=${getCookie('token')}` })
        }
        return () => { dispatch({ type: ORDERS_DISCONNECT }) }
    }, [dispatch])


    const handleExitClick = () => {
        signOut();
        if (!isLoadingLogout && !hasErrorLogout && !user && !getCookie('token')) {
            navigate('/login');
        }
    }

    const reverseOrders = orders ? [...orders?.orders].reverse() : []

    return (
        <div className={styles.main_container}>
            <div className={styles.profile_orders_continer}>
                <div className="mt-30">
                    <div className={styles.menu}>
                        <NavLink to="/profile" className={styles.menu_link}>Профиль</NavLink>
                        <NavLink to="/profile/orders" className={styles.menu_active_link}>История заказов</NavLink>
                        <div onClick={handleExitClick} className={styles.menu_link}>Выход</div>
                        <div className="mt-20">
                            <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                        </div>
                    </div>
                </div>
                <div className='ml-15'>
                    <div className={styles.orders_container}>
                        <div className={feedStyles.items_container}>
                            {reverseOrders.filter((_, index: number) => index < 50).map(item =>
                                <Item key={item._id} item={item} ingredients={ingredients} withStatus={true} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}