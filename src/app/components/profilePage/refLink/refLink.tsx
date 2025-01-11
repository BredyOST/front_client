'use client'
import React from 'react';
import {useAppSelector} from "@/app/redux/hooks/redux";
import cls from './refLink.module.scss'
import VerifySvg from "@/assets/svgs/checkmarkc.svg";
import NotVerifySvg from "@/assets/svgs/notVefify.svg";

const RefLink = () => {

    const {data: infoUser} = useAppSelector(state => state.auth)

    return (
        <>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Баланс</div>

                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        {infoUser?.wallet} рублей
                    </div>
                </div>
            </div>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Реф. ссылка</div>

                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        https://xn--e1affem4a4d.com/?partnerId={infoUser?.id}
                    </div>
                </div>
            </div>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Реф. баланс</div>

                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        {infoUser?.walletRef} рублей
                    </div>
                </div>
            </div>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Рефералы</div>

                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        {infoUser?.childrenRefId?.length} человек
                    </div>
                </div>
            </div>

        </>
    );
}


export default RefLink;