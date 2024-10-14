'use client';
import React from 'react';
import cls from './changePhone.module.scss'
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
import {useAppSelector} from "@/app/redux/hooks/redux";
import 'react-phone-number-input/style.css'

const ChangePhone = () => {

    const {data:infoUser} = useAppSelector(state => state.auth)

    return (
        <>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Телефон</div>
                    {infoUser && infoUser.isActivatedPhone
                        ? <div className={cls.textVerify}> подтвержден<VerifySvg className={cls.verifySvg}/></div>
                        : <div className={cls.textVerify}>не подтвержден<NotVerifySvg className={cls.notVerifySvg}/></div>
                    }
                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        {infoUser?.phoneNumber ? infoUser?.phoneNumber : 'номер отсутствует'}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePhone;