import React from 'react';
import cls from './logotype.module.scss'
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

const Logotype = React.memo(() => {

    return (
        <div className={cls.logotype} >
            <AppLink
                classname={cls.logotypeLink}
                href={'/'}
            >
                Клиенты.com
            </AppLink>
        </div>
    );
});

export default Logotype;