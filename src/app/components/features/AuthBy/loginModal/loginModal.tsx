'use client';
import React, { FC, Suspense } from 'react';
import cls from './loginModal.module.scss';
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import Modal from "@/app/components/shared/ui/Modal/Modal";
import LoginForm from "@/app/components/features/AuthBy/loginForm/loginForm";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";


interface LoginModalProps {
    classname?: string;
}

const LoginModal:FC<LoginModalProps> = React.memo((props) => {
    const { classname } = props;
    const dispatch = useAppDispatch();

    // actions from redux
    // для изменения номера открытого попапа
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    // для изменения состояния попапа loginForm
    const { changeStateLoginFormPopup } = statePopupSliceActions;

    // states from redux
    // состояние попапа для loginForm
    const {stateLoginFormPopup} = useAppSelector((state) => state.loginPopup);

    // функция для изменения состояния попапа loginForm
    const closeLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(false));
        dispatch(changeStateClickOnEnter(0));
    }, []);

    return (
        <Modal
            classname={classNames(cls.LoginModal, {}, [classname])}
            isOpen={stateLoginFormPopup}
            onClose={closeLoginFormPopup}
            classForContent={cls.contentLogin}
            lazy
        >
            <Suspense fallback={
                <Loader classname="color-dark" />
            }
            >
                <LoginForm/>
            </Suspense>
        </Modal>
    );
});

export default LoginModal;
