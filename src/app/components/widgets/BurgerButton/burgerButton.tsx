'use client';
import React, {FC} from 'react';
import cls from './burgerButton.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {BurgerMenu} from "@/app/components/header/BurgerMenu/burgerMenu";
import {stateBurgerMenuSliceActions} from "@/app/redux/entities/stateBurger/stateBurgerSlice";


interface BurgerButtonProps {
    classname?: string;
}

const ANIMATION_DELAY_BURGER = 300;
const ANIMATION_DELAY_BURGER_TWO = 100;



interface BurgerButtonProps {
    classname?: string;
    stateMenuBurgerHeader?:string
}

export const BurgerButton:FC<BurgerButtonProps> = React.memo((props) => {

    const { classname } = props;
    const dispatch = useAppDispatch();

    const {changeStateMenuBurger} = stateBurgerMenuSliceActions;

    const {stateMenuBurgerHeader} = useAppSelector(state => state.stateBurgerMenu)

    const mod:Mods = {
        [cls.activeBurger]: stateMenuBurgerHeader,
    };

    const closeAndOpenBurger = () => {
        dispatch(changeStateMenuBurger(!stateMenuBurgerHeader))
        if (!stateMenuBurgerHeader) {
            document.documentElement.classList.add("lock")
        }
        if (stateMenuBurgerHeader) {
            document.documentElement.classList.remove("lock")
        }
    }

    return (
        <div>
            <Button
                classname={classNames(cls.burgerButton, mod, [classname])}
                type="button"
                onClick={closeAndOpenBurger}
            >
                <span />
            </Button>
            <BurgerMenu
                classname={cls.burgerList}
                forOnClick = {closeAndOpenBurger}
                indicatorOpen={stateMenuBurgerHeader}
            />
        </div>
    );
});





