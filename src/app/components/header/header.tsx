'use client'
import React, {FC} from 'react';
import cls from './header.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import NavBar from "@/app/components/widgets/navBar/navBar";
import Logotype from "@/app/components/header/logotype/logotype";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import LoginModal from "@/app/components/features/AuthBy/loginModal/loginModal";
import {useGetMeMutation} from "@/app/redux/entities/requestApi/requestApi";
import {authSliceActions} from "@/app/redux/entities/auth/authSlice";
import {BurgerButton} from "@/app/components/widgets/BurgerButton/burgerButton";
import Notification from "@/app/components/shared/notification/notification";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import BtnEnterBlock from "@/app/components/header/btnEnterBlock/btnEnterBlock";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {navbarFirst} from "@/app/utils/index.constants";
import {TypeForFunc} from "@/app/types/types";
import {useAddInfoAboutUserWithCookie} from "@/app/hooks/hooks";
interface HeaderProps {
    classname?: string;
}

const Header= React.memo(({classname}: HeaderProps) => {

    const dispatch = useAppDispatch();
    const cookies = getThisCookie();

    const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    const {addAdminRole, addMainAdminRole, addAuthStatus, addInfoUser,} = authSliceActions;
    const {stateAuth} = useAppSelector(state => state.auth)
    const { changeStateLoginFormPopup } = statePopupSliceActions;
    const [showHeader, setShowHeader] = React.useState(true);

    let lastScrollY = React.useRef(0);

    const mods:Mods = {
        [cls.hideHeader]: !showHeader
    }

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
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowHeader(currentScrollY < lastScrollY.current || currentScrollY === 0);
            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll,{ passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const openLoginFormPopup:TypeForFunc<void, void> = React.useCallback(() => {
        dispatch(changeStateLoginFormPopup(true));
    }, []);

    return (
        <div className={classNames(cls.header, mods,[classname] )} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.leftSection}>
                            <div className={cls.coverLogo}>
                                <Logotype/>
                            </div>
                            <NavBar
                                classnameForLink={cls.navBarFirst}
                                arrayText={navbarFirst}
                            />
                        </div>
                        <div className={cls.rightSection}>
                            <div className={cls.coverButton}>
                                {stateAuth
                                    ? <AppLink
                                        classname={cls.link}
                                        href='/dashboard/search'
                                    >
                                        <span className={cls.spanFirst}> Перейти к заявкам</span>
                                        <span className={cls.spanSecond}> Заявки</span>
                                    </AppLink>
                                    :   <Button
                                        classname={cls.link}
                                        onClick={openLoginFormPopup}
                                    >
                                        <span className={cls.spanFirst}> Перейти к заявкам</span>
                                        <span className={cls.spanSecond}> Заявки</span>
                                    </Button>
                                }
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