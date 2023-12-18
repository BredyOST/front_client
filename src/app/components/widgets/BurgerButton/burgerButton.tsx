'use client';
import React, {FC} from 'react';
import cls from './burgerButton.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {BurgerMenu} from "@/app/components/header/BurgerMenu/burgerMenu";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
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

    // const [openedBurger, setOpenedBurger] = React.useState<boolean>(false); // индикатор открытия бургер меню

    //ACTIONS FROM REDUX
    const {changeStateMenuBurger} = stateBurgerMenuSliceActions;
    //STATES FROM REDUX

    //USESTATE
    const {stateMenuBurgerHeader} = useAppSelector(state => state.stateBurgerMenu)
    //USEREF

    // мод для того чтобы добавить класс когда меню активно, (отобразить список menu burger)
    const mod:Mods = {
        [cls.activeBurger]: stateMenuBurgerHeader,
    };

    //FUNCTIONS
    // функция для открытия меню бургер

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





