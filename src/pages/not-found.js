
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './login.module.css'

export const NotFound404 = () => {
    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
                <div className={styles.form}>
                    <h2 className={styles.heading}>404 Error</h2>
                    <div className="mt-4">
                        <p className={styles.text}>The page you requested does not exist</p>
                    </div>
                    <div className='mt-10'>
                        <p className={styles.text}>check the address or try <Link to="/" className={styles.link}>homepage</Link></p>
                    </div>        
                </div>
            </div>
        </div>    
    )
}