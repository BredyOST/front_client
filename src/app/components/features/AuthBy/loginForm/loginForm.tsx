'use client';
import React, { FC } from 'react';
import cls from './loginForm.module.scss';
import { classNames } from "@/app/components/shared/lib/classNames/className";
import LogiIn from "@/app/components/features/AuthBy/loginForm/loginIn/LogiIn";
import Registration from "@/app/components/features/AuthBy/loginForm/registration/registration";
import RecoverPassword from "@/app/components/features/AuthBy/loginForm/recoverPassword/recoverPassword";
import AccessNumber from "@/app/components/features/AuthBy/loginForm/accessNumber/accessNumber";

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
