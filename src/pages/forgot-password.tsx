import React, { useCallback, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../services/auth'
import { useSelector } from 'react-redux';
import { RootState } from '../services/reducers';
import { TFormResetPassword } from '../services/types/data';
import { useForm } from '../hooks/useForm';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';

export const ForgotPasswordPage = () => {

    let auth = useAuth();

    const { isLoading, hasError, messageResetPassword } = useSelector((store: RootState) => ({ 
        isLoading: store?.auth?.isLoading || null,
        hasError: store?.auth?.hasError || false,
        messageResetPassword: store?.auth?.messageResetPassword || null
    }))

    const {pathname} = useLocation();

    const { values, handleChange } = useForm<TFormResetPassword>({ email: ""});

    const handleReset = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        auth.resetPassword(values);
    }, [auth, values])

    if(messageResetPassword && !isLoading && !hasError) {
        return <Navigate to="/reset-password" state={{from: {pathname: pathname}}}/>
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleReset}>
                    <h2 className={styles.heading}>Восстановление пароля</h2>
                    <div className="mt-6">
                        <EmailInput value={values.email} name='email' placeholder="Укажите e-mail" isIcon={false} onChange={handleChange}/>
                    </div>
                    <div className='mt-6 mb-20'>
                        <Button htmlType='submit'>Восстановить</Button>
                    </div>
                    <div className={styles.link_container}>
                        <p className={styles.text}>Вспомнили пароль?</p>
                        <div className='ml-2'>
                            <Link to="/login"className={styles.link}>Войти</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}