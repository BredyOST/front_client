'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './changePhone.module.scss'
import VerifySvg from "@/assets/svgs/checkmarkc.svg";
import NotVerifySvg from "@/assets/svgs/notVefify.svg";
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useActivateTgProfileMutation,
    useChangePhoneMutation, useGetPhoneCodeTgMutation, useGiveInfoMutation,
    useVerifyTgMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {parseCookies} from "nookies";
import Loader from "@/ui/Loader/Loader";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import 'react-phone-number-input/style.css'

interface changePhoneProps {}

export interface Country {
    name: string;
    value: string;
}

const ChangePhone:FC<changePhoneProps> = () => {

    const {data:infoUser} = useAppSelector(state => state.auth)
    const [inputPhone, setInputPhone] = React.useState<string>('')

    React.useEffect(
        () => {
            if( infoUser && infoUser?.phoneNumber) {
                setInputPhone(infoUser.phoneNumber)
            } else {
                setInputPhone(` `)
            }
        }, [infoUser]
    )


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