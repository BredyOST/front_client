'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './inputPrice.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useUpdatePriceMutation} from "@/app/redux/entities/requestApi/requestApi";

interface inputPriceProps {
    classname?: string;
    index: number | string;
    item:any
}

const InputPrice:FC<inputPriceProps> = (props) => {
    const {
        classname,
        index,
        item
    } = props;

    const [updatePrice, {data: requestUpdatePrice, error:errorUpdatePrice, isLoading: isLoadingUpdatePrice, isError:isErrorUpdatePrice}] = useUpdatePriceMutation()

    const [deleted, setDeleted] = React.useState<boolean>(false)
    const [title, setTitle] = React.useState<string>(item.title ? item.title : '')
    const [price, setPrice] = React.useState<string>(item.price ? item.price : '')
    const [period, setPeriod] = React.useState<string>(item.period ? item.period : '')
    const [description, setDescription] = React.useState<string>(item.description ? item.description : '')
    const [sale, setSale] = React.useState<string>(item.sale ? item.sale : '')
    const [percentForSale, setPercentForSale] = React.useState<string>(item.percentForSale ? item.percentForSale : '')

    const mod:Mods = {
        [cls.deleted]: deleted
    }

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    const changeTitle = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const changePrice = (e:ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value)
    }
    const changePeriod = (e:ChangeEvent<HTMLInputElement>) => {
        setPeriod(e.target.value)
    }
    const changeDescription = (e:ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }
    const changeSale = (e:ChangeEvent<HTMLInputElement>) => {
        setSale(e.target.value)
    }
    const changePercentForSale = (e:ChangeEvent<HTMLInputElement>) => {
        setPercentForSale(e.target.value)
    }

    const deleteThisPrice = (e:ChangeEvent<HTMLInputElement>) => {
        // deleteGroup({id:item.id})
        setDeleted(true)
    }

    const changeThisPrice = () => {
        updatePrice({
            id: item.id,
            title:title ? title : item.title,
            price:price ? price : item.price,
            period: period ? period : item.period,
            description: description ? description : item.description,
            sale: sale ? sale : item.sale,
            percentForSale: percentForSale ? percentForSale : item.percentForSale,
        })
    }


    return (
        <div className={classNames(cls.inputChange, mod,[classname] )} >
            <div>{index ? +index + 1 : ''}</div>
            <div>{item?.id ? item.id : `` }</div>
            <input
                value={title}
                onChange={(e) => changeTitle(e)}
                className={cls.input}
            />
            <input
                value={price}
                onChange={(e) => changePrice(e)}
                className={cls.input}
            />
            <input
                value={period}
                onChange={(e) => changePeriod(e)}
                className={cls.input}
            />
            <input
                value={description}
                onChange={(e) => changeDescription(e)}
                className={cls.input}
            />
            <input
                value={sale}
                onChange={(e) => changeSale(e)}
                className={cls.input}
            />
            <input
                value={percentForSale}
                onChange={(e) => changePercentForSale(e)}
                className={cls.input}
            />
            <Button
                classname={cls.btn}
                onClick={changeThisPrice}
            >
                обновить
            </Button>
            <Button
                classname={cls.btn}
                onClick={deleteThisPrice}
            >
                удалить
            </Button>
        </div>
    );
};

export default InputPrice;
