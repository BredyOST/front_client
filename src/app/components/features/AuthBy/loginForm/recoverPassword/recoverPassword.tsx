'use client';
import React, {FC} from 'react';
import cls from './recoverPassword.module.scss'
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {useChangePasswordMutation} from "@/app/redux/entities/requestApi/requestApi";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";

interface recoverPasswordProps {
    classname?: string;
}

type loginForm = {
    myEmail:string,
}

export const RecoverPassword:FC<recoverPasswordProps> = (props) => {
    const {
        classname,
    } = props;
    const dispatch = useAppDispatch();

    //RTK
    // восстановление пароля
    let[
        sendNewPassword,
        {data:messageNewPassword, error:errorNewPassword, isError: isNewPassword, isLoading: loadingNewPassword}
    ] = useChangePasswordMutation();

    //ACTIONS FROM REDUX

    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    //STATES FROM REDUX

    //USESTATE
    // что выбрано - email или phone при авторизации
    const [activeTab, setActiveTab] = React.useState<number>(1);
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);
    // для отображения введенных символов в инпуте пароля, login и registration, registerCheck - false значит ничего в поля не введено, loginShowHide, registerShowHide: false - значит пароль скрыт
    // const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHide>({
    //     login: false, register: false, registerCheck:false, loginShowHide: false, registerShowHide: false, registerCheckShowHide: false,
    // });
    //USEREF
    
    //FUNCTIONS

    const onSubmit: SubmitHandler<loginForm> = (data) => {
        const forNewPassword:string = data.myEmail
        //восстановление пароля
        sendNewPassword({ email:forNewPassword})
    };
    //  для отправки запроса с form и регистрации полей инпута, для валидации регистрации. когда поля пустые выдает предупреждение
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm<loginForm>({
        mode: 'onChange',
    });

    // возвращаемся на ввод логина и пароля
    const backToLoginIn = () => {
        dispatch(changeStateClickOnEnter(0));
        // loginRegisterRef.current.value = '';
        // passwordRegisterRef.current.value = '';
        // passwordHideButton.register = false;
        // passwordHideButton.registerShowHide = false;
    };

    if (clickOnEnter != 2 ) {
        return null
    }


    return (
        <form
            className={cls.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2
                className={cls.title}
            >
                Восстановление пароля
            </h2>
            <div className={cls.inputsForm}>
                <Input
                    type="text"
                    classForInput={cls.input}
                    placeholder="Введите Email"
                    classname={cls.inputRelative}
                    autofocus
                    defaultValue=""
                    register={{ ...(register('myEmail')) }}
                />

            </div>
            <div className={cls.btnCoverTwo}>
                <Button
                    classname={cls.btnEnter}
                    type="submit"
                >
                    Отправить
                </Button>
                <Button
                    classname={cls.btnEnter}
                    onClick={backToLoginIn}
                >
                    Вернуться
                </Button>
            </div>
            { loadingNewPassword
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </form>

    );
};

export default RecoverPassword;