'use client';
import React, {FC} from 'react';
import cls from './postsForSearch.module.scss'
import Link from "next/link";
import {navbarFirst} from "@/app/components/header/header";
import PostsBlock from "@/app/dashboard/search/postBlock/postsBlock";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {useAppSelector} from "@/app/redux/hooks/redux";

interface postsForSearchProps {
    classname?: string;
    tutorsPosts?:any
    naniesPosts?:any
    test?: any
    date: Date,
}
const counterSkeleton = [
    1,2,3,4,5
]

interface PostsDictionary {
    [key: string]: any; // Здесь вы можете уточнить тип данных, если он у вас есть, вместо `any`
}


const PostsForSearch:FC<postsForSearchProps> = (props) => {
    const {
        classname,
        tutorsPosts,
        naniesPosts,
        test,
        date,
    } = props;
    
    //ACTIONS FROM REDUX

    //STATES FROM REDUX
    // states from redux
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    const {chosenCategory, keyWords} = useAppSelector(state => state.searchParams)

    const chosenCategoryID = chosenCategory?.id;
    const postsRepository:PostsDictionary = {
        '1': tutorsPosts,
        '2': naniesPosts,
        '4': test,
    };
    // Теперь, используя ID выбранной категории, получаем посты для этой категории
    const categoryPosts = chosenCategoryID ? postsRepository[String(chosenCategoryID)] : null;

    //USESTATE

    //USEREF
    
    //FUNCTIONS

    if (!stateAuth) {
        return <div className={cls.ifNotAith}>Необходимо авторизоваться</div>
    }

    if (categoryPosts == null) {
        // return <div className={cls.ifNotAith}>Необходимо авторизоваться</div>
    }

    if (!infoUser?.categoriesHasBought?.length && infoUser?.categoriesFreePeriod[0]?.purchaseEndDate) {
        if ( new Date().getTime() > new Date(infoUser.categoriesFreePeriod[0].purchaseEndDate).getTime()) {
            return null
        }
    }


    return (
        <div className={classNames(cls.postsForSearch, {},[classname] )} >
            <div className={cls.looking}>
                <div className={cls.block}>
                    <div className={cls.blockItem}>Категория</div>
                    <div className={cls.blockItem}>Дата</div>
                    <div className={cls.blockItem}>Ссылка на пользователя</div>
                    <div className={cls.blockItem}>Сообщение / ссылка на пост</div>
                    <div className={cls.blockItem}>Город</div>
                </div>
                {infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && !infoUser?.categoriesFreePeriod?.length) && (!infoUser?.categoriesHasBought?.length)) &&
                    <div className={cls.coverBlockNoAccess}>
                        <div className={cls.titleAboutNoAccess}>Для осуществления поиска, необходимо наличие активной подписки или бесплатного тестового периода </div>
                        <div className={cls.coverBtn}>
                            <Link href={navbarFirst[0].href} className={cls.btn}>Посмотреть тарифы</Link>
                        </div>
                    </div>
                }
                {/*{stateAuth && infoUser && (!keyWords || !keyWords?.length) && ((infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length) || (!infoUser?.categoriesHasBought?.length)) &&*/}
                {/*    <div className={cls.titleAboutNoAccess}>Для осуществления поиска, выберите фильтры и введите ключевые слова </div>*/}
                {/*}*/}
                {/*{isLoadingTutors && counterSkeleton.map((item) => (*/}
                {/*    <SkeletonSearchPage*/}
                {/*        key={item}*/}
                {/*    />*/}
                {/*))}*/}
                {infoUser && stateAuth && ((infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length) || (infoUser?.categoriesHasBought?.length)) ?
                    <PostsBlock
                        posts={categoryPosts}
                        date = {date}
                    />
                    :''
                }
            </div>
        </div>
    );
};

export default PostsForSearch;