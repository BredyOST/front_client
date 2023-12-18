import React, {FC} from 'react';
import cls from './logotype.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";


interface logotypeProps {
    classname?: string;
}

const Logotype:FC<logotypeProps> = React.memo((props) => {
    const { classname } = props;
    
    return (
        <div className={classNames(cls.logotype, {},[classname] )} >
            Клиенты.com
        </div>
    );
});

export default Logotype;