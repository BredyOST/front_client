'use client';
import React, {FC} from 'react';
import cls from './users.module.scss'
import {Button} from "@/ui/Button/Button";
import {classNames} from "@/helpers/lib/classNames/className";

interface usersProps {
    classname?: string;
}

const Users:FC<usersProps> = (props) => {
    const { classname } = props;

    return (
        <div className={classNames(cls.users, {},[classname] )} >
            <Button>получить логи</Button>
            <h2 className={cls.mainTitle}>Информация о пользователоях</h2>
        </div>
    );
};

export default Users;