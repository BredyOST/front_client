'use client';
import React, {ChangeEvent} from 'react';
import cls from "@/app/components/pricePage/blockAddMoneyToWallet/BlockAddMoneyToWallet.module.scss";
import {Button} from "@/ui/Button/Button";
import {useAddPaymentMutation} from "@/app/redux/entities/requestApi/requestApi";
import {useRouter} from "next/navigation";
import {Input} from "@/ui/input/Input";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {TypeForFunc} from "@/shared/types/types";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import Loader from "@/ui/Loader/Loader";

const BlockAddMoneyToWallet = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [addRequestToGetMoney, {data, isError, isLoading }] = useAddPaymentMutation()
    const [value, setValue] = React.useState<string>('0')
    const {stateAuth} = useAppSelector(state => state.auth)
    const { changeStateLoginFormPopup } = statePopupSliceActions;


    const addMoney = async () => {
        let result:any = null;
        try {
            // if(+value < 500) {
            //     result = await addRequestToGetMoney({ price: 500 });
            // } else {
            //     result = await addRequestToGetMoney({ price: value });
            // }

            result = await addRequestToGetMoney({ price: value });

            if (result && result.data?.url) {
                console.log(result.data?.url);
                router.push(result.data?.url);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const openLoginFormPopup:TypeForFunc<void, void> = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);


    return (
        <div className={cls.coverCategories}>
            <div className={cls.coverButtonCategories}>
                <Input
                    classForInput={cls.input}
                    classname={cls.inputRelative}
                    placeholder='Введите сумму от 500 р'
                    type='tel'
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                />
                {stateAuth
                    ? <Button
                        classname={cls.btn}
                        onClick={addMoney}
                    >Пополнить баланс
                    </Button>
                    :   <Button
                        classname={cls.btn}
                        onClick={openLoginFormPopup}
                    >
                        <span className={cls.spanFirst}> Пополнить</span>
                    </Button>
                }
            </div>
            { isLoading
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default BlockAddMoneyToWallet;