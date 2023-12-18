'use client';
import React, {FC} from 'react';
import cls from './burgerMenu.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {NavBar, navbarFirst} from "@/app/components/header/header";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import ArrowSVG from '../../svgs/arrow-right.svg'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {destroyCookie} from "nookies";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
interface BurgerMenuProps {
    classname?: string;
    indicatorOpen:boolean;
    forOnClick?:any
}

export const BurgerMenu:FC<BurgerMenuProps> = React.memo((props) => {
    const {
        classname,
        indicatorOpen,
        forOnClick,
    } = props;

    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    // для изменения состояния попапа loginForm
    const { changeStateLoginFormPopup } = statePopupSliceActions;
    const {addAuthStatus, addAdminRole, addMainAdminRole, LogOutFromProfile,} = authSliceActions;

    //STATES FROM REDUX
    const {stateAuth} = useAppSelector(state => state.auth)
    //USESTATE
    
    //USEREF
    
    //FUNCTIONS

    const mod:Mods = {
        [cls.active]:indicatorOpen
    }

    // для открытия попапа
    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    const logout = React.useCallback(() => {
        destroyCookie(null, "_z", {path:'/'});
        destroyCookie(null, "_d", {path:'/'});
        dispatch(LogOutFromProfile(null));
        dispatch(addMainAdminRole(false));
        dispatch(addAdminRole(false));
        dispatch(addAuthStatus(false));
        location.reload()
    },[])


    return (
        <div className={classNames(cls.burgerMenu, mod,[classname] )} >
            <Button
                classname={cls.button}
                onClick = {() => forOnClick()}
            >
                <ArrowSVG
                    className={cls.arrow}
                />
            </Button>
            <div className={cls.section}>
                <ul className={cls.coverLinks}>
                    {!stateAuth &&
                        <Button
                            classname={cls.btnEnter}
                            onClick={openLoginFormPopup}
                        >
                            Войти в учетную запись
                        </Button>
                    }
                    {navbarFirst && navbarFirst?.length > 0 &&
                        navbarFirst.map((item) => (
                            <AppLink
                                classname={cls.links}
                                key={item.text}
                                href={item.href}
                            >
                                {item.text}
                            </AppLink>
                        ))
                    }
                    {stateAuth &&
                        <Button
                            classname={cls.btnEnter}
                            onClick={logout}
                        >
                            Выйти
                        </Button>
                    }
                </ul>
            </div>
        </div>
    );
});

