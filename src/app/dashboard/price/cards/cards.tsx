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
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {redirect} from "next/navigation";

interface cardsProps {
    classname?: string;
    item:any;
}

const emailAdress= 'клиенты.com';

const Cards:FC<cardsProps> = React.memo((props) => {
    const {
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
    const [copiedNotification, setCopiedNotification] = React.useState<boolean>(false);
    const [indicatorCopied, setIndicatorCopied] = React.useState<boolean>(false)

    const changePeriod = (value:string) => {
        setPeriod(value)
    }
    React.useEffect(
        () => {
            setPrice(item.price * +period * chosenCategory.length)
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

    React.useEffect(() => {
        if (requestFreePeriod?.text ==`Бесплатный период активирован` ) {
            redirect('/dashboard/search')
        }
    },[requestFreePeriod])

    //USEREF

    //FUNCTIONS

    const payOrTryFreePeriod = (title:string) => {
        if(!chosenCategory.length) {
            dispatch(changeStateCategoriesPopup(!categoriesPopup))
            dispatch(addInfoForCommonError({ message:'Вы не выбрали категории'} ))
        }

        if (title === `Бесплатный` && chosenCategory.length == 1) {
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
        } else if (title === `Бесплатный` && chosenCategory.length > 1){
            dispatch(addInfoForCommonError({ message:'Выберите одну категорию для бесплатного периода'} ))
        }
    }

    // для открытия попапа
    const openLoginFormPopup = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    const changeStateShowEmail = () => {
        copyToClipboard(emailAdress);
    };
    const copyToClipboard = (text:string) => {
        setIndicatorCopied(true)
        if(copiedNotification) return
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setCopiedNotification(true);
        const id = setTimeout(() => {
            setCopiedNotification(false);
            clearTimeout(id)
            setIndicatorCopied(false)
        }, 3000); // Уведомление будет скрыто через 2 секунды

    };

    return (
        <div className={item.title == 'Погрузись в работу' ? `${cls.card} ${cls.active}` : cls.card} >
            <div className={cls.coverSubtitle}>
                <h2 className={cls.subtitle}>{item.title}</h2>
            </div>
            <div className={cls.body}>
                <div className={cls.coverPrice}>
                    {item.title == 'Командный'
                        ? <div className={cls.price}>Индивидуально</div>
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
                ?   <span
                    className={indicatorCopied ? `${cls.btnSpanMain} ${cls.copied}`: cls.btnSpanMain}
                    onClick={changeStateShowEmail}
                >
                    {copiedNotification ? `Email скопирован` : emailAdress}
                    {indicatorCopied && <span className={cls.btnSpan}></span>}
                </span>
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