'use client';
import React, { FC } from 'react';
import cls from './loginForm.module.scss';
import { classNames } from "@/helpers/lib/classNames/className";
import LogiIn from "@/features/AuthBy/loginForm/loginIn/LogiIn";
import Registration from "@/features/AuthBy/loginForm/registration/registration";
import RecoverPassword from "@/features/AuthBy/loginForm/recoverPassword/recoverPassword";
import AccessNumber from "@/features/AuthBy/loginForm/accessNumber/accessNumber";

interface LoginFormProps {
	classname?: string;
}

const LoginForm = React.memo(({classname}:LoginFormProps) => {

    return (
        <div className={classNames(cls.LoginForm, {}, [classname])}>
            <LogiIn/>
            <Registration/>
            <RecoverPassword/>
            <AccessNumber/>
        </div>
    );
});

export default LoginForm;
