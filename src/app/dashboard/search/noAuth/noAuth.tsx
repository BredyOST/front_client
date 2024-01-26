import React, {FC} from 'react';
import cls from './noAuth.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import Link from "next/link";


interface noAuthProps {
    classname?: string;
}

const NoAuth:FC<noAuthProps> = (props) => {
    const { classname } = props;

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    return (
        <div className={classNames(cls.noAuth, {},[classname] )} >
            <div className={cls.noShowText}>Для проссмотра этой страницы вам необходимо авторизоваться!</div>
            <Link
                className={cls.btn}
                href={'/'}
            >
                Веруться на главную
            </Link>
        </div>
    );
};

export default NoAuth;