import React, {FC} from 'react';
import cls from './navBar.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import {AppLink} from "@/ui/appLink/appLink";
import {NavBar} from "@/app/components/header/header";



interface navBarProps {
    classname?: string;
    classnameForLink?: string;
    arrayText: NavBar[];
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
                {arrayText && arrayText.map((item:NavBar) => (
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


