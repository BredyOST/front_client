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
                        <Logotype/>
                    </div>
                    <div className={cls.coverLinks}>
                        <AppLink href=''>
                            <VkSvg
                                className={cls.vkSvg}
                            />
                        </AppLink>
                        <AppLink href=''>
                            <TelegrammSvg
                                className={cls.telegramSvg}
                            />
                        </AppLink>
                    </div>
                    <div className = {cls.endLinks}>
                        <AppLink
                            classname={cls.link}
                            href=''>
                            Контакты
                        </AppLink>
                        <AppLink
                            classname={cls.link}
                            href=''>
                            Пользовательское соглашение
                        </AppLink>
                        <AppLink
                            classname={cls.link}
                            href=''>
                            Политика конфиденциальности
                        </AppLink>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Footer;