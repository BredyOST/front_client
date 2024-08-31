'use client';
import React, {ButtonHTMLAttributes, FC} from 'react';
import cls from './buttonToBuy.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";

interface buttonToBuyProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string;
    itemCategoryToBuy?:number;
    onClick?:any;
    isActive?: boolean;
}

const ButtonToBuy:FC<buttonToBuyProps> = (props) => {
    const {
        classname ,
        itemCategoryToBuy,
        children,
        onClick,
        isActive
    } = props;

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
