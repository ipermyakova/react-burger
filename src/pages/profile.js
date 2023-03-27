import React, { useCallback, useEffect, useState, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css'
import { useAuth } from '../services/auth';
import { getCookie } from '../components/utils/utils';

export const ProfilePage = () => {

    const [form, setState] = useState({ name: "", email: "", password: ""})

    const [edit, setEdit ] = useState(false)
    const [editName, setEditName] = useState(false)
    const { getUser, updateUser, user, signOut, ...auth } = useAuth();
    const ref = useRef(null);

    const { isLoadingLogout, hasErrorLogout } = useSelector(store => ({ 
        isLoadingLogout: store?.auth?.isLoadingLogout || false,
        hasErrorLogout: store?.auth?.hasErrorLogout || false
    }));


    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setState({...form, name: user.name, email: user.email })
        }
    }, [user])


    const handleChange = e => {
        setState({ ...form, [e.target.name]: e.target.value })
        setEdit(true)
    }

    const handleIconClick = e => {
        ref.current?.focus();
        setEditName(true)
    }

    const handleBlur = e => {
        ref.current?.blur()
        setEditName(false)
    }

    const handleSaveClick = useCallback( e => {
        e.preventDefault();
        e.stopPropagation();
        updateUser(form);
    }, [updateUser, form])

    const handleCancelClick = useCallback(e => {
        if(user) {
            setState({...form, name: user.name, email: user.email })
        }
        setEdit(false);
    }, [user])

        
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
                        <NavLink to="/profile" className={ styles.menu_active_link}>Профиль</NavLink>
                        <NavLink to="/profile/orders" className={styles.menu_link}>История заказов</NavLink>
                        <div onClick={handleExitClick} className={styles.menu_link}>Выход</div>
                        <div className="mt-20">
                            <p className={styles.text}>В этом разделе вы можете изменить свои персональные данные</p>
                        </div>
                    </div>
                    
                    <div className='ml-15'>
                        <form className={styles.form} onSubmit={handleSaveClick}>
                            <div className="mb-6">
                                <Input value={form.name} name='name' placeholder={'Имя'} icon={'EditIcon'} disabled={!editName} ref={ref} onBlur={handleBlur} onIconClick={handleIconClick} onChange={handleChange}/>
                            </div>
                            <div className="mb-6">
                                <EmailInput value={form.email} name='email' isIcon={true} onChange={handleChange}/>
                            </div>
                            <div className="mb-10">
                                <PasswordInput value={form.password} name='password' icon="EditIcon" onChange={handleChange}/>
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
        </div>    
    )
}