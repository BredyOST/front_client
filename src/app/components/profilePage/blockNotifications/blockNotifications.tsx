import React from 'react';

import cls from "@/app/components/profilePage/blockCategory/blockCategory.module.scss";
import {formatDateToRussian} from "@/app/components/shared/lib/formatedFunction/formatedFunction";
import {NotificationsType} from "@/app/types/pageTypes/profileTypes";

interface IBlockNotifications {
    userNotifications?: NotificationsType[]
}


const BlockNotifications = ({userNotifications}:IBlockNotifications) => {

    if( userNotifications && userNotifications.length < 1 || !userNotifications) return null

    return (
        <>
            {userNotifications?.length >= 1 && userNotifications.map((item:NotificationsType) => (
                new Date().getTime() < new Date(item.purchaseEndDate).getTime() &&
                <div key={item.id} className={cls.blockCategory}>
                    <div className={cls.blockInfo}>
                        <div className={cls.categoryName}>{item?.category} ({item.chatList})</div>
                        <div className={cls.dates}>
                            <div className={cls.coverForDatesBuy}>
                                <h3 className={cls.dateBuy}>Дата активации:</h3>
                                <div className = {cls.time}>
                                    <div>{formatDateToRussian(item?.purchaseBuyDate)}</div>
                                </div>
                            </div>
                            <div className={cls.coverForDatesBuy}>
                                <h3 className={cls.dateBuy}>Действует до:</h3>
                                <div className = {cls.time}>
                                    <div>{formatDateToRussian(item?.purchaseEndDate)}</div>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BlockNotifications;