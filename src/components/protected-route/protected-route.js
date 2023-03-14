import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
        return <Navigate to={{pathname: "/login", state: {from: location}}} replace />
    }

    return null;
}; 

