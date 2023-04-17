import React, { useCallback, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TFormConfirmPassword } from '../services/types/data';
import { useForm } from '../hooks/useForm';
import { useSelector } from '../hooks/hooks';

import styles from './login.module.css';

export const ResetPasswordPage = () => {
    let auth = useAuth();

    const { isLoading, hasError, messageConfirmResetPassword } = useSelector(store => ({ 
        isLoading: store?.auth?.isLoading || null,
        hasError: store?.auth?.hasError || false,
        messageConfirmResetPassword: store?.auth?.messageConfirmResetPassword || null
    }))

    const { values, handleChange } = useForm<TFormConfirmPassword>({ token: "", password: "" });

    const handleSaveClick = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        auth.confirmResetPassword(values);
    }, [auth, values])

    if(auth.user) {
        return (<Navigate to={"/"} replace />)
    }
    
    if(messageConfirmResetPassword && !isLoading && !hasError) {
        return (<Navigate to={"/login"} />)
    }
           
    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleSaveClick}>
                    <h2 className={styles.heading}>Восстановление пароля</h2>
                    <div className="mt-6">
                        <PasswordInput value={values.password} name='password' placeholder={"Введите новый пароль"} onChange={handleChange}/>
                    </div>
                    <div className="mt-6">
                        <Input value={values.token} name='token' placeholder={'Введите код из письма'} onChange={handleChange} />
                    </div>
                    <div className='mt-6 mb-20'>
                        <Button htmlType='submit'>Сохранить</Button>
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