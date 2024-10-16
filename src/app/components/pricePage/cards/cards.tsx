'use client';
import React, {FC} from 'react';
import cls from './cards.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import Slider from "@/app/components/shared/ui/slider/slider";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetFreePeriodMutation,
    useGetMeMutation,
    usePaymentMutation,
} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {authSliceActions} from "@/app/redux/entities/auth/authSlice";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {redirect} from "next/navigation";
import {itemType} from "@/app/redux/entities/categories/categoriesSchema";
import {CategoriesType, TypeForFunc} from "@/app/types/types";
import {CardPeriod, CardsType, nameCards, PaymentObjType} from "@/app/types/pageTypes/priceTypes";

interface CardsProps {
    item:CardsType;
    categories:CategoriesType[];
}


const Cards = React.memo(({  item, categories}:CardsProps) => {
    const cookies = getThisCookie();
    const dispatch = useAppDispatch()

    const [getFreePeriod, {data: requestFreePeriod, error:errorFreePeriod, isLoading: isLoadingFreePeriod, isError: isErrorFreePeriod}] = useGetFreePeriodMutation()
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    const [payment, {data: requestPayment, error:errorPayment, isLoading: isLoadingPayment, isError: isErrorPayment}] = usePaymentMutation()

    // change state loginForm
    const {changeStateLoginFormPopup} = statePopupSliceActions;
    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
    const {addInfoForCommonError} = indicatorsNotifications;
    const {changeStateCategoriesPopup} = statePopupSliceActions;

    const {chosenCategory} = useAppSelector(state => state.categories)
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)

    const [price, setPrice] = React.useState<string | number>('');
    const [period, setPeriod] = React.useState<CardPeriod>(item.title == nameCards.free ? '7': '1');
    const [monthThirdCard, setMonthThirdCard] = React.useState<string>('Месяц');

    const changePeriodInCard:TypeForFunc<CardPeriod, void> = (value) => {
        setPeriod(value)
    }

    React.useEffect(
        () => {
            let salary = 0;
            if (item.title == nameCards.weeks) {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:itemType) => {
                    let category = categories?.find((elem:CategoriesType) => elem.id == item.id)
                    const price = Math.round(+category.salary * 2 /30 * +period)
                    salary += price
                })
            }

            if (item.title == nameCards.month) {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:itemType) => {
                    let category = categories?.find((elem:CategoriesType) => elem.id == item.id)
                    const price = +category.salary * +period
                    salary += price;
                })
            }

            if(item.title == nameCards.free) setPeriod(`1`)

            setPrice(salary)
        },[item, period, chosenCategory]
    )

    React.useEffect(() => {
        if (item.title == nameCards.month) {
            if (+period == 1) setMonthThirdCard('МЕСЯЦ')
            if(+period >= 2 && +period <= 4) setMonthThirdCard('МЕСЯЦА')
            if(+period  >=5 && +period <= 12) setMonthThirdCard('МЕСЯЦЕВ')
        }
        if (item.title == nameCards.weeks) {
            if (+period == 1) setMonthThirdCard('ДЕНЬ')
            if(+period >= 2 && +period <= 4) setMonthThirdCard('ДНЯ')
            if(+period >= 5 && +period <= 20) setMonthThirdCard('ДНЕЙ')
            if(+period == 21) setMonthThirdCard('ДЕНЬ')
            if(+period >= 22 && +period <= 24) setMonthThirdCard('ДНЯ')
            if(+period >= 25 && +period  <= 30) setMonthThirdCard('ДНЕЙ')
            if(+period == 31 ) setMonthThirdCard('ДЕНЬ')
        }
    },[period])

    React.useEffect(() => {
        if (requestFreePeriod?.text ==`Бесплатный период активирован` ) {
            redirect('/dashboard/search')
        }
    },[requestFreePeriod])

    React.useEffect(() => {
        if(requestPayment?.url) {
            redirect(requestPayment?.url)
        }
    }, [requestPayment])

    const payOrTryFreePeriod:TypeForFunc<string,void> = (title:string) => {
        if(!chosenCategory.length) {
            dispatch(changeStateCategoriesPopup(!categoriesPopup))
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
            return
        }
        if(title == nameCards.free && chosenCategory.length > 1) {
            dispatch(addInfoForCommonError({ message:'Выберите одну категорию для бесплатного периода'} ))
            return;
        }
        if ((title == nameCards.weeks || title == 'Погрузись в работу') && chosenCategory.length < 1) {
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
        }
        if (title == nameCards.free && chosenCategory.length == 1) {
            getFreePeriod(chosenCategory).then((result:any) => {

                if('data' in result && result?.data?.text == `Бесплатный период активирован` && cookies && cookies._z) {
                    getInfoUser(cookies).then((result:any) => {
                        if ('data' in result && result?.data) {
                            dispatch(addInfoUser(result?.data));
                            dispatch(addMainAdminRole(result?.data?.isMainAdmin));
                            dispatch(addAdminRole(result?.data?.isAdmin));
                            dispatch(addAuthStatus(true));
                        }
                    });
                }
            })
        }
        if((title == nameCards.weeks || title == nameCards.month) && chosenCategory.length >= 1) {
            const objPayment:PaymentObjType = {
                category: chosenCategory,
                price: price,
                period: period,
                title: title,
            }
            payment(objPayment)
        }
    }

    const openLoginFormPopup:TypeForFunc<void, void> = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    const chooseNumMin:TypeForFunc<CardsType, '1' | '2' > = (item) => {
        if(item.title == nameCards.free) {
            return '2'
        } else {
            return '1'
        }
    }
    const chooseNumMax:TypeForFunc<CardsType, '2' | '12' | '30'> = (item) => {
        if(item.title == nameCards.free) {
            return '2'
        } else if(item.title == nameCards.month) {
            return '12'
        } else {
            return '30'
        }
    }

    return (
        <div className={cls.card} >
            <div className={cls.coverSubtitle}>
                <div className={cls.subtitle}><div>{item.title}</div><h3 className={cls.titleTwo}></h3></div>
            </div>
            <div className={cls.body}>
                <div className={cls.coverPrice}>
                    <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}></div> </div>
                </div>
                <div className={cls.slider}>
                    <div className={cls.coverPeriod}>
                        <div className={cls.coverPeriodMain}>ПЕРИОД</div>
                        {item.title == nameCards.free
                            ? <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>ДЕНЬ</div></div> :
                            item.title == nameCards.month
                                ? <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>{monthThirdCard}</div></div> :
                                <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>{monthThirdCard}</div></div>
                        }
                    </div>
                    {
                        (item.title === nameCards.month) &&
                            <div className={cls.coverSlider}>
                                <Slider
                                    value={period}
                                    min={chooseNumMin(item)}
                                    max={chooseNumMax(item)}
                                    classname={cls.forSliderCover}
                                    classnameInput={cls.sliderInput}
                                    onInput={changePeriodInCard}
                                    classnameForTicks={cls.ticks}
                                />
                            </div>
                    }
                    {
                        (item.title === nameCards.weeks) &&
                        <div className={cls.coverSlider}>
                            <Slider
                                value={period}
                                min={`7`}
                                max={`28`}
                                step={`7`}
                                classname={cls.forSliderCover}
                                classnameInput={cls.sliderInput}
                                onInput={changePeriodInCard}
                                classnameForTicks={cls.ticks}
                            />
                        </div>
                    }
                </div>
            </div>
            <div className={cls.additional}>
                <div className={cls.additionalTitle}>
                    Информация о тарифе:
                </div>
                <ul className={cls.textLi}>
                    <li>{item.description}</li>
                    <li>Аккаунт для одного пользователя</li>
                </ul>
            </div>
            <Button
                onClick={!stateAuth ?  openLoginFormPopup :  () => payOrTryFreePeriod(item.title)  }
                classname={cls.btn}
                disabled={isLoadingFreePeriod}
            >
                Оформить подписку
            </Button>
            { (isLoadingFreePeriod)
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
            { (isLoadingPayment)
              && (
                  <Loader
                      classname="color-dark"
                  />
              )}
        </div>
    );
});

export default Cards;