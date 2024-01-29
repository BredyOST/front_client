import React from 'react';
import cls from './pricePage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import ListsCategory from "@/app/dashboard/price/listsCategory/listsCategory";
import Cards from "@/app/dashboard/price/cards/cards";
import BlockBtnAdd from "@/app/dashboard/price/blockBtnAdd/blockBtnAdd";

interface pageProps {
}
export const metadata = {
    title: 'Price',
    description: 'Тарифы в сервисе Клиенты.com',
}

async function getData() {
    let prices = [];
    let categories = [];

    try {
        const pricesRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/prices/getAll`, { next: { revalidate: 420 }})
        if (pricesRes.ok) {
            const responseData = await pricesRes.json();
            if( responseData.length) prices = responseData
        } else {
            console.error('Categories API request failed with status:', pricesRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }
        
    try {
        const categoriesRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/categories/getAll`, { next: { revalidate: 420}})
        if (categoriesRes.ok) {
            const responseData = await categoriesRes.json();
            if( responseData.length) categories = responseData
        } else {
            console.error('Categories API request failed with status:', categoriesRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }

    return { prices, categories };
}

async function PricePage(props:pageProps) {
    const {} = props;

    const {
        prices,
        categories
    } = await getData();

    return (
        <div className={classNames(cls.pricePage, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Тарифы</h1>
                    </div>
                    <div className={cls.categories}>
                        <div className={cls.notification}>
                            <div className={cls.notificationText}>
                                Настрой уведомления на телефон в профиле после оформления подписки и получай все самое актуальное по выбранным категориям, без необходимости посещения сайта
                            </div>
                            {/*<div className={cls.coverGo}>*/}
                            {/*    <Link className={cls.btn} href='/dashboard/notification'>Настроить уведомления</Link>*/}
                            {/*</div>*/}
                        </div>
                        <BlockBtnAdd/>
                    </div>
                    <div className={cls.prices}>
                        {prices && prices.map((item:any) => (
                            <Cards
                                item = {item}
                                key={item.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ListsCategory
                categories={categories}
            />
        </div>
    );
};

export default PricePage;