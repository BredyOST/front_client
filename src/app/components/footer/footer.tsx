import React from 'react';
import cls from './footer.module.scss'
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

const Footer = React.memo(() => {

    return (
        <div className={cls.footer} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <div className={cls.cover}>
                            infoclient.com@gmail.com
                        </div>
                    </div>
                    <div className = {cls.endLinks}>
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