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

const LoginModal = React.memo(({classname}:LoginModalProps) => {
    const dispatch = useAppDispatch();

    const { changeStateCurrentPopupNumber } = stateAuthWindowSliceActions;

    const { changeStateLoginFormPopup } = statePopupSliceActions;

    const {stateLoginFormPopup, stateFreePeriodPopup, categoriesPopup} = useAppSelector((state) => state.loginPopup);

    const closeLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(false));
        dispatch(changeStateCurrentPopupNumber(0));
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
