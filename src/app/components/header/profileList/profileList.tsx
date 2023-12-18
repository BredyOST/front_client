import React, {FC} from 'react';
import cls from './profileList.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import Link from "next/link";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {destroyCookie} from "nookies";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import {useAppDispatch} from "@/app/redux/hooks/redux";


interface qProps {
    classname?: string;
}

const Profile:FC<qProps> = React.memo((props) => {
    const { classname } = props;

    const dispatch = useAppDispatch()
    //actions
    // для сохранения данных о пользователе
    const {
        addAdminRole,addMainAdminRole, addAuthStatus, addInfoUser, LogOutFromProfile,
    } = authSliceActions;

    const logout = React.useCallback(() => {
        destroyCookie(null,"_z",{path:'/'})
        destroyCookie(null,"_d",{path:'/'})
        destroyCookie(null,"_a",{path:'/'})
        dispatch(LogOutFromProfile(null));
        dispatch(addAdminRole(false));
        dispatch(addMainAdminRole(false));
        dispatch(addAuthStatus(false));
        location.reload()
    },[])

    return (
        <div className={classNames(cls.profile, {},[classname] )} >
            <ul className={cls.list}>
                <Link
                    className={cls.link}
                    href='/dashboard/profile'>
                        Профиль
                </Link>
                <Link
                    className={cls.link}
                    href='/'>
                        Cсылка
                </Link>
                <Link
                    className={cls.link}
                    href='/'>
                        Cсылка
                </Link>
            </ul>
            <Button
                classname={cls.logOutBtn}
                onClick={logout}
            >
                Выйти
            </Button>
        </div>
    );
});

export default Profile;