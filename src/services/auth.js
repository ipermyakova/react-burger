import { useContext, createContext } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from './actions'

const AuthContext = createContext(undefined);

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth =() => {
    return useContext(AuthContext);
}

export const useProvideAuth = () => {
    const { user } = useSelector(store => ({ 
        user: store?.auth?.user || null
    }))

    const dispatch = useDispatch();

    const signIn = form => {
        dispatch(actions.login(form))
    }

    const register = form => {
        dispatch(actions.register(form))
    }

    const getUser = () => {
        dispatch(actions.getUser())
    }

    const updateUser = form => {
        dispatch(actions.updateUser(form))
    } 

    const signOut = () => {
        dispatch(actions.logout())
    }

    const resetPassword = form => {
        dispatch(actions.resetPassword(form))
    }

    const confirmResetPassword = form => {
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
