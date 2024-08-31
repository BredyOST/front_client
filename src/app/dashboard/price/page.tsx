import React from 'react';
import cls from './pricePage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import BlockBtnAdd from "@/app/components/pricePage/blockBtnAdd/blockBtnAdd";
import Cards from "@/app/components/pricePage/cards/cards";
import ListsCategory from "@/app/components/pricePage/listsCategory/listsCategory";


interface pageProps {
}
export const metadata = {
    title: 'Описание тарифов - клиенты.com',
    description: 'тарифы',
}

async function getData() {
    let prices = [];
    let categories = [];

    try {
        const pricesRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/prices/getAll`, { next: { revalidate: 420 }})
        if (pricesRes.ok) {
            const responseData = await pricesRes.json();
            if( responseData.length >= 1) prices = responseData
        } else {
            console.error('pricesRes API price request failed with status:', pricesRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }
        
    try {
        const categoriesRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/categories/getAll`, { next: { revalidate: 500 } })
        if (categoriesRes.ok) {
            const responseData = await categoriesRes.json();
            if( responseData.length  >= 1) categories = responseData
        } else {
            console.error('Categories  price API request failed with status:', categoriesRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }

    return { prices, categories };
}

const textLists = [
    {text: 'Вы находитесь в разделе оформления доступа к подписке.'},
    {text: 'Выберите интересующую вас категорию, тариф и произведите оплату через сертифицированный сервис..'},
    {text: 'После успешной оплаты вы получите доступ к заявкам и чек о совершенной операции'}
]

async function PricePage(props:pageProps) {
    const {} = props;

    const {
        prices,
        categories
    } = await getData();

    const filteredCategories = categories.filter((item:any) => item.show)

    return (
        <div className={classNames(cls.pricePage, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Тарифы на подписку</h1>
                        <div className={cls.coverLink}>
                            {textLists?.length >= 1  && textLists.map((item) =>
                                <div
                                    key={item?.text}
                                    className={cls.text}
                                >
                                    {item.text}
                                </div>
                                
                            )}
                        </div>
                    </div>
                    <div className={cls.categories}>
                        <BlockBtnAdd/>
                    </div>
                    <div className={cls.prices}>
                        {prices && prices.map((item:any) => (
                            <Cards
                                item = {item}
                                key={item.id}
                                categories={categories}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ListsCategory
                categories={filteredCategories}
            />
        </div>
    );
};

export default PricePage;