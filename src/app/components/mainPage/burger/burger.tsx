'use client';
import React, {FC} from 'react';
import cls from './burger.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import {ICategory} from "@/app/page";
import Link from "next/link";

interface burgerProps {
    classname?: string;
    categ?:any
}

export const Burger:FC<burgerProps> = (props) => {
    const {
        classname,
        categ
    } = props;


    const [open, setOpen] = React.useState<boolean>(false);

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    const changeOpen = () => {
        setOpen(prevState => !prevState)
        if (!open) {
            document.documentElement.classList.add("lock")
        }
        if (open) {
            document.documentElement.classList.remove("lock")
        }
    }


    return (
        <div className={open ? `${cls.category} ${cls.activeBurger}` :cls.category }>
            <h3 className={cls.titleMainCategory}>Категории</h3>
            <Button
                classname={cls.titleMainCategoryBtn}
                onClick = {changeOpen}
            >
                <div className={open ? `${cls.burger} ${cls.activeBurger}` :cls.burger}>
                    <span />
                </div>
                <div>Категории</div>
            </Button>
            <div className={cls.coverCategory}>
                {
                    categ && categ.map((item:ICategory) =>
                        <div
                            className={cls.coverLink}
                            key={item.id}
                        >
                            <AppLink
                                classname={cls.titleCategory}
                                key={item.id}
                                infroForOnclick = {item}
                                href={'/dashboard/price'}
                            >
                                {item.name}
                            </AppLink>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Burger;