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
}
const counterSkeleton = [
    1,2,3,4,5
]

const PostsForSearch:FC<postsForSearchProps> = (props) => {
    const {classname} = props;
    
    //ACTIONS FROM REDUX

    //STATES FROM REDUX
    // states from redux
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)

    //USESTATE

    //USEREF
    
    //FUNCTIONS

    if (!stateAuth) {
        return null
    }

    if (!infoUser?.categoriesHasBought?.length && infoUser?.categoriesFreePeriod[0]?.purchaseEndDate) {
        if ( new Date().getTime() > new Date(infoUser.categoriesFreePeriod[0].purchaseEndDate).getTime()) {
            return null
        }
    }

    return (
        <div className={classNames(cls.postsForSearch, {},[classname] )} >
            <div className={cls.looking}>
                {infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && !infoUser?.categoriesFreePeriod?.length) && (!infoUser?.categoriesHasBought?.length)) &&
                    <div className={cls.coverBlockNoAccess}>
                        <div className={cls.titleAboutNoAccess}>Для осуществления поиска, необходимо наличие активной подписки или бесплатного тестового периода </div>
                        <div className={cls.coverBtn}>
                            <Link href={navbarFirst[0].href} className={cls.btn}>Посмотреть тарифы</Link>
                        </div>
                    </div>
                }
                {infoUser && stateAuth && ((infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length) || (infoUser?.categoriesHasBought?.length)) ?
                    <PostsBlock/> :''
                }
            </div>
        </div>
    );
};

export default PostsForSearch;