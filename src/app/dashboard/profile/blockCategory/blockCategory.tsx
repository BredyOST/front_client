'use client';
import React, {FC} from 'react';
import cls from './blockCategory.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useActivateFreeNotificationMutation, useGetMeMutation} from "@/app/redux/entities/requestApi/requestApi";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
interface blockCategoryProps {
    classname?: string;
}

const BlockCategory:FC<blockCategoryProps> = (props) => {

    const { classname } = props;
    const cookies = getThisCookie();
    const dispatch = useAppDispatch()

    // RTK
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    const [
        addFreeNotification, {data: requestFreeNotification, error: errorFreeNotification, isError: isErrorFreeNotification,  isLoading: loadingFreeNotification}
    ] = useActivateFreeNotificationMutation()

    //ACTIONS FROM REDUX

    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
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
        const obj = {
            category: item.id,
            categoryName: item.name,
            purchaseBuyDate: new Date(),
            purchaseEndDate: item.purchaseEndDate,
            purchasePeriod: 2,
            freePeriod: true,
        }

        addFreeNotification(obj).then((result) => {
            if(result && 'data' in result && result?.data?.text == `Бесплатный период активирован`) {
                if (cookies && cookies._z) {
                    getInfoUser(cookies).then((result) => {
                        if ('data' in result && result.data) {
                            dispatch(addInfoUser(result.data));
                            dispatch(addMainAdminRole(result.data.isMainAdmin));
                            dispatch(addAdminRole(result.data.isAdmin));
                            dispatch(addAuthStatus(true));
                            location.reload()
                        }
                    });

                }
            }
        })
    }

    return (
        <div className={cls.categories}>
            {/*{infoUser && infoUser?.activatedFreePeriod && !infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length && <h3 className={cls.titleFree}>Подписки пробного периода</h3>}*/}
            <div className={cls.grid}>
                {infoUser && infoUser?.activatedFreePeriod && !infoUser.endFreePeriod && infoUser?.categoriesFreePeriod?.length && infoUser.categoriesFreePeriod.map((item) => (
                    <div key={item.id} className={cls.blockCategory}>
                        <div className={cls.blockInfo}>
                            <div className={cls.categoryName}>{item?.name}</div>
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
                                        <div>
                                            <div>Доступный период: до окончания пробного периода</div>
                                        </div>
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
            { loadingFreeNotification
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default BlockCategory;