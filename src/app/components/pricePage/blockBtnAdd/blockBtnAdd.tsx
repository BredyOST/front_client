'use client';
import React, {FC} from 'react';
import cls from './blockBtnAdd.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import CloseSvg from "@/app/components/svgs/close.svg";
import {categoriesActions} from "@/app/redux/entities/categories/categoriesSlice";
import {itemType} from "@/app/redux/entities/categories/categoriesSchema";
import {TypeForFunc} from "@/app/types/types";

interface blockBtnAddProps {}

const BlockBtnAdd:FC<blockBtnAddProps> = React.memo(() => {

    const dispatch = useAppDispatch();

    const {changeStateCategoriesPopup} = statePopupSliceActions;
    const {closeAllPopups } = statePopupSliceActions;
    const {addChosenCategories} = categoriesActions;

    const {categoriesPopup} = useAppSelector(state => state.loginPopup)
    const {chosenCategory} = useAppSelector(state => state.categories)

    const changeStateShowMenuCategory:TypeForFunc<void, void> = () => {
        if(categoriesPopup) {
            dispatch(closeAllPopups(true))
        } else {
            dispatch(changeStateCategoriesPopup(true))
        }
    }
    
    const addThisToBuy:TypeForFunc<itemType, void> = (item) => {
        const isItemInChosen:itemType | undefined = chosenCategory?.find((element:itemType) => element.id === item.id);
        if (isItemInChosen) {
            // if element has chosen, delete it
            const updatedChosen:itemType[] = chosenCategory.filter((element:itemType) => element.id !== item.id);
            dispatch(addChosenCategories(updatedChosen));
        }
    }

    return (
        <div className={cls.coverCategories}>
            <div className={cls.coverBtns}>
            </div>
            <div className={cls.coverButtonCategories} >
                <Button
                    classname={cls.btn}
                    onClick = {changeStateShowMenuCategory}
                >
                    Добавить категории
                </Button>
            </div>
            <div className={cls.blockCategories}>
                {chosenCategory.length > 0 && chosenCategory.map((item:itemType) => (
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
});

export default BlockBtnAdd;