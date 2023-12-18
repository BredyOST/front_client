import React, { FC } from 'react';
import cls from './AppLink.module.scss';
import Link, {LinkProps} from "next/link";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";

interface AppLinkProps extends LinkProps {
    classname?: string;
    indicator?: boolean;
    indicatorBurger?:boolean;
    onPointerEnter?:any;
    onPointerLeave?:any
    children?:any
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
    } = props;

    const mods: Mods = {
        [cls.active]: indicator,
        [cls.activeBurger]: indicatorBurger,
    };

    return (
        <Link
            href={href}
            className={classNames(cls.appLink, mods, [classname])}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
        >
            {children}
        </Link>
    );
});
