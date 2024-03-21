import React from 'react';
import cls from './notificztions.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import ListsCategory from "@/app/dashboard/price/listsCategory/listsCategory";
import Cards from "@/app/dashboard/price/cards/cards";
import BlockBtnAdd from "@/app/dashboard/price/blockBtnAdd/blockBtnAdd";
import NotificationsCards from "@/app/dashboard/notifications/notificationsCards/notificationsCards";
import Link from "next/link";

interface pageProps {
}
export const metadata = {
    title: 'Тарифы уведомлений - клиенты.com',
    description: 'тарифы уведомлений',
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

async function NotificationsPage(props:pageProps) {
    const {} = props;

    const {
        prices,
        categories
    } = await getData();

    const categ = categories.filter((item:any) => item.show)

    return (
        <div className={classNames(cls.pricePage, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Тарифы на уведомления</h1>
                        <div className={cls.coverLink}>
                            <div className={cls.text}>Вы находитесь в разделе подключения подписки для уведомлений в телеграмме.</div>
                            <div className={cls.text}>Вы можете подключить уведомления в телеграмм чате без оформления основной подписки для доступа через сайт в разделе <Link className={cls.link} href={'/dashboard/price'}>“тарифы на сайте“</Link>.</div>
                        </div>
                    </div>
                    <div className={cls.categories}>
                        <BlockBtnAdd
                            categories={categ}
                            activeWindow={`2`}
                        />
                    </div>
                    <div className={cls.prices}>
                        {prices && prices.map((item:any) => (
                            <NotificationsCards
                                item = {item}
                                key={item.id}
                                categories={categories}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <ListsCategory
                categories={categ}
            />
        </div>
    );
};

export default NotificationsPage;