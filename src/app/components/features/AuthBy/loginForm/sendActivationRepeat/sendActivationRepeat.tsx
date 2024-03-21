'use client';
import React, {FC} from 'react';
import cls from './sendActivationRepeat.module.scss'
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRepeatActivationMutation} from "@/app/redux/entities/requestApi/requestApi";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";

interface sendActivationRepeatProps {
    classname?: string;
}

type loginForm = {
    activationRepeat:string,
}

const SendActivationRepeat:FC<sendActivationRepeatProps> = (props) => {
    const {
        classname,
    } = props;
    const dispatch = useAppDispatch();
    //RTK
    // повторный запрос на активацию
    let [sendMessageActivation, {data:messageActivate, error:errorActivateMessage, isError: isActivateMessage, isLoading: loadingActivateMessage}] =  useRepeatActivationMutation();

    //ACTIONS FROM REDUX
    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    //STATES FROM REDUX
    //USESTATE
    // что выбрано - email или phone при авторизации
    const [activeTab, setActiveTab] = React.useState<number>(1);
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);
    //USEREF

    //FUNCTIONS
    const onSubmit: SubmitHandler<loginForm> = (data) => {
        const email:string = data.activationRepeat
        sendMessageActivation({ email:email})
    };

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

    if (clickOnEnter != 3 ) {
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
                Активация аккаунта
            </h2>
            <div className={cls.inputsForm}>
                <Input
                    type="text"
                    classForInput={cls.input}
                    placeholder="Введите Email"
                    classname={cls.inputRelative}
                    autofocus
                    defaultValue=""
                    register={{ ...(register('activationRepeat')) }}
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
            { loadingActivateMessage
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </form>
    );
};

export default SendActivationRepeat;