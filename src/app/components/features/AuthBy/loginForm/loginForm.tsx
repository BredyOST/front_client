'use client';
import React, { FC } from 'react';
import cls from './loginForm.module.scss';
import { classNames } from "@/app/components/shared/lib/classNames/className";
import LogiIn from "@/app/components/features/AuthBy/loginForm/loginIn/LogiIn";
import Registration from "@/app/components/features/AuthBy/loginForm/registration/registration";
import RecoverPassword from "@/app/components/features/AuthBy/loginForm/recoverPassword/recoverPassword";
import SendActivationRepeat from "@/app/components/features/AuthBy/loginForm/sendActivationRepeat/sendActivationRepeat";

interface LoginFormProps {
	classname?: string;
}

const LoginForm: FC<LoginFormProps> = React.memo((props) => {
    const { classname } = props;

    // actions from redux
    // для изменения текущего состояния попапа (от 1 до 3)

    //для индикаторов

    // states from redux
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа

    // информация о пользователе

    // RTK query

    // useStates

    return (
        <div className={classNames(cls.LoginForm, {}, [classname])}>
            <LogiIn/>
            <Registration/>
            <RecoverPassword/>
            <SendActivationRepeat/>
        </div>
    );
});

export default LoginForm;
