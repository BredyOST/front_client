'use client';
import React, {FC} from 'react';
import cls from './blockBtnAdd.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import PlusSvg from "@/app/components/svgs/plus.svg";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import ListsCategory from "@/app/dashboard/price/listsCategory/listsCategory";

interface blockBtnAddProps {
    classname?: string;
}

const BlockBtnAdd:FC<blockBtnAddProps> = (props) => {
    const {
        classname,
    } = props;
    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    const {changeStateCategoriesPopup} = statePopupSliceActions;
    const { closeAllPopups } = statePopupSliceActions;
    //STATES FROM REDUX
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)
    const {chosenCategory} = useAppSelector(state => state.categories)

    //USESTATE

    //USEREF
    const targetRef = React.useRef(null);

    //FUNCTIONS
    const changeStateShowMenuCategory = () => {

        if(categoriesPopup) {
            dispatch(closeAllPopups(true))
        } else {
            dispatch(changeStateCategoriesPopup(true))
        }
    }

    return (
        <div className={cls.coverCategories}>
            <h2 ref={targetRef} className={cls.titleCategories}>Выберите категории</h2>
            <div className={classNames(cls.coverButtonCategories, {},[classname] )} >
                <Button
                    classname={cls.btn}
                    onClick = {changeStateShowMenuCategory}
                >
                    <PlusSvg
                        className={cls.svgPlus}
                    />
                    {chosenCategory.length ? `Добавить / Удалить категории` : 'Добавить категории'}
                </Button>
            </div>
            <div className={cls.blockCategories}>
                {chosenCategory.length > 0 && chosenCategory.map((item:any) => (
                    <div
                        className={cls.chosen}
                        key={item.text}
                    >
                        {item.text}
                    </div>
                ))}
                {chosenCategory.length === 0 && <div className={cls.chosenRed}>Категории не выбраны</div>}
            </div>
        </div>
    );
};

export default BlockBtnAdd;