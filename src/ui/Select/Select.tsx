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
        const local = localStorage.getItem('_sel_category');

        if (local !== null) {
            const savedCategory:objSelectType = JSON.parse(local);
            dispatch(addCategoryChosen(savedCategory))
        } else {
            const selectedCategory =  categories?.[0]
            const obj:objSelectType = {
                id: selectedCategory?.id,
                name: selectedCategory?.name,
                positive: selectedCategory?.positiveWords,
                negative: selectedCategory?.negativeWords,
            };
            localStorage.setItem('_sel_category', JSON.stringify(obj));
            dispatch(addCategoryChosen(obj));
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
                    {categories?.filter((item:filteredCategoriesType) => item.show)?.map((item:filteredCategoriesType, index:number) => (
                        <option
                            className={cls.option}
                            key={index}
                            value={item.name}
                        >
                            {item.name}
                        </option>
                    ))}
                    {/*{infoUser && !infoUser.endFreePeriod && infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length > 0 && infoUser?.categoriesFreePeriod?.map((item:categoriesBoughtType, index:number) => (*/}
                    {/*    currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime() &&*/}
                    {/*    <option*/}
                    {/*        className={cls.option}*/}
                    {/*        key={index}*/}
                    {/*        value={item.category}*/}
                    {/*    >*/}
                    {/*        {item.category}*/}
                    {/*    </option>*/}
                    {/*))}*/}
                    {/*{infoUser && infoUser?.categoriesHasBought?.length > 0 && infoUser?.categoriesHasBought?.map((item:categoriesBoughtType, index:number) => (*/}
                    {/*    currenDate.getTime() <= new Date(item?.purchaseEndDate).getTime() &&*/}
                    {/*    <option*/}
                    {/*        className={cls.option}*/}
                    {/*        key={index}*/}
                    {/*        value={item.category}*/}
                    {/*    >*/}
                    {/*        {item.category}*/}
                    {/*    </option>*/}
                    {/*))}*/}
                </select>
                <ArrowSvg
                    className={cls.arrow}
                />
            </div>
        </div>
    );
});
