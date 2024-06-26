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
    const currenDate = new Date();
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

        if (!categories || !infoUser) return;

        if (infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && !infoUser?.categoriesFreePeriod?.[0]) && (!infoUser?.categoriesHasBought?.[0]))) {
            return
        }

        const local = localStorage.getItem('_sel_category');

        let savedCategory:any;
        let checAcess:any;
        let checAcessBuy:any;

        if (local !== null) {
            savedCategory = JSON.parse(local);
        }


        if (savedCategory && savedCategory?.id) {

            const findCategFree = infoUser?.categoriesFreePeriod?.find((item:any) => item?.id == savedCategory?.id);
            const findCategBuy = infoUser?.categoriesHasBought?.find((item:any) => item?.id == savedCategory?.id);

            if (currenDate && !infoUser?.endFreePeriod && findCategFree?.purchaseEndDate && (currenDate?.getTime() <= new Date(findCategFree?.purchaseEndDate).getTime())) {
                checAcess = findCategFree;
            }
            if (currenDate && findCategBuy?.purchaseEndDate && (currenDate?.getTime() <= new Date(findCategBuy?.purchaseEndDate).getTime())) {
                checAcessBuy = findCategBuy;
            }

            if (checAcess || checAcessBuy) {
                dispatch(addCategoryChosen(savedCategory))
            }
        } else {
            if (infoUser && infoUser?.activatedFreePeriod && !infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length >= 1) {

                for (let item of infoUser?.categoriesFreePeriod) {
                    if (currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime()) {
                        const selectedCategory = categories?.find((elem:any) => elem?.id == item.id);
                        const obj = {
                            id: selectedCategory?.id,
                            name: selectedCategory?.name,
                            positive: selectedCategory?.positiveWords,
                            negative: selectedCategory?.negativeWords,
                        };
                        localStorage.setItem('_sel_category', JSON.stringify(obj));
                        dispatch(addCategoryChosen(obj));
                        break;
                    }
                }
            } else if (infoUser && infoUser?.categoriesHasBought?.length >= 1) {
                for (let item of infoUser?.categoriesHasBought) {
                    if (currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime()) {
                        const selectedCategory = categories?.find((elem:any) => elem?.id == item.id);
                        const obj = {
                            id: selectedCategory?.id,
                            name: selectedCategory?.name,
                            positive: selectedCategory?.positiveWords,
                            negative: selectedCategory?.negativeWords,
                        };
                        localStorage.setItem('_sel_category', JSON.stringify(obj));
                        dispatch(addCategoryChosen(obj));
                        break;
                    }
                }
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
                    {infoUser && !infoUser.endFreePeriod && infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length > 0 && infoUser?.categoriesFreePeriod?.map((item:any, index:number) => (
                        currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime() &&
                        <option
                            className={cls.option}
                            key={index}
                            value={item.category}
                        >
                            {item.category}
                        </option>
                    ))}
                    {infoUser && infoUser?.categoriesHasBought?.length > 0 && infoUser?.categoriesHasBought?.map((item:any, index:number) => (
                        currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime() &&
                        <option
                            className={cls.option}
                            key={index}
                            value={item.category}
                        >
                            {item.category}
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
