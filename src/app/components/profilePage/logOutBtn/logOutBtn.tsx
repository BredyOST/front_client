'use client';
import React, {FC} from 'react';
import cls from './logOutBtn.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {destroyCookie} from "nookies";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import {useAppDispatch} from "@/app/redux/hooks/redux";

interface logOutBtnProps {
    classname?: any,
    children:any
}

export const LogOutBtn:FC<logOutBtnProps> = (props) => {
    const {
        classname,
        children
    } = props;

    const dispatch= useAppDispatch()
    //ACTIONS FROM REDUX
    const {addAuthStatus, addAdminRole, addMainAdminRole, LogOutFromProfile,} = authSliceActions;
    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS
    const logout = React.useCallback(() => {
        destroyCookie(null, "_z", {path:'/'});
        destroyCookie(null, "_d", {path:'/'});
        dispatch(LogOutFromProfile(null));
        dispatch(addMainAdminRole(false));
        dispatch(addAdminRole(false));
        dispatch(addAuthStatus(false));
        location.reload()
    },[])

    return (

        <Button
            classname={classname}
            onClick = {logout}
        >
            {children}
        </Button>
    );
};

export default LogOutBtn;