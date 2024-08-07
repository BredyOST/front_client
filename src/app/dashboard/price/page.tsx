import React from 'react';
import cls from './pricePage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import ListsCategory from "@/app/dashboard/price/listsCategory/listsCategory";
import Cards from "@/app/dashboard/price/cards/cards";
import BlockBtnAdd from "@/app/dashboard/price/blockBtnAdd/blockBtnAdd";
import Link from "next/link";

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

async function PricePage(props:pageProps) {
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
                        <h1 className={cls.mainTitle}>Тарифы на подписку</h1>
                        <div className={cls.coverLink}>
                            <div className={cls.text}>Вы находитесь в разделе оформления доступа к подписке.</div>
                            <div className={cls.text}>Выберите интересующую вас категорию, тариф и произведите оплату через сертифицированный сервис.</div>
                            <div className={cls.text}>После успешной оплаты вы получите доступ к заявкам и чек о совершенной операции.</div>
                            {/*<div className={cls.text}>Дополнительно или отдельно можно подписаться на уведомления в телеграмм канале, для этого переходите по ссылке к боту, нажмите для перехода на <Link className={cls.link} href={'https://t.me/com_client_acceess_to_chats_bot'}>“@com_client_acceess_to_chats_bot“</Link>.</div>*/}
                            {/*<div className={cls.text}>После перехода в чат бота, нажмите кнопку start и следуйте инструкциям для получения информации и ознакомления с тарифами</div>*/}
                        </div>
                    </div>
                    <div className={cls.categories}>
                        <BlockBtnAdd
                            categories={categ}
                        />
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
                categories={categ}
            />
        </div>
    );
};

export default PricePage;