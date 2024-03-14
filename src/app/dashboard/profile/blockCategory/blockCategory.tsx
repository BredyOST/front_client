'use client';
import React, { ChangeEvent, FC } from "react";
import cls from './blockCategory.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {
    useActivateFreeNotificationMutation,
    useGetMeMutation,
    usePayNotificationsMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import { Input } from "@/app/components/shared/ui/input/Input";
interface blockCategoryProps {
    classname?: string;
}

const BlockCategory:FC<blockCategoryProps> = (props) => {

    const dispatch = useAppDispatch()
    const [userCategories, setUserCategories] = React.useState<any>(null)
    const [userCategoriesFree, setUserCategoriesFree] = React.useState<any>(null)
    const [userCategoriesNotifications, setUserCategoriesNotifications] = React.useState<any>(null)
    const [userCategoriesFreeNotifications, setUserCategoriesFreeNotifications] = React.useState<any>(null)
    const [days, setDays] = React.useState<string>(``)
    // RTK
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    const [
        addFreeNotification, {data: requestFreeNotification, error: errorFreeNotification, isError: isErrorFreeNotification,  isLoading: loadingFreeNotification}
    ] = useActivateFreeNotificationMutation()
    const [
        payNotification, {data: requestPayNotifications, error: errorPayNotifications, isError: isErrorPayNotifications,  isLoading: loadingPayNotifications}
    ] = usePayNotificationsMutation();

    //ACTIONS FROM REDUX

    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
    const {addInfoForCommonError} = indicatorsNotifications;
    // STATES FROM REDUX
    const {data:infoUser} = useAppSelector(state => state.auth)

    //USESTATE

    //USEREF

    //FUNCTIONS

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
    const activateNotification = (item:any) => {
        if (!infoUser?.isActivatedPhone) {
            dispatch(addInfoForCommonError({message: 'Не подтвержден номер телефона'}))
        }
        payNotification({
            item:item,
            days: days,
        })

        // const obj = {
        //     category: item.id,
        //     categoryName: item.name,
        //     purchaseBuyDate: new Date(),
        //     purchaseEndDate: item.purchaseEndDate,
        //     purchasePeriod: 2,
        //     freePeriod: true,
        // }

        // addFreeNotification(obj).then((result) => {
        //     if(result && 'data' in result && result?.data?.text == `Бесплатный период активирован`) {
        //         if (cookies && cookies._z) {
        //             getInfoUser(cookies).then((result) => {
        //                 if ('data' in result && result.data) {
        //                     dispatch(addInfoUser(result.data));
        //                     dispatch(addMainAdminRole(result.data.isMainAdmin));
        //                     dispatch(addAdminRole(result.data.isAdmin));
        //                     dispatch(addAuthStatus(true));
        //                     location.reload()
        //                 }
        //             });
        //
        //         }
        //     }
        // })
    }


    const changeDays = (e:any) => {
        setDays(e.target.value)

    }

    React.useEffect(() => {
        if (infoUser && infoUser?.categoriesHasBought && infoUser?.categoriesHasBought?.length >= 1) {
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
            <div className={cls.grid}>
                {userCategories?.length >= 1 && userCategories.map((item:any) => (
                    new Date().getTime() < new Date(item.purchaseEndDate).getTime() &&
                    <div key={item.id} className={cls.blockCategory}>
                        <div className={cls.blockInfo}>
                            <div className={cls.categoryName}>{item?.name || item?.category}</div>
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
                                    <div className={cls.top}>
                                        <h2 className={cls.title}>Уведомления в телеграмме</h2>
                                        {infoUser && infoUser?.notificationsHasBought?.find((elem:any) => elem.id == item.id)
                                            ? <div className={cls.textVerify}>Подключен<VerifySvg className={cls.verifySvg}/></div>
                                            : <div className={cls.textVerify}>Не подключен<NotVerifySvg className={cls.notVerifySvg}/></div>
                                        }
                                    </div>
                                    {infoUser && !infoUser?.notificationsHasBought?.find((elem:any) => elem.id == item.id) &&
                                    <div className={cls.btnCover}>
                                        <Button
                                            classname={cls.btn}
                                            onClick={() => activateNotification(item)}
                                        >
                                            Подключить
                                        </Button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {userCategoriesFree?.length >= 1 && userCategoriesFree.map((item:any) => (
                    new Date().getTime() < new Date(item.purchaseEndDate).getTime() &&
                    <div key={item.id} className={cls.blockCategory}>
                        <div className={cls.blockInfo}>
                            <div className={cls.categoryName}>{item?.name || item?.category}</div>
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
                                    <div className={cls.top}>
                                        <h2 className={cls.title}>Уведомления в телеграмме</h2>
                                        {infoUser && infoUser?.notificationsFreePeriod?.find((elem:any) => elem.id == item.id)
                                            ? <div className={cls.textVerify}>Подключен<VerifySvg className={cls.verifySvg}/></div>
                                            : <div className={cls.textVerify}>Не подключен<NotVerifySvg className={cls.notVerifySvg}/></div>
                                        }
                                        {/*<div>*/}
                                        {/*    <div>Доступный период: до окончания пробного периода</div>*/}
                                        {/*</div>*/}
                                    </div>
                                    {infoUser && !infoUser?.notificationsFreePeriod?.find((elem:any) => elem.id == item.id) &&
                                    <div className={cls.btnCover}>
                                        <Button
                                            classname={cls.btn}
                                            onClick={() => activateNotification(item)}
                                        >
                                            Подключить
                                        </Button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className={cls.titleNotifications}>Уведомления</h2>
            <div className={cls.grid}>
                {userCategoriesNotifications?.length >= 1 && userCategoriesNotifications.map((item:any) => (
                  new Date().getTime() < new Date(item.purchaseEndDate).getTime() &&
                  <div key={item.id} className={cls.blockCategory}>
                      <div className={cls.blockInfo}>
                          <div className={cls.categoryName}>{item?.name || item?.category}</div>
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
                {userCategoriesFreeNotifications?.length >= 1 && userCategoriesFreeNotifications.map((item:any) => (
                  new Date().getTime() < new Date(item.purchaseEndDate).getTime() &&
                  <div key={item.id} className={cls.blockCategory}>
                      <div className={cls.blockInfo}>
                          <div className={cls.categoryName}>{item?.name || item?.category}</div>
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
                          </div>
                      </div>
                  </div>
                ))}
            </div>
            { loadingFreeNotification
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
            { loadingPayNotifications
              && (
                  <Loader
                      classname="color-dark"
                  />
              )}
        </div>
    );
};

export default BlockCategory;