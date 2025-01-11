import React, {FC} from 'react';
import cls from './ProfilePage.module.scss'
import ChangeName from "@/app/components/profilePage/changeName/changeName";
import ChangeEmail from "@/app/components/profilePage/changeEmail/changeEmail";
import ChangePhone from "@/app/components/profilePage/changePhone/changePhone";
import ChangePassword from "@/app/components/profilePage/changePassword/changePassword";
import BlockCategory from "@/app/components/profilePage/blockCategory/blockCategory";
import {AppLink} from "@/ui/appLink/appLink";
import LogOutBtn from "@/app/components/profilePage/logOutBtn/logOutBtn";
import {PROFILE_PAGE_TITLE} from "@/shared/constants/index.constants";
import BlockActiveMoney from "@/app/components/profilePage/blockActiveMoney/blockActiveMoney";
import RefLink from "@/app/components/profilePage/refLink/refLink";

export const metadata = {
    title: 'Профиль пользователя - клиенты.com',
    description: 'профиль',
}

const ProfilePage = () => {

    return (
        <div className={cls.ProfilePage} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.coverLink}>
                            <h1 className={cls.mainTitle}>{PROFILE_PAGE_TITLE}</h1>
                            <div className={cls.linkCover}>
                                <AppLink
                                    classname={cls.link}
                                    href='/dashboard/search'>
                                    Перейти к заявкам
                                </AppLink>
                                <LogOutBtn
                                    classname={cls.linkTwo}
                                >
                                    Выйти из профиля
                                </LogOutBtn>
                            </div>
                        </div>
                        <ChangeName/>
                        <ChangePhone/>
                        <ChangeEmail/>
                        <ChangePassword/>
                        <BlockActiveMoney/>
                        <RefLink/>
                        {/*<div className={cls.categoriesCover}>*/}
                        {/*    <h3 className={cls.subTitle}>Активные подписки</h3>*/}
                        {/*    <BlockCategory/>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  ProfilePage;
