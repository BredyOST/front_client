'use client';
import React, {FC} from 'react';
import cls from './cards.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import Slider from "@/app/components/shared/ui/slider/slider";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetFreePeriodMutation, useGetFreePeriodNotificationMutation,
    useGetMeMutation,
    usePaymentMutation, usePayNotificationsMutation
} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {redirect} from "next/navigation";
import RubleSvg from '../../../components/svgs/rubleTwo.svg'

interface cardsProps {
    classname?: string;
    item:any;
    categories:any;
}

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

    //USESTATE
    const [price, setPrice] = React.useState<string | number>('');
    const [period, setPeriod] = React.useState<string>(item.title == 'Недельный' ? '7': '1');
    const [textMonthSliceTwo, setTextMonthSliceTwo] = React.useState<string>('Месяц'); // месяц во втором слайсе

    const changePeriod = (value:string) => {
        setPeriod(value)
    }

    React.useEffect(
        () => {

            let salary = 0;
            if (item.title == 'Недельный') {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem.id == item.id)
                    const price = Math.round(+category.salary * 2 /30 * +period)
                    salary += price
                })
            }

            if (item.title == 'Погрузись в работу') {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem.id == item.id)
                    const price = +category.salary * +period
                    salary += price;
                })
            }

            if(item.title == 'Бесплатный') setPeriod(`1`)

            setPrice(salary)
        },[item, period,chosenCategory]
    )

    React.useEffect(() => {

        if (item.title == 'Погрузись в работу') {
            if (+period == 1) {
                setTextMonthSliceTwo('МЕСЯЦ')
            }
            if(+period >= 2 && +period <= 4) {
                setTextMonthSliceTwo('МЕСЯЦА')
            }
            if(+period  >=5 && +period <= 12) {
                setTextMonthSliceTwo('МЕСЯЦЕВ')
            }
        }

        if (item.title == 'Недельный') {
            if (+period == 1) {
                setTextMonthSliceTwo('ДЕНЬ')
            }
            if(+period >= 2 && +period <= 4) {
                setTextMonthSliceTwo('ДНЯ')
            }
            if(+period  >=5 && +period <= 20) {
                setTextMonthSliceTwo('ДНЕЙ')
            }
            if(+period  == 21) {
                setTextMonthSliceTwo('ДЕНЬ')
            }
            if(+period  >= 22 ) {
                setTextMonthSliceTwo('ДНЯ')
            }
            if(+period  >= 25 && +period  <= 30) {
                setTextMonthSliceTwo('ДНЕЙ')
            }
            if(+period  == 31 ) {
                setTextMonthSliceTwo('ДЕНЬ')
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
    }, [requestPayment])

    //USEREF

    //FUNCTIONS

    const payOrTryFreePeriod = (title:string) => {

        if(!infoUser?.phoneNumber || !infoUser?.isActivatedPhone) {
            dispatch(addInfoForCommonError({ message:'С 21.03.2024г требуется подтвержденный номер телефона в профиле. Требуется создать новый аккаунт с использованием номера телефона '} ))
            return
        }

        if(!chosenCategory.length) {
            dispatch(changeStateCategoriesPopup(!categoriesPopup))
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
            return
        }

        if(title == `Бесплатный` && chosenCategory.length > 1) {
            dispatch(addInfoForCommonError({ message:'Выберите одну категорию для бесплатного периода'} ))
            return;
        }

        if ((title == `Недельный` || title == 'Погрузись в работу') && chosenCategory.length < 1) {
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
        }
        
        if (title == `Бесплатный` && chosenCategory.length == 1) {
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
        }

        if((title == `Недельный` || title == 'Погрузись в работу') && chosenCategory.length >= 1) {
            payment({
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

    React.useEffect(() => {

        chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
            let category = categories?.find((elem:any) => elem.id == item.id)
        })
    })

    return (
        <div className={cls.card} >
            <div className={cls.coverSubtitle}>
                <div className={cls.subtitle}><div>{item.title}</div><h3 className={cls.titleTwo}></h3></div>
            </div>
            <div className={cls.body}>
                <div className={cls.coverPrice}>
                    <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}></div> </div>
                    {/*{(price == 0 && item.title == 'Бесплатный') && <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}></div> </div>}*/}
                    {/*{(price == 0 && (item.title == 'Недельный' ||  item.title == 'Погрузись в работу')) && <div className={cls.priceRed}>Выберите категорию для отображения цены</div>}*/}
                    {/*{(price !== 0 && (item.title == 'Недельный' ||  item.title == 'Погрузись в работу')) && <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}></div> </div>}*/}
                </div>
                <div className={cls.slider}>
                    <div className={cls.coverPeriod}>
                        <div className={cls.coverPeriodMain}>ПЕРИОД</div>
                        {item.title == 'Бесплатный'
                            ? <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>ДЕНЬ</div></div> :
                            item.title == 'Погрузись в работу'
                                ? <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>{textMonthSliceTwo}</div></div> :
                                <div className={cls.month}><div className={cls.period}>{period}</div><div className={cls.periodText}>{textMonthSliceTwo}</div></div>
                        }
                    </div>
                    {
                        (item.title === 'Погрузись в работу') &&
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
                    {
                        (item.title === 'Недельный') &&
                        <div className={cls.coverSlider}>
                            <Slider
                                value={period}
                                min={`7`}
                                max={`28`}
                                step={`7`}
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