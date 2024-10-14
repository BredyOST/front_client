'use client'
import React, { FC } from 'react';
import cls from './appLink.module.scss';
import Link, {LinkProps} from "next/link";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {categoriesActions} from "@/app/redux/entities/categories/categoriesSlice";
import {useAppDispatch} from "@/app/redux/hooks/redux";

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
        indicator,
        indicatorBurger,
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
    const [open, setOpen] = React.useState<boolean>(false);

    const goToPrice = (infroForOnclick:any) => {
        if (infroForOnclick && infroForOnclick?.id) {
            setOpen(prevState => !prevState)
            document.documentElement.classList.remove("lock")
            dispatch(addChosenCategories([ { id: infroForOnclick?.id, text: infroForOnclick?.name }]));
        }
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
