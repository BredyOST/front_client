'use client';
import React from 'react';
import cls from './postsForSearch.module.scss'
import PostsBlock from "@/app/components/searchPage/postBlock/postsBlock";
import {useAppSelector} from "@/app/redux/hooks/redux";
import {filteredCategoriesType} from "@/app/redux/entities/categories/categoriesSchema";

export interface IPostsForSearch {
    categories?:filteredCategoriesType[],
}

const PostsForSearch = ({categories}:IPostsForSearch) => {

    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    const [accessFree, setAccessFree] = React.useState<Boolean>(false)
    const [accessPay, setAccessPay] = React.useState<Boolean>(false)

    const currenDate = new Date();

    React.useEffect(() => {
        if (!stateAuth || !infoUser) return;

        let checkFree = false;
        let checkPay = false;

        if (infoUser?.categoriesFreePeriod?.length >= 1 && !infoUser?.endFreePeriod) {
            for (let item of infoUser?.categoriesFreePeriod) {
                if (currenDate.getTime() <= new Date(item.purchaseEndDate).getTime()) {
                    checkFree = true;
                    break;
                }
            }
        }
        if (infoUser?.categoriesHasBought?.length >= 1) {
            for (let item of infoUser?.categoriesHasBought) {
                if (currenDate.getTime() <= new Date(item.purchaseEndDate).getTime()) {
                    checkPay = true;
                    break;
                }
            }
        }

        setAccessFree(checkFree);
        setAccessPay(checkPay);
    }, [infoUser, stateAuth]);


    if (!stateAuth) {
        return null
    }

    // if (!accessFree && !accessPay) {
    //     return  <div className={cls.active}>Активные подписки отсутствуют.
    //         <Link className={cls.linkGo} href={'/dashboard/price'}> Оформить подписку</Link>
    //         <Link className={cls.linkGo} href={'/dashboard/profile'}> Перейти в профиль</Link>
    //     </div>
    // }
  
    return (
        <div className={cls.postsForSearch} >
            <div className={cls.looking}>
                {/*{infoUser && stateAuth && ((!infoUser?.activatedFreePeriod && infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length == 0) && (infoUser?.categoriesHasBought?.length == 0)) &&*/}
                {/*    <div className={cls.coverBlockNoAccess}>*/}
                {/*        <div className={cls.coverBtn}>*/}
                {/*            <Link href={navbarFirst[0].href} className={cls.btn}>Посмотреть тарифы</Link>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*}*/}
                {/*{infoUser && stateAuth && (accessPay || accessFree) && ((infoUser?.activatedFreePeriod && infoUser?.categoriesFreePeriod?.length >= 1) || (infoUser?.categoriesHasBought?.length >= 1)) ?*/}
                {/*    <PostsBlock/> : ''*/}
                {/*}*/}
                <PostsBlock categories={categories}/>
            </div>
        </div>
    );
};

export default PostsForSearch;