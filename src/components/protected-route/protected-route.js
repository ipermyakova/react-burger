import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../services/auth'
import { getCookie } from '../utils/utils'


export const ProtectedRoute = ({ children, onlyUnAuth=false }) => {

    const { user, isLoadingUser, hasErrorUser } = useSelector(store => ({ 
        user: store?.auth?.user || null,
        isLoadingUser: store?.auth?.isLoadingUser || false,
        hasErrorUser: store?.auth?.hasErrorUser || false
    }));

    const { messageResetPassword } = useSelector(store => ({ 
        messageResetPassword: store?.auth?.messageResetPassword || null
    }))


    const location = useLocation();

    const auth = useAuth();


    useEffect(()=> {
        if(getCookie("refreshToken") && !user) {
            auth.getUser();
        }
    }, [])

    if(isLoadingUser) {
        return null;    
    }

    if(onlyUnAuth) {
        const from = location.state || { from : {pathname: "/"} }
        const pathname =  from.from.pathname

        if(user) {
            return <Navigate to={{pathname: pathname}}/>
        }
        if(location.pathname === "/reset-password") {
            if(pathname === "/forgot-password" && messageResetPassword) {
                return children    
            } 
            return <Navigate to={{pathname: "/login" }}/>
        }
        return children;
    }
    
    if(!onlyUnAuth) {
        if(user) {
            return children
        } 
        return <Navigate to="/login" state = {{from: location}} replace />
    }

    return null;
}; 

