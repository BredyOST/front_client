'use client'
import React, {FC} from 'react';
import cls from './header.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import NavBar from "@/app/components/widgets/navBar/navBar";
import Logotype from "@/app/components/header/logotype/logotype";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import LoginModal from "@/app/components/features/AuthBy/loginModal/loginModal";
import {
    useGetAllPricesMutation,
    useGetCategoriesMutation,
    useGetMeMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import {BurgerButton} from "@/app/components/widgets/BurgerButton/burgerButton";
import Notification from "@/app/components/shared/notification/notification";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {PricesSLiceActions} from "@/app/redux/entities/prices/pricesSlice";
import {indicatorsWindowActions} from "@/app/redux/entities/indentidicatorsWindow/identificatorsWindowSlice";
import BtnEnterBlock from "@/app/components/header/btnEnterBlock/btnEnterBlock";
interface headerProps {
    classname?: string;
}

// что передаем в NavBar
export type NavBar = {
    text: string,
    href:string,
}

export const navbarFirst:NavBar[] = [
    {text: 'Тарифы', href:'/dashboard/price'},
    {text: 'FAQ', href:'/dashboard/faq'},
    {text: 'О проекте', href:'/'},
]

const Header:FC<headerProps> = React.memo((props) => {
    const {classname,} = props;
    const dispatch = useAppDispatch();
    const cookies = getThisCookie();

    //RTK
    // // запрос данных на получение информации пользователя пользователя
    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    // //получаем имеющиеся категории в базе данных, доступные к подписке
    // const [getCategories, {data: requestCategories, error:errorCategories, isLoading: isLoadingCategoriess, isError:isErrorCategories}] = useGetCategoriesMutation()
    // // получаем тарифы
    // const [getPrices, {data: requestPrices, error:errorPrices, isLoading: isLoadingReqGetPrices, isError:isErrorPrices}] =  useGetAllPricesMutation();

    // STATES FROM REDUX
    // данные по авторизации
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    // имеющиеся категории в базе данных, доступные к подписке
    // const {categories} = useAppSelector(state => state.categories)
    // тарифы
    // const {prices} = useAppSelector(state => state.prices)
    // информация о window для того чтобы прятать header
    // const {scrollDown, scrolledHeight} = useAppSelector((state) => state.indicatorWindow);

    // Actions
    // для сохранения данных о пользователе
    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
    // добавить категории в стейт
    // const {addCategories} = categoriesActions;
    // ACTIONS FROM REDUX
    // // для изменения состояния попапа loginForm
    // const { changeStateLoginFormPopup } = statePopupSliceActions;
    // для добавления параметров по Window
    const {setWindowWidth, setScrollUp, setScrollDown, setScrolledHeight} = indicatorsWindowActions;
    // для добавления тарифов в хранилище
    const {addPrices} = PricesSLiceActions;

    //STATE
    // для отображения и скрытия подменю профиля
    // const[pointerOnProfile, setPointerOnProfile] = React.useState<boolean>(false)
    // состояние бургер меню
    // const {stateMenuBurgerHeader} = useAppSelector(state => state.stateBurgerMenu)
    const [showHeader, setShowHeader] = React.useState(true);
    let lastScrollY = React.useRef(0);
    //REF
    // const burgerMenuOpenRef = React.useRef(stateMenuBurgerHeader);

    // Mods для стилей
    const mods:Mods = {
        [cls.hideHeader]: !showHeader
    }

    //FUNCTIONS

    //USEEFFECT

    React.useEffect(() => {
        if (cookies && cookies._z) {
            getInfoUser(cookies).then((result) => {
                if (result && 'data' in result && result.data) {
                    dispatch(addInfoUser(result.data));
                    dispatch(addMainAdminRole(result.data.isMainAdmin));
                    dispatch(addAdminRole(result.data.isAdmin));
                    dispatch(addAuthStatus(true));
                }
            });
        }
        // if(!categories) {
        //     getCategories('').then((results) => {
        //         dispatch(addCategories(results.data))
        //     })
        // }
        // if (!prices.length) {
        //     getPrices('').then((result) => {
        //         dispatch(addPrices(result.data))
        //     })
        // }
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowHeader(currentScrollY < lastScrollY.current || currentScrollY === 0);
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={classNames(cls.header, mods,[classname] )} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.leftSection}>
                            <Logotype/>
                            <NavBar
                                classnameForLink={cls.navBarFirst}
                                arrayText={navbarFirst}
                            />
                        </div>
                        <div className={cls.rightSection}>
                            <div className={cls.coverButton}>
                                <AppLink
                                    classname={cls.link}
                                    href='/dashboard/search'>
                                    Перейти к заявкам
                                </AppLink>
                                <BtnEnterBlock/>
                            </div>
                            <BurgerButton/>
                        </div>
                    </div>
                </div>
            </div>
            <Notification/>
            <LoginModal/>
        </div>
    );
});

export default Header;