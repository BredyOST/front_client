'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './adminPage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import AddGroup from "@/app/dashboard/hiddenListForAdmins/addGroup/addGroup";
import AddCategory from "@/app/dashboard/hiddenListForAdmins/addCategory/addCategory";
import PostsAll from "@/app/dashboard/hiddenListForAdmins/postsAll/postsAll";
import {useRouter} from "next/navigation";
import UploadFiles from "@/app/dashboard/hiddenListForAdmins/uploadFiles/uploadFiles";
import Users from "@/app/dashboard/hiddenListForAdmins/users/users";
import Price from "@/app/dashboard/hiddenListForAdmins/price/price";
import AddChat from "@/app/dashboard/hiddenListForAdmins/addChat/addChat";

interface pageProps {
    classname?: string;
}

const Admin:FC<pageProps> = (props) => {
    const { classname } = props;
    const router = useRouter();

    //проверяем cookie - авторизован user или нет

    //ACTIONS FROM REDUX

    //STATES FROM REDUX
    const {stateAuth, loadingGetInfoUser, data:infoUser, roleUser} = useAppSelector(state => state.auth)

    //USESTATE

    //USEREF
    
    //FUNCTIONS


    return (
        <div className={classNames(cls.AdminPage, {},[classname] )} >
             <div className={'page__container'}>
                 { infoUser && infoUser.isAdmin &&
                <div className={cls.cover}>
                    <AddGroup/>
                    <AddChat/>
                    <AddCategory/>
                    <Price/>
                    <PostsAll/>
                    <UploadFiles/>
                    <Users/>
                </div>
                 }
              </div>
        </div>
    );
};

export default Admin;