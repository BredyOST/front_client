'use client';
import React, {FC} from 'react';
import cls from './cards.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import Slider from "@/app/components/shared/ui/slider/slider";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetFreePeriodMutation,
    useGetMeMutation,
    usePaymentMutation, usePayNotificationsMutation
} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {redirect} from "next/navigation";

interface cardsProps {
    classname?: string;
    item:any;
    categories:any;
}

const emailAdress= 'клиенты.com';

const Cards:FC<cardsProps> = React.memo((props) => {
    const {
        item,
        categories
    } = props;

    const cookies = getThisCookie();
    const dispatch = useAppDispatch()

    //RTK
    const [getFreePeriod, {data: requestFreePeriod, error:errorFreePeriod, isLoading: isLoadingFreePeriod, isError: isErrorFreePeriod}] = useGetFreePeriodMutation()
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    const [payment, {data: requestPayment, error:errorPayment, isLoading: isLoadingPayment, isError: isErrorPayment}] = usePaymentMutation()
    const [paymentNotifications, {data: requestPaymentNotifications, error:errorPaymentNotifications, isLoading: isLoadingPaymentNotifications, isError: isErrorPaymentNotifications}] = usePayNotificationsMutation()



    //ACTIONS FROM REDUX
    // для изменения состояния попапа loginForm
    const { changeStateLoginFormPopup } = statePopupSliceActions;
    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
    const {addInfoForCommonError} = indicatorsNotifications;
    const {changeStateCategoriesPopup} = statePopupSliceActions;

    //STATES FROM REDUX
    const {chosenCategory} = useAppSelector(state => state.categories)
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)
    const {activePriceWindows} = useAppSelector(state => state.prices)

    //USESTATE
    const [price, setPrice] = React.useState<string | number>('');
    const [period, setPeriod] = React.useState<string>('1');
    const [textMonthSliceTwo, setTextMonthSliceTwo] = React.useState<string>('Месяц'); // месяц во втором слайсе

    const changePeriod = (value:string) => {
        setPeriod(value)
    }

    React.useEffect(
        () => {

            let salary = 0;

            if (item.title == 'Посуточный' && activePriceWindows == 1) {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem.id == item.id)
                    console.log(category.salaryChanel)
                    const price = Math.round(+category.salary * 2.5 /30 * +period)
                    salary += price
                })
            } else if (item.title == 'Посуточный' && activePriceWindows == 2) {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem.id == item.id)
                    console.log(category.salaryChanel)
                    const price = Math.round(+category.salaryChanel * 2.5 /30 * +period)
                    salary += price
                })
            }

            if (item.title == 'Погрузись в работу'  && activePriceWindows == 1) {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem.id == item.id)
                    const price = +category.salary * +period
                    salary += price;
                })
            }  else if (item.title == 'Погрузись в работу' && activePriceWindows == 2) {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem.id == item.id)
                    const price = +category.salaryChanel * +period
                    salary += price;
                })
            }

            if(item.title == 'Бесплатный') setPeriod(`1`)

            setPrice(salary)
        },[item, period,chosenCategory, activePriceWindows]
    )

    React.useEffect(() => {

        if (item.title == 'Погрузись в работу') {
            if (+period == 1) {
                setTextMonthSliceTwo('Месяц')
            }
            if(+period >= 2 && +period <= 4) {
                setTextMonthSliceTwo('Месяца')
            }
            if(+period  >=5 && +period <= 12) {
                setTextMonthSliceTwo('Месяцев')
            }
        }

        if (item.title == 'Посуточный') {
            if (+period == 1) {
                setTextMonthSliceTwo('День')
            }
            if(+period >= 2 && +period <= 4) {
                setTextMonthSliceTwo('Дня')
            }
            if(+period  >=5 && +period <= 20) {
                setTextMonthSliceTwo('Дней')
            }
            if(+period  == 21) {
                setTextMonthSliceTwo('День')
            }
            if(+period  >= 22 ) {
                setTextMonthSliceTwo('Дня')
            }
            if(+period  >= 25 && +period  <= 30) {
                setTextMonthSliceTwo('Дней')
            }
            if(+period  == 31 ) {
                setTextMonthSliceTwo('День')
            }
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
        if(requestPaymentNotifications?.url) {
            redirect(requestPaymentNotifications?.url)
        }
    }, [requestPayment,requestPaymentNotifications])

    //USEREF

    //FUNCTIONS

    const payOrTryFreePeriod = (title:string) => {
        if(!chosenCategory.length) {
            dispatch(changeStateCategoriesPopup(!categoriesPopup))
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
        }

        if (title == `Бесплатный` && chosenCategory.length == 1 && activePriceWindows == 1) {
            getFreePeriod(chosenCategory).then((result) => {
                if('data' in result && result?.data?.text == `Бесплатный период активирован` && cookies && cookies._z) {
                    getInfoUser(cookies).then((result) => {
                        if ('data' in result && result?.data) {
                            dispatch(addInfoUser(result?.data));
                            dispatch(addMainAdminRole(result?.data?.isMainAdmin));
                            dispatch(addAdminRole(result?.data?.isAdmin));
                            dispatch(addAuthStatus(true));
                        }
                    });
                }
            })
        } else if (title == `Бесплатный` && chosenCategory.length > 1){
            dispatch(addInfoForCommonError({ message:'Выберите одну категорию для бесплатного периода'} ))
        }

        if ((title == `Посуточный` || title == 'Погрузись в работу') && chosenCategory.length < 1) {
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
        } else if((title == `Посуточный` || title == 'Погрузись в работу') && chosenCategory.length >= 1 && activePriceWindows == 1) {
            payment({
                categ: chosenCategory,
                price: price,
                period: period,
                title: title,
            })
        } else if ((title == `Посуточный` || title == 'Погрузись в работу') && chosenCategory.length >= 1 && activePriceWindows == 2) {
            paymentNotifications({
                categ: chosenCategory,
                price: price,
                period: period,
                title: title,
            })
        }
    }
    
    // для открытия попапа
    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div className={cls.card} >
            <div className={cls.coverSubtitle}>
                {item.title == 'Бесплатный' && activePriceWindows == 1 && <h2 className={cls.subtitle}>{item.title}</h2>}
                {item.title == 'Бесплатный' && activePriceWindows == 2 && <h2 className={cls.subtitle}>Протестируй</h2>}
                {item.title == 'Посуточный' && activePriceWindows == 1 && <h2 className={cls.subtitle}>{item.title}</h2>}
                {item.title == 'Посуточный' && activePriceWindows == 2 && <h2 className={cls.subtitle}>Упрощенный</h2>}
                {item.title == 'Погрузись в работу' && activePriceWindows == 1 && <h2 className={cls.subtitle}>{item.title}</h2>}
                {item.title == 'Погрузись в работу' && activePriceWindows == 2 && <h2 className={cls.subtitle}>Пакет уведомлений</h2>}
            </div>
            <div className={cls.body}>
                <div className={cls.coverPrice}>
                    {(price == 0 && item.title == 'Бесплатный') && <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}>р</div> </div>}
                    {(price == 0 && (item.title == 'Посуточный' ||  item.title == 'Погрузись в работу')) && <div className={cls.priceRed}>Выберите категорию для отображения цены</div>}
                    {(price !== 0 && (item.title == 'Посуточный' ||  item.title == 'Погрузись в работу')) && <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}>р</div> </div>}
                </div>
                <div className={cls.slider}>
                    <div className={cls.coverPeriod}>
                        <div className={cls.coverPeriodMain}>Период</div>
                        {item.title == 'Бесплатный'
                            ? <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>День</div></div> :
                            item.title == 'Погрузись в работу'
                                ? <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>{textMonthSliceTwo}</div></div> :
                                <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>{textMonthSliceTwo}</div></div>
                        }
                    </div>
                    {
                        (item.title === 'Погрузись в работу' || item.title === 'Посуточный') &&
                            <div className={cls.coverSlider}>
                                <Slider
                                    value={period}
                                    min={item.title == 'Бесплатный' ? '2' : '1'}
                                    max={item.title == 'Бесплатный' ? '2' : item.title == 'Погрузись в работу' ? '12' : '30'}
                                    classname={cls.forSliderCover}
                                    classnameInput={cls.sliderInput}
                                    onInput={changePeriod}
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
                {activePriceWindows == 1 ? `Оформить подписку`: `Подключить уведомления`}
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
            { (isLoadingPaymentNotifications)
              && (
                  <Loader
                      classname="color-dark"
                  />
              )}
        </div>
    );
});

export default Cards;