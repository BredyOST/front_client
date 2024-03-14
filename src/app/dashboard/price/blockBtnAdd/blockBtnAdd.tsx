'use client';
import React, {FC, ReactElement} from 'react';
import cls from './blockBtnAdd.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import PlusSvg from "@/app/components/svgs/plus.svg";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import ListsCategory from "@/app/dashboard/price/listsCategory/listsCategory";
import CloseSvg from "@/app/components/svgs/close.svg";
import {categoriesActions} from "@/app/redux/entities/categories/categoriesSlice";
import { PricesSLiceActions } from "@/app/redux/entities/prices/pricesSlice";

interface blockBtnAddProps {
    classname?: string;
    categories:any
}

const BlockBtnAdd:FC<blockBtnAddProps> = (props) => {
    const {
        classname,
        categories,
    } = props;
    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    const {changeStateCategoriesPopup} = statePopupSliceActions;
    const {closeAllPopups } = statePopupSliceActions;
    const {addChosenCategories} = categoriesActions;
    const {addActivePrice} = PricesSLiceActions;
    //STATES FROM REDUX
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)
    const {chosenCategory} = useAppSelector(state => state.categories)
    const {activePriceWindows} = useAppSelector(state => state.prices)

    //USESTATE

    //USEREF

    //FUNCTIONS
    const changeStateShowMenuCategory = () => {
        if(categoriesPopup) {
            dispatch(closeAllPopups(true))
        } else {
            dispatch(changeStateCategoriesPopup(true))
        }
    }
    
    const addThisToBuy = (item:any) => {
        const isItemInChosen = chosenCategory.find((element:any) => element.id === item.id);
        if (isItemInChosen) {
            // Если элемент уже есть, уберите его из состояния
            const updatedChosen = chosenCategory.filter((element:any) => element.id !== item.id);
            dispatch(addChosenCategories(updatedChosen));
        }
    }

    const changeStateActiveWindow = (num:number) => {
        dispatch(addActivePrice(num))
    }

    
    return (
        <div className={cls.coverCategories}>
            <div className={cls.coverBtns}>
                <Button
                    classname={`${cls.btnTwo} ${activePriceWindows == 1 && cls.btnActive} `}
                    onClick = {() => changeStateActiveWindow(1)}
                >
                    Выбор подписки
                </Button>
                <Button
                    classname={`${cls.btnTwo} ${activePriceWindows == 2 && cls.btnActive} `}
                    onClick = {() => changeStateActiveWindow(2)}
                >
                    Подключить уведомления
                </Button>
            </div>
            <div className={classNames(cls.coverButtonCategories, {},[classname] )} >
                <Button
                    classname={cls.btn}
                    onClick = {changeStateShowMenuCategory}
                >
                    Добавить категории
                </Button>
            </div>
            <div className={cls.blockCategories}>
                {chosenCategory.length > 0 && chosenCategory.map((item:any) => (
                    <div
                        className={cls.coverChosen}
                        key={item.text}
                    >
                        <div className={cls.chosen}>
                            {item.text}
                        </div>
                        <Button
                            className = {cls.close}
                            onClick={() => addThisToBuy(item)}
                        >
                            <CloseSvg
                                className = {cls.close}
                            />
                        </Button>
                    </div>
                ))}
                {chosenCategory.length === 0 && <div className={cls.chosenRed}>Категории не выбраны</div>}
            </div>
        </div>
    );
};

export default BlockBtnAdd;