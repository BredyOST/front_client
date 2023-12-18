import React, { ButtonHTMLAttributes, FC } from 'react';
import cls from './Button.module.scss';
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    classname?: string;
    theme?: string;
    name?:string;
    onClick?:any;
    indicatorActive?:boolean;
    classActive?:string;
    indicatorActiveTab?:boolean;
    tabIndex?:number;
    addNameToFunction?:boolean;
    itemCategoryToBuy?:number;
}

export const Button:FC<ButtonProps> = React.memo((props) => {
    const {
        classname,
        children,
        type = 'button',
        name,
        onClick,
        onPointerEnter,
        indicatorActive,
        classActive,
        indicatorActiveTab,
        tabIndex,
        addNameToFunction,
    } = props;

    const mod:Mods = {
        [cls.active]: indicatorActive,
        [cls.activeTab]: indicatorActiveTab,
    }
    return (
        <button
            tabIndex={tabIndex}
            type={type}
            className={classNames(cls.Button, mod, [classname])}
            onClick={addNameToFunction ? () => onClick(name) : onClick}
            onPointerEnter={onPointerEnter}
            name={name}
        >
            {children}
        </button>

    );
});
