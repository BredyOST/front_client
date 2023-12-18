'use client';
import React, { FC } from 'react';
import cls from './loginForm.module.scss';
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/redux";
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
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);
    // информация о пользователе

    // RTK query

    // useStates
    // что выбрано - email или phone при авторизации
    const [activeTab, setActiveTab] = React.useState<number>(1);


    return (
        <div className={classNames(cls.LoginForm, {}, [classname])}>
            <LogiIn
                // activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <Registration
                // activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <RecoverPassword
                // activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
            <SendActivationRepeat
                // activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        </div>
    );
});

export default LoginForm;
