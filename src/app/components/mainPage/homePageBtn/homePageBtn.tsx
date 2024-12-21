'use client';
import React, {FC} from 'react';
import cls from './homePageBtn.module.scss'
import {Button} from "@/ui/Button/Button";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {AppLink} from "@/ui/appLink/appLink";

interface homePageBtnProps {}

const HomePageBtn:FC<homePageBtnProps> = (props) => {

    const { } = props;
    const dispatch = useAppDispatch();

    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)

    const { changeStateLoginFormPopup } = statePopupSliceActions;

    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div className={cls.coverBtn} >
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