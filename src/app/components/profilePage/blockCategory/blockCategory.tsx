'use client';
import { FC } from "react";
import cls from './blockCategory.module.scss'
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
import Link from "next/link";
import React from "react";
import {useAppSelector} from "@/app/redux/hooks/redux";
import BlockElements from "@/app/components/profilePage/blockElements/BlockElements";
import BlockNotifications from "@/app/components/profilePage/blockNotifications/blockNotifications";
interface blockCategoryProps {
    classname?: string;
}

export type categoriesBoughtType = {
    category:string
    id:number
    price:string
    purchaseBuyDate:string
    purchaseEndDate:string
    purchasePeriod:number
    title:string
}

export type notificationsType = {
    id: number
    category: string
    purchaseBuyDate: string
    purchaseEndDate: string
    purchasePeriod: number
    chatList: string
}

type userCategoriesType = {
    category:string
    id:number
    price:string
    purchaseBuyDate:string
    purchaseEndDate:string
    purchasePeriod:number
    title:string
}
const BlockCategory:FC<blockCategoryProps> = (props) => {

    // constants dispatch = useAppDispatch()
    const [userCategories, setUserCategories] = React.useState<categoriesBoughtType[]>([])
    const [userCategoriesFree, setUserCategoriesFree] = React.useState<userCategoriesType[]>([])
    const [userCategoriesNotifications, setUserCategoriesNotifications] = React.useState<notificationsType[]>([])
    const [userCategoriesFreeNotifications, setUserCategoriesFreeNotifications] = React.useState<notificationsType[]>([])

    // constants [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    // constants [
    //     addFreeNotification, {data: requestFreeNotification, error: errorFreeNotification, isError: isErrorFreeNotification,  isLoading: loadingFreeNotification}
    // ] = useActivateFreeNotificationMutation()
    // constants [
    //     payNotification, {data: requestPayNotifications, error: errorPayNotifications, isError: isErrorPayNotifications,  isLoading: loadingPayNotifications}
    // ] = usePayNotificationsMutation();

    // constants {addInfoForCommonError} = indicatorsNotifications;

    const {data:infoUser} = useAppSelector(state => state.auth)

    function formatDateToRussian(dateString:string | Date) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const weekday = date.getDay();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const months = [
            "января", "февраля", "марта", "апреля",
            "мая", "июня", "июля", "августа",
            "сентября", "октября", "ноября", "декабря"
        ];

        const weekdays = [
            "вс", "пн", "вт",
            "ср", "чт", "пт", "сб"
        ];

        return `${weekdays[weekday]}, ${day} ${months[+month - 1]} ${year} г. ${hours}:${minutes}`;
    }

    React.useEffect(() => {
        if (infoUser && infoUser?.categoriesHasBought?.length >= 1) {
            setUserCategories(infoUser?.categoriesHasBought)
        }
        if (infoUser && infoUser?.activatedFreePeriod && !infoUser?.endFreePeriod && infoUser?.categoriesFreePeriod?.length >= 1) {
            setUserCategoriesFree(infoUser?.categoriesFreePeriod)
        }

        if (infoUser && infoUser?.notificationsHasBought && infoUser?.notificationsHasBought?.length >= 1) {
            setUserCategoriesNotifications(infoUser?.notificationsHasBought)
        }
        if (infoUser && infoUser?.notificationsFreePeriod && !infoUser?.endFreePeriodNotification && infoUser?.notificationsFreePeriod?.length >= 1) {
            setUserCategoriesFreeNotifications(infoUser?.notificationsFreePeriod)
        }
    },[infoUser])


    return (
        <div className={cls.categories}>
            {
                (userCategories?.length > 1 || userCategoriesFree?.length > 1) &&
                <div className={cls.grid}>
                    <BlockElements
                        indicator = {1}
                        userCategories = {userCategories}
                        infoUser = {infoUser}
                    />
                    <BlockElements
                        indicator = {1}
                        userCategories = {userCategoriesFree}
                        infoUser = {infoUser}
                    />
                </div>
            }
            <h2 className={cls.titleNotifications}>Уведомления</h2>
            { (userCategoriesNotifications?.length > 1 || userCategoriesFreeNotifications?.length > 1) &&
                <div className={cls.grid}>
                    <BlockNotifications
                        userNotifications={userCategoriesNotifications}
                    />
                    <BlockNotifications
                        userNotifications={userCategoriesFreeNotifications}
                    />
                </div>
            }
            {/*{ loadingFreeNotification*/}
            {/*    && (*/}
            {/*        <Loader*/}
            {/*            classname="color-dark"*/}
            {/*        />*/}
            {/*    )}*/}
            {/*{ loadingPayNotifications*/}
            {/*  && (*/}
            {/*      <Loader*/}
            {/*          classname="color-dark"*/}
            {/*      />*/}
            {/*  )}*/}
        </div>
    );
};

export default BlockCategory;