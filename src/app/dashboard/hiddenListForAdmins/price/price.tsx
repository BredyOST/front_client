'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './price.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAddNewPriceBlockMutation, useGetAllPricesMutation} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {parseCookies} from "nookies";
import InputPrice from "@/app/dashboard/hiddenListForAdmins/inputPrice/inputPrice";

interface priceProps {
    classname?: string;
}

const Price:FC<priceProps> = (props) => {
    const { classname } = props;
    const cookies = parseCookies();
    //ACTIONS FROM REDUX

    //STATES FROM REDUX
    const [createPrice, {data: requestPrice, error:errorPrice, isLoading: isLoadingPrice, isError:isErrorPrice}] = useAddNewPriceBlockMutation()
    const [getPrice, {data: requestGetPrice, error:errorGetPrice, isLoading: isLoadingGetPrice, isError:isErrorGetPrice}] = useGetAllPricesMutation()

    //USESTATE
    const [inputsPrice, setInputsPrice] = React.useState<any>({identificatorId:'', title: '', price: '', period:'', description:'',sale:'', percentForSale:''})
    const [showPrice, setShowPrice] = React.useState<boolean>(false)
    //USEREF

    //FUNCTIONS

    const addIdentidicatorId = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, identificatorId:e.target.value})
    }
    const addTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, title:e.target.value})
    }
    const addPrice = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, price:e.target.value})
    }
    const addPeriod = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, period:e.target.value})
    }
    const addDescription = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, description:e.target.value})
    }
    const addSale = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, sale:e.target.value})
    }
    const addPercentForSale = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputsPrice({...inputsPrice, percentForSale:e.target.value})
    }

    const sendToCreate = () => {
        createPrice({
            identificatorId: inputsPrice.identificatorId,
            title:inputsPrice.title,
            price: inputsPrice.price,
            period: inputsPrice.period,
            description: inputsPrice.description,
            sale: inputsPrice.sale == 'true' ? true : false,
            percentForSale: inputsPrice.percentForSale,
        })
    }

    const showPrices = () => {
        setShowPrice(prevState => !prevState)
        if(cookies  && cookies._z) {
            getPrice(cookies)
        }
    }

    return (
        <div className={classNames(cls.price, {},[classname] )} >
            <div className={cls.section}>
                <h2 className={cls.mainTitle}>Создать price</h2>
                <form action="admin/addCategory" className={cls.form}>
                    <div className={cls.coverInput}>
                        <div className={cls.label}>идентификатор id</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addIdentidicatorId(e)}
                            value={inputsPrice.identificatorId}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите идентификатор id'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>название</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addTitle(e)}
                            value={inputsPrice.title}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите название'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>цена</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPrice(e)}
                            value={inputsPrice.price}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите цену'
                        >
                        </Input>
                    </div>

                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>период</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPeriod(e)}
                            value={inputsPrice.period}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='период'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>описание</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addDescription(e)}
                            value={inputsPrice.description}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='описание'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>скидка</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addSale(e)}
                            value={inputsPrice.sale}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='скидка true, false'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>процент скидки</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPercentForSale(e)}
                            value={inputsPrice.percentForSale}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='процент скидки'
                        >
                        </Input>
                    </div>
                </form>
            </div>
            <div className={cls.coverBtn}>
                <Button
                    classname={cls.btn}
                    onClick={sendToCreate}
                >
                    Cоздать прайс
                </Button>
                <Button
                    classname={cls.btn}
                    onClick={showPrices}
                >
                    Показать прайс
                </Button>
            </div>
            {showPrice &&
                <div className={cls.mainBlock}>
                    <div className={cls.titles}>
                        <div className={cls.head}>№</div>
                        <div className={cls.head}>id группы</div>
                        <div className={cls.head}>название</div>
                        <div className={cls.head}>прайс</div>
                        <div className={cls.head}>период</div>
                        <div className={cls.head}>описание</div>
                        <div className={cls.head}>скидка</div>
                        <div className={cls.head}>процент скидки</div>
                        <div className={cls.head}>сохр</div>
                        <div className={cls.head}>удал</div>
                    </div>
                    {isLoadingGetPrice
                        && (
                            <Loader
                                classname="color-dark"
                            />
                        )}
                    <div className={cls.cover}>
                        {requestGetPrice != undefined && requestGetPrice && requestGetPrice.length && requestGetPrice.map((item:any, index: string | number) => (
                            <div
                                className={cls.list}
                                key={item.id}

                            >
                                <InputPrice
                                    index={index}
                                    item={item}
                                />
                            </div>
                        ))
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Price;
