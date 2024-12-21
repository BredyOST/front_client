import React, {FC} from 'react';
import cls from './logotype.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import {AppLink} from "@/ui/appLink/appLink";

interface LogotypeProps {
    classname?: string;
}

const Logotype = React.memo(({classname}:LogotypeProps) => {

    return (
        <div className={classNames(cls.logotype, {},[classname] )} >
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