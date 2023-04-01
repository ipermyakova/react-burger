import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './login.module.css';
import { getCookie } from '../components/utils/cookie-utils';
import { RootState } from '../services/reducers';
import { useAuth } from '../services/auth';

export const ProfileOrdersPage = () => {
    const navigate = useNavigate();
    const { getUser, updateUser, user, signOut, ...auth } = useAuth();

    const { isLoadingLogout, hasErrorLogout } = useSelector((store: RootState) => ({
        isLoadingLogout: store?.auth?.isLoadingLogout || false,
        hasErrorLogout: store?.auth?.hasErrorLogout || false
    }));

    const handleExitClick = () => {
        signOut();
        if(!isLoadingLogout && !hasErrorLogout && !user && !getCookie('token')) {
            navigate('/login');
        }
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
            <div className={styles.container}>
                    <div className={styles.menu}>
                        <NavLink to="/profile" className={styles.menu_link}>Профиль</NavLink>
                        <NavLink to="/profile/orders" className={styles.menu_active_link}>История заказов</NavLink>
                        <div onClick={handleExitClick} className={styles.menu_link}>Выход</div>
                        <div className="mt-20">
                            <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                        </div>
                    </div>
                    <div className='ml-15' />
                </div>
            </div>
        </div>    
    )
}