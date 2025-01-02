'use client';
import React from 'react';
import cls from "@/app/components/profilePage/changeName/changeName.module.scss";
import {useAppSelector} from "@/app/redux/hooks/redux";

const BlockActiveMoney = () => {

    const {data:infoUser} = useAppSelector(state => state.auth)

    return (
        <div className={cls.block}>
            <div className={cls.blockInfo}>
                <div className={cls.text}>Кошелек</div>
            </div>
            <div>{infoUser?.wallet ?? 0} р</div>

        </div>
    );
};

export default BlockActiveMoney;