'use client'
import React, { FC } from 'react';
import cls from './appLink.module.scss';
import Link, {LinkProps} from "next/link";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {categoriesActions} from "@/app/redux/entities/categories/categoriesSlice";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";

interface AppLinkProps extends LinkProps {
    classname?: string;
    indicator?: boolean;
    indicatorBurger?:boolean;
    onPointerEnter?:any;
    onPointerLeave?:any
    children?:any
    href:any
    onClick?:any
    infroForOnclick?:any
}

export const AppLink:FC<AppLinkProps> = React.memo((props) => {
    const {
        classname,
        children,
        href,
        indicator, // для того чтобы добавить класс active ссылке. индикатор для header
        indicatorBurger, // индикатор для burger menu
        onPointerEnter,
        onPointerLeave,
        onClick,
        infroForOnclick
    } = props;

    const mods: Mods = {
        [cls.active]: indicator,
        [cls.activeBurger]: indicatorBurger,
    };

    const {addChosenCategories} = categoriesActions;
    const dispatch = useAppDispatch();

    //STATES FROM REDUX
    // все выбранные категории

    const goToPrice = (infroForOnclick:any) => {
        if (infroForOnclick && infroForOnclick?.id)
            dispatch(addChosenCategories([ { id: infroForOnclick?.id, text: infroForOnclick?.name }]));
    }


    return (
        <Link
            href={href}
            className={classNames(cls.appLink, mods, [classname])}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onClick={onClick ? onClick : () => goToPrice(infroForOnclick)}
        >
            {children}
        </Link>
    );
});
