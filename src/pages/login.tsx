import React, { useCallback, FormEvent } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../services/auth';
import { TForm } from '../services/types/data';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';
import { useForm } from '../hooks/useForm';

export const LoginPage = () => {

    let auth = useAuth();

    const { values, handleChange } = useForm<TForm>({ email: "", password: "" });

    const handleLogin = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        auth.signIn(values);
    }, [auth, values])

    if (auth.user) {
        return (<Navigate to="/" replace />);
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.wrapper}>
                <form className={styles.form} onSubmit={handleLogin}>
                    <h2 className={styles.heading}>Вход</h2>
                    <div className="mt-6">
                        <EmailInput value={values?.email} name='email' isIcon={false} onChange={handleChange} />
                    </div>
                    <div className="mt-6">
                        <PasswordInput value={values?.password} name='password' onChange={handleChange} />
                    </div>
                    <div className='mt-6 mb-20'>
                        <Button htmlType="submit">Войти</Button>
                    </div>
                    <div className="mb-4">
                        <div className={styles.link_container}>
                            <p className={styles.text}>Вы  - новый пользователь?</p>
                            <div className='ml-2'>
                                <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.link_container}>
                        <p className={styles.text}>Забыли пароль?</p>
                        <div className='ml-2'>
                            <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
