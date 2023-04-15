import React, { useCallback, useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';
import { useAuth } from '../services/auth';
import { getCookie } from '../utils/cookie-utils';
import { TRegisterForm} from '../services/types/data';
import { useForm } from '../hooks/useForm';
import { useSelector } from '../hooks/hooks';

export const ProfilePage = () => {

    const { values, handleChange, setValues, edit, setEdit } = useForm<TRegisterForm>({ name: "", email: "", password: ""});
    const [editName, setEditName] = useState<boolean>(false)
    const { getUser, updateUser, user, signOut, ...auth } = useAuth();

    const ref = useRef<HTMLInputElement>(null);

    const { isLoadingLogout, hasErrorLogout } = useSelector(store => ({ 
        isLoadingLogout: store?.auth?.isLoadingLogout || false,
        hasErrorLogout: store?.auth?.hasErrorLogout || false
    }));

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setValues({...values, name: user.name, email: user.email });
        }
    }, [user])

    const handleIconClick = () => {
        ref.current?.focus();
        setEditName(true);
    }

    const handleBlur = () => {
        ref.current?.blur();
        setEditName(false);
    }

    const handleSaveClick = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        updateUser(values);
    }, [updateUser, values])

    const handleCancelClick = useCallback(() => {
        if(user) {
            setValues({...values, name: user.name, email: user.email });
        }
        setEdit(false);
    }, [user])

        
    const handleExitClick = () => {
        signOut();
        if(!isLoadingLogout && !hasErrorLogout && !user && !getCookie('token')) {
            navigate('/login');
        }
    } 

    return (
        <div className={styles.main_container}>
                <div className={styles.container}>
                    <div className="mt-30">
                        <div className={styles.menu}>
                            <NavLink to="/profile" className={ styles.menu_active_link}>Профиль</NavLink>
                            <NavLink to="/profile/orders" className={styles.menu_link}>История заказов</NavLink>
                            <div onClick={handleExitClick} className={styles.menu_link}>Выход</div>
                            <div className="mt-20">
                                <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='ml-15'>
                        <form className={styles.form} onSubmit={handleSaveClick}>
                            <div className="mb-6">
                                <Input value={values.name} name='name' placeholder={'Имя'} icon={'EditIcon'} disabled={!editName} ref={ref} onBlur={handleBlur} onIconClick={handleIconClick} onChange={handleChange}/>
                            </div>
                            <div className="mb-6">
                                <EmailInput value={values.email} name='email' isIcon={true} onChange={handleChange}/>
                            </div>
                            <div className="mb-10">
                                <PasswordInput value={values.password} name='password' icon="EditIcon" onChange={handleChange}/>
                            </div>
                            {edit && <div className={styles.button_container}>
                                <Button htmlType='submit'>Сохранить</Button>
                                <div className="ml-10">
                                    <Button htmlType="reset" onClick={handleCancelClick}>Отмена</Button>
                                </div>
                            </div>}
                        </form>
                    </div>
            </div>
        </div>    
    )
}