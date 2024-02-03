import React from 'react';
import cls from './searchPage.module.scss'
import { classNames, Mods } from "@/app/components/shared/lib/classNames/className";
import { Select } from "@/app/components/shared/ui/Select/Select";
import Tabs from "@/app/components/shared/ui/tabs/tabs";
import SearchBlock from "@/app/dashboard/search/searchBlock/searchBlock";
import Social from "@/app/dashboard/search/social/social";
import CityBlock from "@/app/dashboard/search/cityBlock/cityBlock";
import PostsForSearch from "@/app/dashboard/search/postsForSearch/postsForSearch";
import {Metadata} from "next";


interface pageProps {
}


export const metadata: Metadata = {
    title: `${process.env['NEXT_PUBLIC_TITLE_WEBSITE']}`,
    description: 'Cервис для поиска потенциальных клиентов в социальных сетях, блогах,чатах, форумах, досках объявлений, фриланс-биржах: ВКонтакте, Telegram, Facebook, Одноклассники, Instagram, Twitter, ЖЖ и др. Мы предлагаем готовый проект для поиска клиентов, поиска заказов',
    keywords: 'Клиенты, клиенты, Клиенты.com, клиенты.com, клиенты ком, клиенты.ком, Клиенты ком, Клиенты.ком,  ' +
        'поиск лидов, поиск клиентов, лидогенерация, найти клиента, мониторинг соцсетей, мониторинг телеграм, ' +
        'мониторинг вк, отслеживание групп в соцсетях, поиск учеников, реклама, таргетированная реклама, таргет' +
        'услуги по поиску клиентов, агентские услуги по поиску клиентов, сервис поиска клиентов, где взять клиентов' +
        'найду клиента, как найти клиентов, где найти клиентов, рекламное агентство, ищу заявки, клиенты для бизнеса, профи ру, авито' +
        'где искать учеников, ученики ищущие репетитора, где искать учеников на репетиторство, продвижение это, реклама в интернете заказать, рекламная компания это, заказать рекламу, заказать контекстную рекламу',
    metadataBase: new URL(`${process.env['NEXT_PUBLIC_CLIENT_URL']}`),
    openGraph: {
        locale:'ru',
        title: 'Клиенты.com',
        url:'https://xn--e1affem4a4d.com/dashboard/price',
        description: 'Сервис для поиска клиентов',
        images:'',
        siteName:'Клиенты.com'

    },
    verification: {
        google: 'google',
        yandex: 'yandex',
        yahoo: 'yahoo',
    }
}


async function getData() {

    let categories;

    try {
        const categoriesRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/categories/getAll`, { next: { revalidate: 500 } })
        if (categoriesRes.ok) {
            categories = await categoriesRes.json();
        } else {
            console.error('Categories  search API request failed with status:', categoriesRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }

    return {categories};

}

async function SearchPage(props: pageProps) {

    const { } = props;
    const { categories} = await getData();

    return (
        <div className={classNames(cls.searchPage, {}, [])} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Поиск клиентов</h1>
                    </div>
                    <div className={cls.filters}>
                        <div className={cls.coverSearchBlock}>
                            <Select
                                classname={cls.select}
                                categories={categories}
                            />
                            <Social
                                classname={cls.social}
                            />
                            <Tabs
                                classname={cls.tabs}
                                title="Количество постов"
                            />
                        </div>
                        <div className={cls.searchWords}>
                            <div className={cls.chooseFilter}>
                                <CityBlock />
                            </div>
                            <div className={cls.chooseFilter}>
                                <SearchBlock />
                            </div>
                        </div>
                        <PostsForSearch/>
                    </div>
                </div>
            </div>
            {/*{ isLoadingTutors*/}
            {/*    && (*/}
            {/*        <Loader*/}
            {/*            classname="color-dark"*/}
            {/*        />*/}
            {/*    )}*/}
        </div>
    );
};

export default SearchPage;
