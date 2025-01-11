'use client';
import React, {ChangeEvent} from 'react';
import cls from "@/app/components/profilePage/changeName/changeName.module.scss";
import {useAppSelector} from "@/app/redux/hooks/redux";
import {useAddPaymentMutation} from "@/app/redux/entities/requestApi/requestApi";
import {Button} from "@/ui/Button/Button";
import {Input} from "@/ui/input/Input";
import {redirect, useRouter} from "next/navigation";
import Link from "next/link";

const BlockActiveMoney = () => {

    const {data:infoUser} = useAppSelector(state => state.auth)
    const [addRequestToGetMoney, {data, isError, isLoading }] = useAddPaymentMutation()
    const [value, setValue] = React.useState<string>('0')
    const router = useRouter();


    const addMoney = async () => {
        try {
            const result: any = await addRequestToGetMoney({ price: value });
            if (result.data?.url) {
                console.log(result.data?.url);
                router.push(result.data?.url);
            }
        } catch (error) {
            // Обрабатываем другие ошибки
            console.error(error);
        }
    };


    return (
        <div className={cls.block}>
            <div className={cls.blockInfo}>
                <div className={cls.text}>Кошелек</div>
            </div>
            <div className={cls.coverBtn}>
                <Link className={cls.btn} href="/dashboard/price">пополнить</Link>
            </div>
        </div>
    );
};

export default BlockActiveMoney;