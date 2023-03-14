import React, { useCallback, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../services/auth'

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css'

export const RegisterPage = () => {

    let auth = useAuth();

    const [state, setState] = useState({ name: "", email: "", password: ""})

    const handleChange = e => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleRegister = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        auth.register(state);
    }, [auth, state])

    if(auth.user) {
        return <Navigate to="/login" />
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleRegister}>
                    <h2 className={styles.heading}>Регистрация</h2>
                    <div className="mt-6">
                        <Input value={state.name} name='name' placeholder={'Имя'} onChange={handleChange}/>
                    </div>
                    <div className="mt-6">
                        <EmailInput value={state.email} name='email' onChange={handleChange}/>
                    </div>
                    <div className="mt-6">
                        <PasswordInput value={state.password} name='password' onChange={handleChange}/>
                    </div>
                    <div className='mt-6 mb-20'>
                        <Button htmlType='submit'>Зарегистрироваться</Button>
                    </div>
                    <div className={styles.link_container}>
                        <p className={styles.text}>Уже зарегистрированы?</p>
                        <div className='ml-2'>
                            <Link to="/login"className={styles.link}>Войти</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}