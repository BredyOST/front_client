'use client';
import React, {FC, Suspense} from 'react';
import cls from './listsCategory.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import Modal from "@/app/components/shared/ui/Modal/Modal";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import AddSvg from '../../svgs/add.svg';
import ChosenSvg from '../../svgs/chosen.svg';
import ButtonToBuy from "@/app/components/pricePage/buttonToBuy/buttonToBuy";
import {categoriesActions} from "@/app/redux/entities/categories/categoriesSlice";
import {Button} from "@/app/components/shared/ui/Button/Button";

import {filteredCategoriesType, itemType} from "@/app/redux/entities/categories/categoriesSchema";
import {TypeForFunc} from "@/app/types/types";
import {CategoriesType, CategoryListsUpdate} from "@/app/types/pageTypes/priceTypes";
import {LIST_CATEGORY_TITLE} from "@/app/utils/index.constants";


interface listsCategoryProps {
    categories:filteredCategoriesType[]
}

const ListsCategory = React.memo(({categories}:listsCategoryProps) => {

    const dispatch = useAppDispatch();

    const { changeStateLoginFormPopup, changeStateCategoriesPopup } = statePopupSliceActions;
    const {addCategories, addChosenCategories} = categoriesActions;
    const { closeAllPopups } = statePopupSliceActions;

    const {chosenCategory} = useAppSelector(state => state.categories)
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)

    const closeCategoryPopup = React.useCallback(() => {
        dispatch(changeStateCategoriesPopup(false));
    }, []);


    const addThisToBuy:TypeForFunc<filteredCategoriesType, void> = (item:filteredCategoriesType) => {
        const categoryHasChosen: itemType | undefined = chosenCategory.find((element:itemType) => element.id === item.id);
        if (categoryHasChosen) {
            // if element has chosen, delete this
            const updatedCategoriesList = chosenCategory.filter((element:itemType) => element.id !== item.id);
            dispatch(addChosenCategories(updatedCategoriesList));
        } else {
            // or add this
            const updatedCategoriesList:itemType = { id: item.id, text: item.name, chatNames: item.chatNames };
            dispatch(addChosenCategories([...chosenCategory, updatedCategoriesList]));
        }
    }

    const closePopups:TypeForFunc<void, void> = () => {
        dispatch(closeAllPopups(true));
    }

    return (
        <Modal
            classname={cls.LoginModal}
            isOpen={categoriesPopup}
            onClose={closeCategoryPopup}
            classForContent={cls.content}
            lazy
        >
            <Suspense fallback={
                <Loader classname="color-dark" />
            }
            >
                <div className={cls.listsCategory} >
                    <div className={cls.title}>{LIST_CATEGORY_TITLE}</div>
                    <div className={cls.cover}>
                        {categories && categories.map((item:filteredCategoriesType) => (
                            <div
                                key={item.id}
                                className={cls.coveBtn}
                            >
                                <ButtonToBuy
                                    isActive={chosenCategory.map((element:itemType) => element.id).includes(item.id)}
                                    onClick={addThisToBuy}
                                    itemCategoryToBuy={item}
                                >
                                    {chosenCategory.some((element:itemType) => element.id === item.id) ? (
                                        <ChosenSvg className={cls.iconAdd} />
                                    ) : (
                                        <AddSvg className={cls.iconAdd} />
                                    )
                                    }

                                    {item.name}
                                </ButtonToBuy>
                            </div>
                        ))}
                    </div>
                    <div className={cls.saveBtn}>
                        <Button
                            classname={cls.btns}
                            onClick={closePopups}
                        >
                            сохранить
                        </Button>
                    </div>
                </div>
            </Suspense>
        </Modal>
    );
});

export default ListsCategory;
