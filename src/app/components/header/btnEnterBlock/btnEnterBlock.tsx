'use client';
import React, {FC} from 'react';
import cls from './btnEnterBlock.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import LogInSvg from "@/app/components/svgs/login.svg";
import ProfileSvg from "@/app/components/svgs/profile.svg";
import Profile from "@/app/components/header/profileList/profileList";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import {redirect} from "next/navigation";
import App from "next/app";
import Link from "next/link";

interface btnEnterBlockProps {
    classname?: string;
}

const BtnEnterBlock:FC<btnEnterBlockProps> = React.memo((props) => {
    const { classname } = props;
    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    // для изменения состояния попапа loginForm
    const { changeStateLoginFormPopup } = statePopupSliceActions;

    //STATES FROM REDUX
    //данные по авторизации
    const {stateAuth} = useAppSelector(state => state.auth)

    //USESTATE
    // для отображения и скрытия подменю профиля
    const[pointerOnProfile, setPointerOnProfile] = React.useState<boolean>(false)

    //USEREF

    //FUNCTIONS
    // для отображения и скрытия всплывающего меню на кнопке профиль
    // отслеживаем когда на кнопке
    // const mouseOnProfile = React.useCallback(() => {
    //     setPointerOnProfile(true)
    // },[]);
    // отслеживаем когда ушел курсор
    // const mouseLeftProfile = React.useCallback(() => {
    //     setPointerOnProfile(false)
    // },[]);
    // для открытия попапа
    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div
            className={cls.coverProfile}
            // onPointerLeave={stateAuth ? mouseLeftProfile : undefined}
        >
            {!stateAuth
                ? <Button
                    classname={cls.buttonLogin}
                    onClick={!stateAuth ? openLoginFormPopup : undefined}
                    // onPointerEnter={stateAuth ? mouseOnProfile : undefined}
                    type='button'
                    name='login'
                >
                    <LogInSvg className={cls.svgProfile}/>
                    <span>Войти</span>
                </Button>
                : <AppLink
                    classname={cls.buttonLogin}
                    href={`/dashboard/profile`}
                >
                    <ProfileSvg className={cls.svgProfile}/>
                    <span>Профиль</span>
                </AppLink>
            }
            {pointerOnProfile && stateAuth &&
                <Profile
                    classname={cls.profileBlock}
                />
            }
        </div>
    );
});

export default BtnEnterBlock;