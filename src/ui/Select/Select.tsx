'use client'
import React, {ChangeEvent, FC} from 'react';
import cls from './Select.module.scss';
import {classNames} from "@/helpers/lib/classNames/className";
import ArrowSvg from '@/assets/svgs/arrow-right.svg'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";

import {categoriesBoughtType} from "@/app/components/profilePage/blockCategory/blockCategory";
import {filteredCategoriesType} from "@/app/redux/entities/categories/categoriesSchema";

interface SelectProps {
    classname?: string,
    label?:string,
    title?:string,
    categories?:filteredCategoriesType[],
}

type objSelectType = {
    id: number
    name: string
    positive: string[]
    negative: string[]
}

export const Select:FC<SelectProps> = React.memo((props) => {
    const {
        classname,
        title,
        categories,
    } = props;
    const dispatch = useAppDispatch();

    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)

    const {chosenCategory} = useAppSelector(state => state.searchParams)

    const {addCategoryChosen} = SearchParamsActions;

    const currenDate = new Date();

    const selectOption = (e: ChangeEvent<HTMLSelectElement>) => {
        let selectedCategory = null
        if(categories && categories?.length > 1) {
            selectedCategory = categories.find((item:filteredCategoriesType) => item.name === e.target.value);
        }
        if (selectedCategory) {
            const obj:objSelectType = {
                id: selectedCategory.id,
                name: selectedCategory.name,
                positive: selectedCategory.positiveWords,
                negative: selectedCategory.negativeWords,
            };
            localStorage.setItem('_sel_category', JSON.stringify(obj));
            dispatch(addCategoryChosen(obj));
        }
    };

    React.useEffect(() => {
        if (!categories || !infoUser) return;
        if (infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && !infoUser?.categoriesFreePeriod?.[0]) && (!infoUser?.categoriesHasBought?.[0]))) {
            return
        }
        const local = localStorage.getItem('_sel_category');

        let savedCategory:objSelectType | null = null
        let checkAccess:categoriesBoughtType | null = null
        let checkAccessBuy:categoriesBoughtType | null = null

        if (local !== null) {
            savedCategory = JSON.parse(local);
        }

        if (savedCategory && savedCategory?.id) {
            const findCategoriesFree = infoUser?.categoriesFreePeriod?.find((item:categoriesBoughtType) => item?.id == savedCategory?.id);
            const findCategoriesBuy = infoUser?.categoriesHasBought?.find((item:categoriesBoughtType) => item?.id == savedCategory?.id);

            if (currenDate && !infoUser?.endFreePeriod && findCategoriesFree?.purchaseEndDate && (currenDate?.getTime() <= new Date(findCategoriesFree?.purchaseEndDate).getTime())) {
                checkAccessBuy = findCategoriesFree;
            }
            if (currenDate && findCategoriesBuy?.purchaseEndDate && (currenDate?.getTime() <= new Date(findCategoriesBuy?.purchaseEndDate).getTime())) {
                checkAccessBuy = findCategoriesBuy;
            }
            if (checkAccess || checkAccessBuy) {
                dispatch(addCategoryChosen(savedCategory))
            }
        } else {
            if (infoUser && infoUser?.activatedFreePeriod && !infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length >= 1) {

                for (let item of infoUser?.categoriesFreePeriod) {
                    if (currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime()) {
                        let selectedCategory = null
                        if(categories && categories?.length > 1) {
                            selectedCategory =  categories?.find((elem:filteredCategoriesType) => elem?.id == item.id);
                        }
                        if (selectedCategory) {
                            const obj:objSelectType = {
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
            } else if (infoUser && infoUser?.categoriesHasBought?.length >= 1) {
                for (let item of infoUser?.categoriesHasBought) {
                    if (currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime()) {
                        let selectedCategory = null
                        if(categories && categories?.length > 1) {
                            selectedCategory = categories?.find((elem:filteredCategoriesType) => elem?.id == item.id);
                        }
                        if (selectedCategory) {
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
                    {infoUser && !infoUser.endFreePeriod && infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length > 0 && infoUser?.categoriesFreePeriod?.map((item:categoriesBoughtType, index:number) => (
                        currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime() &&
                        <option
                            className={cls.option}
                            key={index}
                            value={item.category}
                        >
                            {item.category}
                        </option>
                    ))}
                    {infoUser && infoUser?.categoriesHasBought?.length > 0 && infoUser?.categoriesHasBought?.map((item:categoriesBoughtType, index:number) => (
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
