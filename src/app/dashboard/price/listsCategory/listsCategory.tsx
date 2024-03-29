'use client';
import React, {FC, Suspense} from 'react';
import cls from './listsCategory.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import Modal from "@/app/components/shared/ui/Modal/Modal";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import AddSvg from '../../../components/svgs/add.svg';
import ChosenSvg from '../../../components/svgs/chosen.svg';
import ButtonToBuy from "@/app/dashboard/price/buttonToBuy/buttonToBuy";
import {categoriesActions} from "@/app/redux/entities/categories/categoriesSlice";
import {BurgerButton} from "@/app/components/widgets/BurgerButton/burgerButton";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {redirect} from "next/navigation";

interface listsCategoryProps {
    classname?: string;
    categories:any
}

const ListsCategory:FC<listsCategoryProps> = React.memo((props) => {
    const {
        classname,
        categories
    } = props;

    const dispatch = useAppDispatch();
    //ACTIONS FROM REDUX
    // для изменения состояния попапа loginForm
    const { changeStateLoginFormPopup, changeStateCategoriesPopup } = statePopupSliceActions;
    const {addCategories, addChosenCategories} = categoriesActions;
    const { closeAllPopups } = statePopupSliceActions;

    //STATES FROM REDUX
    // все выбранные категории
    const {chosenCategory} = useAppSelector(state => state.categories)
    // состояние попапа категорий
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)
    //USESTATE
    // const [chooseCategories, setChooseCategories] = React.useState<any[]>([])
    //USEREF

    //FUNCTIONS
    // функция для изменения состояния попапа loginForm
    const closeCategoryPopup = React.useCallback(() => {
        dispatch(changeStateCategoriesPopup(false));
    }, []);


    const addThisToBuy = (item:any) => {
        const isItemInChosen = chosenCategory.find((element:any) => element.id === item.id);
        if (isItemInChosen) {
            // Если элемент уже есть, уберите его из состояния
            const updatedChosen = chosenCategory.filter((element:any) => element.id !== item.id);
            dispatch(addChosenCategories(updatedChosen));
        } else {
            // Если элемент отсутствует, добавьте его в состояние
            const newItem = { id: item.id, text: item.name, chatNames: item.chatNames };
            dispatch(addChosenCategories([...chosenCategory, newItem]));
        }
    }

    const closePopup = () => {
        dispatch(closeAllPopups(true));
        // dispatch(changeStateCategoriesPopup(false));
    }
    
    return (
        <Modal
            classname={classNames(cls.LoginModal, {}, [classname])}
            isOpen={categoriesPopup}
            onClose={closeCategoryPopup}
            classForContent={cls.content}
            lazy
        >
            <Suspense fallback={
                <Loader classname="color-dark" />
            }
            >
                <div className={classNames(cls.listsCategory, {},[classname] )} >
                    <div className={cls.title}>Нажмите на категорию чтобы добавить или убрать</div>
                    <div className={cls.cover}>
                        {categories && categories.map((item:any) => (
                            <div
                                key={item.id}
                                className={cls.coveBtn}
                            >
                                <ButtonToBuy
                                    isActive={chosenCategory.map((element) => element.id).includes(item.id)}
                                    onClick={addThisToBuy}
                                    itemCategoryToBuy={item}
                                >
                                    {chosenCategory.some((element) => element.id === item.id) ? (
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
                            onClick={closePopup}
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
