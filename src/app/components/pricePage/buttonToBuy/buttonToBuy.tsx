'use client';
import React, {ButtonHTMLAttributes, FC, ReactNode} from 'react';
import cls from './buttonToBuy.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {filteredCategoriesType} from "@/app/redux/entities/categories/categoriesSchema";

interface ButtonToBuyProps  {
    classname?: string;
    itemCategoryToBuy:filteredCategoriesType;
    onClick: (arg:filteredCategoriesType) => void
    isActive: boolean;
    children: ReactNode
}

const ButtonToBuy = ({ classname , itemCategoryToBuy, children, onClick, isActive}:ButtonToBuyProps ) => {

    const mod:Mods = {
        [cls.active]:isActive,
    }

    return (
        <button className={classNames(cls.buttonToBuy, mod,[classname] )}
            onClick={() => onClick(itemCategoryToBuy)}
        >
            {children}
        </button>
    );
};

export default ButtonToBuy;
