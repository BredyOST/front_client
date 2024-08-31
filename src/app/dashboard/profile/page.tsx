import React, {FC} from 'react';
import cls from './ProfilePage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import ChangeName from "@/app/components/profilePage/changeName/changeName";
import ChangeEmail from "@/app/components/profilePage/changeEmail/changeEmail";
import ChangePhone from "@/app/components/profilePage/changePhone/changePhone";
import ChangePassword from "@/app/components/profilePage/changePassword/changePassword";
import Authorizations from "@/app/components/profilePage/authorizations/authorizations";
import BlockCategory from "@/app/components/profilePage/blockCategory/blockCategory";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import LogOutBtn from "@/app/components/profilePage/logOutBtn/logOutBtn";

export const metadata = {
    title: 'Профиль пользователя - клиенты.com',
    description: 'профиль',
}


interface pageProps {
}
export interface HidePassword {
    current: boolean,
    new:boolean,
    newTwo:boolean
}

const ProfilePage:FC<pageProps> = (props) => {
    const { } = props;

    return (
        <div className={classNames(cls.ProfilePage, {},[] )} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.coverLink}>
                            <h1 className={cls.mainTitle}>Профиль пользователя</h1>
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
                        <div className={cls.сategoriesCover}>
                            <h3 className={cls.subTitle}>Активные подписки</h3>
                            <BlockCategory/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  ProfilePage;
