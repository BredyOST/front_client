import React, {FC} from 'react';
import cls from "@/app/components/profilePage/blockCategory/blockCategory.module.scss";
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
import Link from "next/link";
import {formatDateToRussian} from "@/app/components/shared/lib/formatedFunction/formatedFunction";
import {User, UserAuthorization} from "@/app/redux/entities/auth/authSchema";
import {CategoriesBoughtType, NotificationsType} from "@/app/types/pageTypes/profileTypes";

interface IBlockElements {
    userCategories?: CategoriesBoughtType[]
    infoUser: UserAuthorization | null
    indicator: number
}


const BlockElements = ({  userCategories, infoUser, indicator}:IBlockElements) => {

    if(userCategories && userCategories.length < 1 || !userCategories || !infoUser) return null

    return (

        <>
            { userCategories?.length >= 1 && userCategories.map((item:CategoriesBoughtType) => (
                new Date().getTime() < new Date(item.purchaseEndDate).getTime() &&
                <div key={item.id} className={cls.blockCategory}>
                    <div className={cls.blockInfo}>
                        <div className={cls.categoryName}>{item?.category}</div>
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
                                {indicator == 1 &&
                                    <div className={cls.top}>
                                        <h2 className={cls.title}>Уведомления в телеграмме</h2>
                                        {infoUser && infoUser?.notificationsHasBought?.find((elem:NotificationsType) => elem.id == item.id)
                                            ? <div className={cls.textVerify}>Подключен<VerifySvg className={cls.verifySvg}/></div>
                                            : <div className={cls.textVerify}>Не подключен<NotVerifySvg className={cls.notVerifySvg}/></div>
                                        }
                                    </div>
                                }
                                {indicator == 1 &&
                                    infoUser && !infoUser?.notificationsHasBought?.find((elem:NotificationsType) => elem.id == item.id) &&
                                    <div className={cls.btnCover}>
                                        <Link className={cls.btn} href="/dashboard/notifications">Подключить</Link>
                                    </div>
                                }
                                {indicator == 2 &&
                                    <div className={cls.top}>
                                        <h2 className={cls.title}>Уведомления в телеграмме</h2>
                                        {infoUser && infoUser?.notificationsFreePeriod?.find((elem:NotificationsType) => elem.id == item.id)
                                            ? <div className={cls.textVerify}>Подключен<VerifySvg className={cls.verifySvg}/></div>
                                            : <div className={cls.textVerify}>Не подключен<NotVerifySvg className={cls.notVerifySvg}/></div>
                                        }
                                    </div>
                                }
                                {indicator == 2 && infoUser && !infoUser?.notificationsFreePeriod?.find((elem:NotificationsType) => elem.id == item.id) &&
                                    <div className={cls.btnCover}>
                                        <Link className={cls.btn} href="/dashboard/notifications">Подключить</Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default BlockElements;