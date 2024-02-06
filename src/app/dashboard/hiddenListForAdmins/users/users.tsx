'use client';
import React, {FC} from 'react';
import cls from './users.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {classNames} from "@/app/components/shared/lib/classNames/className";

interface usersProps {
    classname?: string;
}

const Users:FC<usersProps> = (props) => {
    const { classname } = props;
    
    //ACTIONS FROM REDUX
    
    //STATES FROM REDUX
    
    //USESTATE
    
    //USEREF
    
    //FUNCTIONS


    return (
        <div className={classNames(cls.users, {},[classname] )} >
            <Button>получить логи</Button>
            <h2 className={cls.mainTitle}>Информация о пользователоях</h2>
        </div>
    );
};

export default Users;