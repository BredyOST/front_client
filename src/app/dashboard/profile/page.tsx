import React, {ChangeEvent, FC} from 'react';
import cls from './ProfilePage.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetCategoriesMutation,
    useGetMeMutation,
} from "@/app/redux/entities/requestApi/requestApi";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {parseCookies} from "nookies";
import ChangeName from "@/app/dashboard/profile/changeName/changeName";
import ChangeEmail from "@/app/dashboard/profile/changeEmail/changeEmail";
import ChangePhone from "@/app/dashboard/profile/changePhone/changePhone";
import ChangePassword from "@/app/dashboard/profile/changePassword/changePassword";
import Authorizations from "@/app/dashboard/profile/authorizations/authorizations";
import BlockCategory from "@/app/dashboard/profile/blockCategory/blockCategory";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

interface pageProps {
    classname?: string;
}
export interface HidePassword {
    current: boolean,
    new:boolean,
    newTwo:boolean
}

const ProfilePage:FC<pageProps> = (props) => {
    const { classname } = props;
    // const dispatch = useAppDispatch()
    // const cookies = parseCookies();
    //проверяем cookie - авторизован user или нет

    //ACTIONS FROM REDUX

    // STATES FROM REDUX
    // const {stateAuth, isAdmin, isMainAdmin, data:infoUser} = useAppSelector(state => state.auth)

    // RTk
    // запрос данных на пользователя
    // const [getInfoUser, {data: requestGetMe, error:errorUser, isLoading: isLoadingReqGetUser, isError}] =  useGetMeMutation();
    // верификаци номера запрос звонка
    // const [getCategories, {data: requestCategories, error:errorCategories, isLoading: isLoadingCategories, isError:isErrorCategories}] = useGetCategoriesMutation()

    //USE STATE


    //для проверки введенных паролей

    //USEREF

    //FUNCTIONS

    //
    // React.useEffect(
    //     () => {
    //         if(cookies  && cookies._z) {
    //             getCategories(cookies)
    //         }
    //     },[]
    // )

    //
    // if (!stateAuth) {
    //     return  null
    // }

    return (
        <div className={classNames(cls.ProfilePage, {},[classname] )} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.coverLink}>
                            <h1 className={cls.mainTitle}>Профиль пользователя</h1>
                            <div className={cls.linkCover}>
                                <AppLink
                                    classname={cls.link}
                                    href='/dashboard/search'>
                                    Перейти к заявкам
                                </AppLink>
                            </div>
                        </div>
                        <div className={cls.header}>
                            <h2 className={cls.registerText}>
                                <div className={cls.text}> Дата регистрации</div>
                                <div className={cls.dateText}>
                                    {/*{*/}
                                    {/*    !infoUser*/}
                                    {/*        ? 'загрузка данных...'*/}
                                    {/*        : infoUser && infoUser.createdAt*/}
                                    {/*            // eslint-disable-next-line max-len*/}
                                    {/*            ? `${ new Date(Date.parse(infoUser.createdAt)).getDate() < 10 ? `0${new Date(Date.parse(infoUser.createdAt)).getDate()}.` : `${new Date(Date.parse(infoUser.createdAt)).getDate()}.` }${ new Date(Date.parse(infoUser.createdAt)).getMonth() < 9 ? `0${new Date(Date.parse(infoUser.createdAt)).getMonth() + 1}.` : `${new Date(Date.parse(infoUser.createdAt)).getMonth() + 1}.` }${ new Date(Date.parse(infoUser.createdAt)).getFullYear() }г`*/}
                                    {/*            : 'данных нет'*/}
                                    {/*}*/}
                                </div>
                            </h2>
                        </div>
                        <ChangeName/>
                        <ChangeEmail/>
                        <ChangePhone/>
                        <ChangePassword/>
                        <Authorizations/>
                        <div className={cls.сategoriesCover}>
                            <h3 className={cls.subTitle}>Активные подписки</h3>
                            <BlockCategory/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  ProfilePage;
