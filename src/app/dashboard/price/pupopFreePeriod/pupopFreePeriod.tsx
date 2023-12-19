'use client';
import React, {FC, Suspense} from 'react';
import cls from './pupopFreePeriod.module.scss'
import Modal from "@/app/components/shared/ui/Modal/Modal";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {Button} from "@/app/components/shared/ui/Button/Button";

interface pupopFreePeriodProps {
    classname?: string;
}

export const PupopFreePeriod:FC<pupopFreePeriodProps> = (props) => {

    const { classname } = props;
    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    // для изменения состояния попапа loginForm
    const {changeStateFreePeriod } = statePopupSliceActions;
    //STATES FROM REDUX

    //USESTATE
    // состояние попапа категорий
    const {stateFreePeriodPopup} = useAppSelector(state => state.loginPopup)
    //USEREF

    //FUNCTIONS
    // функция для изменения состояния попапа loginForm
    const closeFreePeriodPopup = React.useCallback(() => {
        dispatch(changeStateFreePeriod(false));
    }, []);

    return (
        <Modal
            classname={classNames(cls.LoginModal, {}, [classname])}
            isOpen={stateFreePeriodPopup}
            onClose={closeFreePeriodPopup}
            classForContent={cls.contentLogin}
            lazy
        >
            <Suspense fallback={
                <Loader classname="color-dark" />
            }
            >
                <div className={classNames(cls.pupopFreePeriod, {},[classname] )} >
                    <div className={'page__container'}>
                        <div className={cls.cover}>
                            <div className={cls.section}>
                                <Button>Подтвердить оформление бесплатного периода</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>
        </Modal>
    );
};

