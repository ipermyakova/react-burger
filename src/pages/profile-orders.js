import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


import styles from './login.module.css'
import { getCookie } from '../components/utils/utils';

export const ProfileOrdersPage = () => {
    const navigate = useNavigate();

    const handleExitClick = (e) => {
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
                    <div className='ml-15'>
                    </div>
                </div>
            </div>
        </div>    
    )
}