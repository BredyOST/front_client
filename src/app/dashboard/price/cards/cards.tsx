'use client';
import React, {FC} from 'react';
import cls from './cards.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import Slider from "@/app/components/shared/ui/slider/slider";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {useGetFreePeriodMutation, useGetMeMutation} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";

interface cardsProps {
    classname?: string;
    item:any;
}

const Cards:FC<cardsProps> = React.memo((props) => {
    const {
        classname,
        item,
    } = props;

    const cookies = getThisCookie();
    const dispatch = useAppDispatch()

    //RTK
    const [getFreePeriod, {data: requestFreePeriod, error:errorFreePeriod, isLoading: isLoadingFreePeriod, isError: isErrorFreePeriod}] = useGetFreePeriodMutation()
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();

    //ACTIONS FROM REDUX
    // для изменения состояния попапа loginForm
    const { changeStateLoginFormPopup } = statePopupSliceActions;
    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;
    const {changeStateCategoriesPopup} = statePopupSliceActions;

    //STATES FROM REDUX
    const {chosenCategory} = useAppSelector(state => state.categories)
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    const {categoriesPopup} = useAppSelector(state => state.loginPopup)

    //USESTATE
    const [price, setPrice] = React.useState<string | number>('');
    const [period, setPeriod] = React.useState<string>('1');
    const [textMonthSliceTwo, setTextMonthSliceTwo] = React.useState<string>('Месяц'); // месяц во втором слайсе
    // const [showAttention, setShowAttention] = React.useState<boolean>(false);
    const changePeriod = (value:string) => {
        setPeriod(value)
    }
    React.useEffect(
        () => {
            setPrice(item.price * +period * chosenCategory.length ? chosenCategory.length : 1)
            if(item.title == 'Бесплатный') setPeriod(`2`)
        },[item, period,chosenCategory]
    )

    React.useEffect(() => {
        if (period == '1') {
            setTextMonthSliceTwo('Месяц')
        }
        if (period > '1' && period < '4') {
            setTextMonthSliceTwo('Месяца')
        }
        if (period > '4') {
            setTextMonthSliceTwo('Месяцев')
        }
        if (period == '10' || period == '11' || period == '12') {
            setTextMonthSliceTwo('Месяцев')
        }
    },[period])

    //USEREF

    //FUNCTIONS
    const changeStateShowMenuCategory = () => {
        dispatch(changeStateCategoriesPopup(!categoriesPopup))
    }

    const payOrTryFreePeriod = (title:string) => {
        if(!chosenCategory.length) {
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
            changeStateShowMenuCategory()
        }

        if (title === `Бесплатный` && chosenCategory.length) {
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
    }

    // для открытия попапа
    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div className={cls.card} >
            <div className={cls.coverSubtitle}>
                <h2 className={cls.subtitle}>{item.title}</h2>
            </div>
            <div className={cls.body}>
                <div className={cls.coverPrice}>
                    {item.title == 'Командный'
                        ? <div className={cls.price}><span>Индивидуально</span></div>
                        : <div className={cls.price}><span>{price}</span>р </div>
                    }
                </div>
                <div className={cls.slider}>
                    <div className={cls.coverPeriod}>
                        <div className={cls.period}>Период</div>
                        {item.title == 'Бесплатный'
                            ? <div className={cls.month}><span>{period}</span>дня</div>
                            : <div className={cls.month}><span>{period}</span>{textMonthSliceTwo}</div>
                        }
                    </div>
                    {
                        item.title === 'Погрузись в работу' &&
                        <div className={cls.coverSlider}>
                            <Slider
                                value={period}
                                min={item.title == 'Бесплатный' ? '2' : '1'}
                                max={item.title == 'Бесплатный' ? '2' : '12'}
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
                    Вы получите:
                </div>
                <ul className={cls.textLi}>
                    <li>{item.description}</li>
                    <li>Аккаунт на одного пользователя</li>
                </ul>
            </div>
            {item.title == 'Командный'
                ?    <Button
                    classname={cls.btn}
                    disabled={isLoadingFreePeriod}
                >
                    Написать
                </Button>
                :    <Button
                    onClick={!stateAuth ?  openLoginFormPopup :  () => payOrTryFreePeriod(item.title)  }
                    classname={cls.btn}
                    disabled={isLoadingFreePeriod}
                >
                    Оформить подписку
                </Button>
            }
            { isLoadingFreePeriod
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
});

export default Cards;