'use client'
import React from 'react';
import {useAppSelector} from "@/app/redux/hooks/redux";
import cls from './blockWallet.module.scss';

const BlockWallet = () => {
    const {data:infoUser} = useAppSelector(state => state.auth)

    return (
        <div className={cls.wrapper}>
            <div className={cls.text}>Баланс</div>
            <div>
                {infoUser?.wallet ?? 0} р
            </div>
        </div>
    );
};

export default BlockWallet;