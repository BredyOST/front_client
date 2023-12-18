import React, {FC} from 'react';
import cls from './navBar.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import {NavBarr} from "@/app/components/header/header";


interface navBarProps {
    classname?: string;
    classnameForLink?: string;
    arrayText: NavBarr[];
}

const navBar:FC<navBarProps> = React.memo((props) => {
    const {
        classname,
        arrayText,
        classnameForLink,
    } = props;


    return (
        <nav className={classNames(cls.navBar, {},[classname] )} >
            <ul className={cls.list}>
                {arrayText && arrayText.map((item) => (
                    <AppLink
                        classname={classnameForLink}
                        href={item.href}
                        key={item.text}
                    >
                        {item.text}
                    </AppLink>
                ))}
            </ul>
        </nav>
    );
});

export default navBar;


