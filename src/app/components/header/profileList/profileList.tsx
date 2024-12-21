import React from 'react';
import cls from './profileList.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import Link from "next/link";
import {Button} from "@/ui/Button/Button";
import {useLogOutFromProfile} from "@/shared/hooks/hooks";

interface ProfileProps {
    classname?: string;
}

const Profile = React.memo(({classname}:ProfileProps) => {

    const logoutProfile = useLogOutFromProfile()

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
                onClick={logoutProfile}
            >
                Выйти
            </Button>
        </div>
    );
});

export default Profile;