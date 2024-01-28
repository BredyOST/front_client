import React, {FC} from 'react';
import cls from './logotype.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";


interface logotypeProps {
    classname?: string;
}



const Logotype:FC<logotypeProps> = React.memo((props) => {
    const { classname } = props;
    
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