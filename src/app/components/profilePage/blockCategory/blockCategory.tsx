'use client';
import cls from './blockCategory.module.scss'
import React from "react";
import {useAppSelector} from "@/app/redux/hooks/redux";
import BlockElements from "@/app/components/profilePage/blockElements/BlockElements";
import BlockNotifications from "@/app/components/profilePage/blockNotifications/blockNotifications";
import {CategoriesBoughtType, NotificationsType, UserCategoriesType} from "@/app/types/pageTypes/profileTypes";

const BlockCategory = () => {

    // constants dispatch = useAppDispatch()
    const [userCategories, setUserCategories] = React.useState<CategoriesBoughtType[]>([])
    const [userCategoriesFree, setUserCategoriesFree] = React.useState<UserCategoriesType[]>([])
    const [userCategoriesNotifications, setUserCategoriesNotifications] = React.useState<NotificationsType[]>([])
    const [userCategoriesFreeNotifications, setUserCategoriesFreeNotifications] = React.useState<NotificationsType[]>([])

    // constants [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    // constants [
    //     addFreeNotification, {data: requestFreeNotification, error: errorFreeNotification, isError: isErrorFreeNotification,  isLoading: loadingFreeNotification}
    // ] = useActivateFreeNotificationMutation()
    // constants [
    //     payNotification, {data: requestPayNotifications, error: errorPayNotifications, isError: isErrorPayNotifications,  isLoading: loadingPayNotifications}
    // ] = usePayNotificationsMutation();

    // constants {addInfoForCommonError} = indicatorsNotifications;

    const {data:infoUser} = useAppSelector(state => state.auth)

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