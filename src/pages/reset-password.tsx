import React, { useCallback, useState, ChangeEvent, SyntheticEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { useSelector } from 'react-redux';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TFormConfirmPassword } from '../services/types/data';
import { RootState } from '../services/reducers';


import styles from './login.module.css';

export const ResetPasswordPage = () => {

    const [state, setState] = useState<TFormConfirmPassword>({ token: "", password: "" })

    const { isLoading, hasError, messageConfirmResetPassword } = useSelector((store: RootState) => ({ 
        isLoading: store?.auth?.isLoading || null,
        hasError: store?.auth?.hasError || false,
        messageConfirmResetPassword: store?.auth?.messageConfirmResetPassword || null
    }))


    let auth = useAuth();
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    
    const handleSaveClick = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        e.stopPropagation();
        auth.confirmResetPassword(state);
    }, [auth, state])

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
                        <PasswordInput value={state.password} name='password' placeholder={"Введите новый пароль"} onChange={handleChange}/>
                    </div>
                    <div className="mt-6">
                        <Input value={state.token} name='token' placeholder={'Введите код из письма'} onChange={handleChange} />
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