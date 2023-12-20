import React from 'react';
import cls from './searchPage.module.scss'
import { classNames, Mods } from "@/app/components/shared/lib/classNames/className";
import {Select} from "@/app/components/shared/ui/Select/Select";
import Tabs from "@/app/components/shared/ui/tabs/tabs";
import SearchBlock from "@/app/dashboard/search/searchBlock/searchBlock";
import Social from "@/app/dashboard/search/social/social";
import CityBlock from "@/app/dashboard/search/cityBlock/cityBlock";
import PostsForSearch from "@/app/dashboard/search/postsForSearch/postsForSearch";


interface pageProps {
}

const forTypes = [
    {id:1, text:'все'},
    {id:2, text:'пост'},
    {id:3, text:'комментарий'},
]

async function getData() {

    let categories;
    let tutors;
    let nannies;
    let allPosts;


    // try {
    //     const allPostsReq = await fetch('http://localhost:7777/posts/getAll', { next: { revalidate: 120}})
    //     allPosts = await allPostsReq.json();
    // } catch (err) {
    //     console.error('Error fetching categories:', err);
    // }


    try {
        const categoriesRes = await fetch(`${process.env['API_URL']}/categories/getAll`, { next: { revalidate: 120}})
        categories = await categoriesRes.json();
    } catch (err) {
        console.error('save error Redis:', err);
    }

    try {
        const tutorsReq = await fetch(`${process.env['API_URL']}/tutors/getPostForStatic`, {next: {revalidate: 420}})
        // if (!tutorsReq.ok) {
        //     throw new Error('Failed to fetch data')
        // }
        tutors = await tutorsReq.json();
    } catch (err) {
        console.error('Error fetching prices:', err);
    }

    try {
        const nanniesReq  = await fetch(`${process.env['API_URL']}/nannies/getPostForStatic`,{next:{revalidate:420}})
        nannies = await nanniesReq.json();
    } catch (err) {
        console.error('Error fetching categories:', err);
    }

    return { tutors, nannies, categories, allPosts };

}

async function SearchPage(props:pageProps) {

    const {} = props;
    const { categories, nannies, tutors, allPosts} = await getData();
    const date = new Date();

    return (
        <div className={classNames(cls.searchPage, {}, [])} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Поиск клиентов</h1>
                    </div>
                    <div className={cls.filters}>
                        <div className={cls.header}>
                            <div className={cls.selectCategory}>
                                <Select
                                    classname={cls.select}
                                    title={'Выбранная категория для поиска'}
                                    categories = {categories}
                                />
                            </div>
                            <Social
                                classname={cls.social}
                                title="Источник данных"
                            />
                            <Tabs
                                classname={cls.tabs}
                                title="Количество постов"
                            />
                        </div>
                        <div className={cls.chooseFilter}>
                            <CityBlock/>
                        </div>
                        <div className={cls.chooseFilter}>
                            <SearchBlock/>
                        </div>
                        <PostsForSearch
                            tutorsPosts = {tutors}
                            naniesPosts= {nannies}
                            test = {allPosts}
                            date = {date}
                        />
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
