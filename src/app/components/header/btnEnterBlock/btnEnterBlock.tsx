'use client';
import React, {FC} from 'react';
import cls from './btnEnterBlock.module.scss'
import {Button} from "@/ui/Button/Button";
import LogInSvg from "@/assets/svgs/login.svg";
import ProfileSvg from "@/assets/svgs/profile.svg";
import Profile from "@/app/components/header/profileList/profileList";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {AppLink} from "@/ui/appLink/appLink";
import {TypeForFunc} from "@/shared/types/types";

const BtnEnterBlock = React.memo(() => {
    const dispatch = useAppDispatch();

    const { changeStateLoginFormPopup } = statePopupSliceActions;

    const {stateAuth} = useAppSelector(state => state.auth)

    const[pointerOnProfile, setPointerOnProfile] = React.useState<boolean>(false)

    const openLoginFormPopup:TypeForFunc<void, void> = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);
    console.log(stateAuth)

    return (
        <div
            className={cls.coverProfile}
        >
            {!stateAuth
                ? <Button
                    classname={cls.buttonLogin}
                    onClick={!stateAuth ? openLoginFormPopup : undefined}
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