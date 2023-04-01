import { useContext, createContext } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from './actions'
import { RootState } from './reducers'
import { AppDispatch } from './index'
import { TForm, TRegisterForm, TFormResetPassword, TFormConfirmPassword } from '../services/types/data'

const AuthContext = createContext<ReturnType<typeof useProvideAuth>>({} as ReturnType<typeof useProvideAuth>);

export const ProvideAuth = ({ children }:{children: React.ReactElement}) => {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth =() => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const { user } = useSelector((state: RootState) => ({ 
        user: state?.auth?.user || null
    }))

    const dispatch: AppDispatch = useDispatch();

    const signIn = (form: TForm) => {
        dispatch(actions.login(form))
    }

    const register = (form: TRegisterForm) => {
        dispatch(actions.register(form))
    }

    const getUser = () => {
        dispatch(actions.getUser())
    }

    const updateUser = (form: TRegisterForm) => {
        dispatch(actions.updateUser(form))
    } 

    const signOut = () => {
        dispatch(actions.logout())
    }

    const resetPassword = (form: TFormResetPassword) => {
        dispatch(actions.resetPassword(form))
    }

    const confirmResetPassword = (form: TFormConfirmPassword) => {
        dispatch(actions.confirmResetPassword(form))
    }

    return {
        user,
        getUser,
        updateUser,
        signIn,
        register,
        signOut,
        resetPassword,
        confirmResetPassword,
    }
} 
