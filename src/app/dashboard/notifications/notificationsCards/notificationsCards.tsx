'use client';
import React, {FC} from 'react';
import cls from './notificationsCards.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import Slider from "@/app/components/shared/ui/slider/slider";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetFreePeriodMutation, useGetFreePeriodNotificationMutation,
    useGetMeMutation,
    usePayNotificationsMutation
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

type Countrer = {
    id:string,
    chats:string[]
}

const NotificationsCards:FC<cardsProps> = React.memo((props) => {
    const {
        item,
        categories,
    } = props;

    const cookies = getThisCookie();
    const dispatch = useAppDispatch()

    //RTK
    const [getFreePeriod, {data: requestFreePeriod, error:errorFreePeriod, isLoading: isLoadingFreePeriod, isError: isErrorFreePeriod}] = useGetFreePeriodMutation()
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    // const [payment, {data: requestPayment, error:errorPayment, isLoading: isLoadingPayment, isError: isErrorPayment}] = usePaymentMutation()
    const [paymentNotifications, {data: requestPaymentNotifications, error:errorPaymentNotifications, isLoading: isLoadingPaymentNotifications, isError: isErrorPaymentNotifications}] = usePayNotificationsMutation()
    const [paymentNotificationsFree, {data: requestPaymentNotificationsFree, error:errorPaymentNotificationsFree, isLoading: isLoadingPaymentNotificationsFree, isError: isErrorPaymentNotificationsFree}] = useGetFreePeriodNotificationMutation()

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
    const [period, setPeriod] = React.useState<string>(item.title == 'Недельный' ? '7': '1');
    const [textMonthSliceTwo, setTextMonthSliceTwo] = React.useState<string>('Месяц'); // месяц во втором слайсе
    const [selectedChats, setSelectedChats] = React.useState<Countrer[]>([]);
    const changePeriod = (value:string) => {
        setPeriod(value)
    }

    React.useEffect(() => {
        // console.log(selectedChats)
    },[selectedChats])

    React.useEffect(
        () => {
            let salary = 0;
            if (item.title == 'Недельный') {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem?.id == item?.id)
                    const countChats:any = selectedChats.find((elem:any) => elem?.id == item?.id);
                    console.log(countChats)
                    const price = Math.round(+category.salaryChanel * 2 /30 * +period) * (+countChats?.chats?.length  || 0)
                    salary += price
                })
            }

            if (item.title == 'Погрузись в работу') {
                chosenCategory?.length >= 0 && chosenCategory?.map((item:any) => {
                    let category = categories?.find((elem:any) => elem?.id == item?.id)
                    const countChats:any = selectedChats.find((elem) => elem?.id == item?.id);
                    const price = +category.salaryChanel * +period * (+countChats?.chats?.length  || 0)
                    salary += price;
                })
            }


            setPrice(salary)
        },[item, period,chosenCategory, activePriceWindows, selectedChats]
    )

    React.useEffect(() => {


    }, [chosenCategory])

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

        if (item.title == 'Недельный') {
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
        if(requestPaymentNotifications?.url) {
            redirect(requestPaymentNotifications?.url)
        }
    }, [requestPaymentNotifications])

    //USEREF

    //FUNCTIONS
    const payOrTryFreePeriod = (title:string, activePriceWindows:number) => {

        if(!infoUser?.phoneNumber || !infoUser?.isActivatedPhone) {
            dispatch(addInfoForCommonError({ message:'С 21.03.2024г требуется подтвержденный номер телефона в профиле. Требуется создать новый аккаунт с использованием номера телефона '} ))
            return
        }

        if(!chosenCategory.length) {
            dispatch(changeStateCategoriesPopup(!categoriesPopup))
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
            return
        }

        // if(title == `Бесплатный` && chosenCategory.length > 1) {
        //     dispatch(addInfoForCommonError({ message:'Выберите одну категорию для бесплатного периода'} ))
        //     return;
        // }

        if ((title == `Недельный` || title == 'Погрузись в работу') && chosenCategory.length < 1) {
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
        }
        
        if (!infoUser?.phoneNumber) dispatch(addInfoForCommonError({ message:'Для подключения уведомлений, требуется добавить номер телефона в профиле'} ))

        if ((title == `Недельный` || title == 'Погрузись в работу') && chosenCategory.length >= 1) {


            const filterChats = selectedChats.filter((item) => item?.chats?.length > 0)

            paymentNotifications({
                categ: chosenCategory,
                price: price,
                period: period,
                title: title,
                chatList:filterChats,
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

    const handleChatChange = (categoryId:string, chatName:string, isChecked:boolean) => {
        setSelectedChats(prevState => {
            // Проверяем, есть ли уже объект с таким ID в массиве
            const existingCategory = prevState.find(category => category.id === categoryId);

            if (isChecked) {
                // Если объект с таким ID уже есть в массиве, обновляем его
                if (existingCategory) {
                    return prevState.map(category =>
                        category.id === categoryId
                            ? { ...category, chats: [...category.chats, chatName] }
                            : category
                    );
                } else {
                    // Если объекта с таким ID нет, добавляем новый объект в массив
                    return [...prevState, { id: categoryId, chats: [chatName] }];
                }
            } else {
                // Если checkbox был снят, удаляем чат из массива чатов соответствующей категории
                if (existingCategory) {
                    return prevState.map(category =>
                        category.id === categoryId
                            ? { ...category, chats: category.chats.filter(name => name !== chatName) }
                            : category
                    );
                } else {
                    // Если объект с таким ID не существует, оставляем состояние без изменений
                    return prevState;
                }
            }
        });
    };



    if (item.title == 'Бесплатный') return null


    return (
        <div className={cls.card} >
            <div className={cls.coverSubtitle}>
                <div className={cls.subtitle}><div>{item.title}</div><h3 className={cls.titleTwo}>(Уведомления)</h3></div>
            </div>
            <div className={cls.body}>
                <div className={cls.coverPrice}>
                    {(price !== 0 && (item.title == 'Недельный' ||  item.title == 'Погрузись в работу')) && <div className={cls.price}><div className={cls.textPrice}>{price}</div><div className={cls.textRubble}>р</div> </div>}
                    {(chosenCategory?.length == 0 && (item.title == 'Недельный' ||  item.title == 'Погрузись в работу')) && <div className={cls.priceRed}>Выберите категорию для отображения цены</div>}
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
            {((item.title == 'Недельный' ||  item.title == 'Погрузись в работу')) && <div className={cls.priceRed}>Выберите чат для отображения цены </div>}
            {chosenCategory?.length > 0 && <div className={cls.titleChoose}>Выбор чатов</div>}
            {chosenCategory?.length > 0 && chosenCategory.map((category:any) => (
                <div
                    key={category.id}
                    className={cls.lineCover}
                >
                    <h3 className={cls.titleInput}>{category.text}</h3>
                    <div className={cls.blockInputs}>
                        {category?.chatNames?.length > 0 && category.chatNames.map((chatName:any) => (
                            <div
                                key={chatName}
                                className={cls.coverInputCheck}
                            >
                                <input
                                    className={cls.check}
                                    type="checkbox"
                                    checked={selectedChats?.find((item) => item.chats.includes(chatName)) && true || false}
                                    onChange={(e) => handleChatChange(category.id, chatName, e.target.checked)}
                                />
                                <span className={cls.checkCustom}></span>
                                <label htmlFor={category.id}>{chatName}</label>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
            <div className={cls.additional}>
                <div className={cls.additionalTitle}>
                    Информация о тарифе:
                </div>
                <ul className={cls.textLi}>
                    <li>{item.descriptionNotification}</li>
                    <li>Для одного пользователя</li>
                </ul>
            </div>
            <Button
                onClick={!stateAuth ?  openLoginFormPopup :  () => payOrTryFreePeriod(item.title, activePriceWindows)}
                classname={cls.btn}
                disabled={isLoadingFreePeriod}
            >
                Подключить уведомления
            </Button>
            { (isLoadingFreePeriod)
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
            { (isLoadingPaymentNotificationsFree)
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
});

export default NotificationsCards;