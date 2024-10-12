'use client'
import React from 'react';
import cls from './adminPage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import AddGroup from "@/app/dashboard/hiddenListForAdmins/addGroup/addGroup";
import AddCategory from "@/app/dashboard/hiddenListForAdmins/addCategory/addCategory";
import PostsAll from "@/app/dashboard/hiddenListForAdmins/postsAll/postsAll";
import UploadFiles from "@/app/dashboard/hiddenListForAdmins/uploadFiles/uploadFiles";
import Users from "@/app/dashboard/hiddenListForAdmins/users/users";
import Price from "@/app/dashboard/hiddenListForAdmins/price/price";
import AddChat from "@/app/dashboard/hiddenListForAdmins/addChat/addChat";
import {useAppSelector} from "@/app/redux/hooks/redux";


function Admin ()  {

    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)

    if (!stateAuth && !infoUser?.isAdmin) {
        return null
    }
    return (
        <div className={classNames(cls.AdminPage, {},[] )} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <AddGroup/>
                    <AddChat/>
                    <AddCategory/>
                    <Price/>
                    <PostsAll/>
                    <UploadFiles/>
                    <Users/>
                </div>
            </div>
        </div>
    );
};
//
export default Admin;