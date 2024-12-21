import React from 'react';
import cls from './pricePage.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import BlockBtnAdd from "@/app/components/pricePage/blockBtnAdd/blockBtnAdd";
import Cards from "@/app/components/pricePage/cards/cards";
import ListsCategory from "@/app/components/pricePage/listsCategory/listsCategory";
import {filteredCategoriesType} from "@/app/redux/entities/categories/categoriesSchema";
import {pricesType} from "@/app/redux/entities/prices/pricesSchema";
import {PRICE_PAGE_TITLE} from "@/shared/constants/index.constants";
import {textLists} from "@/app/dashboard/price/constants/pricePageConst";
import {TextListsType} from "@/shared/types/types";

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



async function PricePage() {

    const {prices, categories} = await getData();

    const filteredCategories:filteredCategoriesType[] = categories?.filter((item:filteredCategoriesType) => item?.show)

    return (
        <div className={classNames(cls.pricePage, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>{PRICE_PAGE_TITLE}</h1>
                        <div className={cls.coverLink}>
                            {textLists?.length >= 1  && textLists?.map((item:TextListsType) =>
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
                        {prices && prices.map((item:pricesType) => (
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