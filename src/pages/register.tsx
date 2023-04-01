import React, { useCallback, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { TRegisterForm } from '../services/types/data';

import styles from './login.module.css';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {

    let auth = useAuth();

    const { values, handleChange } = useForm<TRegisterForm>({ name: "", email: "", password: ""});

    const handleRegister = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        auth.register(values);
    }, [auth, values])

    if(auth.user) {
        return <Navigate to="/login" />
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleRegister}>
                    <h2 className={styles.heading}>Регистрация</h2>
                    <div className="mt-6">
                        <Input value={values.name} name='name' placeholder={'Имя'} onChange={handleChange}/>
                    </div>
                    <div className="mt-6">
                        <EmailInput value={values.email} name='email' onChange={handleChange}/>
                    </div>
                    <div className="mt-6">
                        <PasswordInput value={values.password} name='password' onChange={handleChange}/>
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