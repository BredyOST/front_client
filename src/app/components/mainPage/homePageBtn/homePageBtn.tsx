'use client';
import React, {FC} from 'react';
import cls from './homePageBtn.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

interface homePageBtnProps {
    classname?: string;
}

const HomePageBtn:FC<homePageBtnProps> = (props) => {
    const { classname } = props;
    const dispatch = useAppDispatch();

    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)

    // ACTIONS FROM REDUX
    // для изменения состояния popup loginForm
    const { changeStateLoginFormPopup } = statePopupSliceActions;

    // для открытия popup loginForm
    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div className={classNames(cls.coverBtn, {},[classname] )} >
            <AppLink
                classname={cls.linkTwo}
                href='/dashboard/contacts'>
                <span>Поддержка</span>
            </AppLink>
            {stateAuth ?
                <AppLink
                    classname={cls.link}
                    href='/dashboard/price'>
                    Попробовать бесплатно
                </AppLink>
                :
                <Button
                    classname={cls.buttonLogin}
                    onClick={openLoginFormPopup}
                >
                    <span className={cls.TextLogin}>Попробовать бесплатно</span>
                </Button>
            }
        </div>
    );
};

export default HomePageBtn;