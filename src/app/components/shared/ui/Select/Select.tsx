'use client'
import React, {ChangeEvent, FC} from 'react';
import cls from './Select.module.scss';
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import ArrowSvg from './../../../svgs/arrow-right.svg'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";


interface SelectProps {
    classname?: string,
    label?:string,
    title?:string,
    categories?:any,
}

const empty = [
    {"id": 1, "name": "подписок не найдено" }
]

export const Select:FC<SelectProps> = React.memo((props) => {
    const {
        classname,
        title,
        categories,
    } = props;
    const dispatch = useAppDispatch();

    //states
    // states from redux
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    // параметры для поиска постов
    const {chosenCategory} = useAppSelector(state => state.searchParams)
    //ACTIONS
    const {addCategoryChosen} = SearchParamsActions;
    // indicators

    // Mods
    // functions
    const selectOption = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = categories.find((item:any) => item.name === e.target.value);
        if (selectedCategory) {
            const obj = {
                id: selectedCategory.id,
                name: selectedCategory.name,
                positive: selectedCategory.positiveWords,
                negative: selectedCategory.negativeWords,
            };
            localStorage.setItem('_sel_category', JSON.stringify(obj)); // Правильное преобразование объекта в строку JSON
            dispatch(addCategoryChosen(obj));
        }
    };

    React.useEffect(() => {

        const local = localStorage.getItem('_sel_category');
        let savedCategory:any;
        let checAcess:any;
        let checAcessBuy:any;

        if (local !== null) {
            savedCategory = JSON.parse(local);
        }

        if (savedCategory && savedCategory?.id) {
            checAcess = infoUser?.categoriesFreePeriod.find((item:any) => item?.id == savedCategory?.id)
            checAcessBuy = infoUser?.categoriesHasBought.find((item:any) => item?.id == savedCategory?.id)
        }

        if (infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && !infoUser?.categoriesFreePeriod?.length) && (!infoUser?.categoriesHasBought?.[0]))) {
            return
        }

        if (savedCategory && (checAcess || checAcessBuy)) {
            try {
                dispatch(addCategoryChosen(savedCategory))
            } catch (error) {
                // console.error('Ошибка при чтении данных из localStorage:', error);
            }
        } else {
            if (infoUser && infoUser?.activatedFreePeriod && new Date().getTime() < new Date(infoUser?.categoriesFreePeriod[0]?.purchaseEndDate).getTime() &&
                !infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length && infoUser?.categoriesFreePeriod?.[0]) {
                const selectedCategory = categories?.find((item:any) => item?.id === infoUser?.categoriesFreePeriod?.[0].id);
                const obj = {
                    id: selectedCategory.id,
                    name: selectedCategory.name,
                    positive: selectedCategory.positiveWords,
                    negative: selectedCategory.negativeWords,
                };
                localStorage.setItem('_sel_category', JSON.stringify(obj));
                dispatch(addCategoryChosen(obj));
            }
        }
    }, [categories, infoUser]);

    return (

        <div className={classNames(cls.Select, {}, [classname])}>
            { title &&
                <label className={cls.label}>
                    {title}
                </label>
            }
            <div className={cls.coverSelect}>
                <select
                    className={cls.coverCurrent}
                    value={chosenCategory?.name}
                    onChange ={(e:any) => selectOption(e)}
                >
                    {infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && !infoUser?.categoriesFreePeriod?.length) && (!infoUser?.categoriesHasBought?.length)) && empty.map((item) => (
                        <option
                            className={cls.option}
                            key={item.id}
                            value={item.name}
                        >
                            {item.name}
                        </option>
                    ))}
                    {infoUser && infoUser?.activatedFreePeriod && new Date().getTime() < new Date(infoUser?.categoriesFreePeriod[0]?.purchaseEndDate).getTime() && !infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length && infoUser?.categoriesFreePeriod?.map((item:any) => (
                        <option
                            className={cls.option}
                            key={item.id_category}
                            value={item.name}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
                <ArrowSvg
                    className={cls.arrow}
                />
            </div>
        </div>
    );
});
