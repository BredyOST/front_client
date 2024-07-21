import React, {FC} from 'react';
import cls from './footer.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import Logotype from "@/app/components/header/logotype/logotype";
import VkSvg from "./../svgs/vk.svg"
import TelegrammSvg from "./../svgs/telegram.svg"
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
interface footerProps {
    classname?: string;
}

const Footer:FC<footerProps> = React.memo((props) => {
    const {
        classname
    } = props;

    return (
        <div className={classNames(cls.footer, {},[classname] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.cover}>
                            infoclient.com@gmail.com
                        </div>
                    </div>
                    <div className = {cls.endLinks}>
                        {/*<div*/}
                        {/*    className={`${cls.link} ${cls.mail}`}*/}
                        {/*>*/}
                        {/*    infoclient.com@gmail.com*/}
                        {/*</div>*/}
                        <AppLink
                            classname={cls.link}
                            href='/dashboard/contacts'>
                            Контакты
                        </AppLink>
                        <AppLink
                            classname={cls.link}
                            href='/dashboard/terms'>
                            Пользовательское соглашение
                        </AppLink>
                        <AppLink
                            classname={cls.link}
                            href='/dashboard/politics'>
                            Политика конфиденциальности
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Footer;