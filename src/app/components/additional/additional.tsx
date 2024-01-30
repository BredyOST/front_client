'use client';
import React, {FC} from 'react';
import cls from './additional.module.scss'

interface additionalProps {
    id:number
}

export const Additional:FC<additionalProps> = (props) => {

    const { id } = props;

    
    return (
        <div className={cls.cover}>
            <div className={cls.section}>
                код
            </div>
        </div>
    );
};

