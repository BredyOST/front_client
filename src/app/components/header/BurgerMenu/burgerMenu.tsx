'use client';
import React from 'react';
import cls from './burgerMenu.module.scss'
import {classNames, Mods} from "@/helpers/lib/classNames/className";
import {AppLink} from "@/ui/appLink/appLink";
import ArrowSVG from '@/assets/svgs/arrow-right.svg'
import {Button} from "@/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {stateBurgerMenuSliceActions} from "@/app/redux/entities/stateBurger/stateBurgerSlice";
import {NavBar, TypeForFunc} from "@/shared/types/types";
import {useLogOutFromProfile} from "@/shared/hooks/hooks";
import {navbarFirst} from "@/shared/constants/index.constants";
interface BurgerMenuProps {
    classname?: string;
    indicatorOpen:boolean;
    forOnClick?:any
}

export const BurgerMenu = React.memo(({ classname, indicatorOpen, forOnClick,}:BurgerMenuProps) => {

    const dispatch = useAppDispatch();
    const {changeStateMenuBurger} = stateBurgerMenuSliceActions;
    const {stateAuth} = useAppSelector(state => state.auth)

    const mod:Mods = {
        [cls.active]:indicatorOpen
    }

    const closePopup:TypeForFunc<void, void> = () => {
        dispatch(changeStateMenuBurger(false))
        document.documentElement.classList.remove("lock")
    }

    const logoutProfile = useLogOutFromProfile()

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
                    {navbarFirst && navbarFirst?.length > 0 &&
                        navbarFirst.map((item:NavBar) => (
                            <AppLink
                                classname={cls.links}
                                key={item.text}
                                href={item.href}
                                onClick={closePopup}
                            >
                                {item.text}
                            </AppLink>
                        ))
                    }
                    <AppLink
                        classname={`${cls.links} ${cls.search}`}
                        href={'/dashboard/contacts'}
                        onClick={closePopup}
                    >
                        Контакты
                    </AppLink>
                    <AppLink
                        classname={`${cls.links} ${cls.search}`}
                        href={'/dashboard/terms'}
                        onClick={closePopup}
                    >
                        Пользовательское соглашение
                    </AppLink>
                    <AppLink
                        classname={`${cls.links} ${cls.search}`}
                        href={'/dashboard/politics'}
                        onClick={closePopup}
                    >
                        Политика конфедициальности
                    </AppLink>
                    {stateAuth &&
                        <Button
                            classname={cls.btnEnter}
                            onClick={logoutProfile}
                        >
                            Выйти
                        </Button>
                    }
                </ul>
            </div>
        </div>
    );
});

