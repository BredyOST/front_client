'use client';
import React, {FC} from 'react';
import cls from './price.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAddNewPriceBlockMutation} from "@/app/redux/entities/requestApi/requestApi";

interface priceProps {
    classname?: string;
}

const Price:FC<priceProps> = (props) => {
    const { classname } = props;

    //ACTIONS FROM REDUX

    //STATES FROM REDUX
    const [createPrice, {data: requestPrice, error:errorPrice, isLoading: isLoadingPrice, isError:isErrorPrice}] = useAddNewPriceBlockMutation()
    //USESTATE
    const [inputsPrice, setInputsPrice] = React.useState<any>({title: '', price: '', period:''})

    //USEREF

    //FUNCTIONS

    const sendToCreate = () => {
        createPrice({
            identidicatorId: `3`,
            title:'Нужен персональный тариф для команды?',
            price:0,
            period:1,
            description:'Напиши нам на почту ТУТ ПОЧТА',
            sale:false,
            percentForSale:0,
        })
    }

    return (
        <div className={classNames(cls.price, {},[classname] )} >
            <Button
                classname={cls.btn}
                onClick={sendToCreate}
            >
                Cоздать прайс
            </Button>
        </div>
    );
};

export default Price;
