'use client';
import React, {FC} from 'react';
import cls from './question.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import ArraySvg from '../../../components/svgs/arrow.svg'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
interface questionProps {
    classname?: string;
    items:any
}

export const Question:FC<questionProps> = (props) => {
    const {
        classname,
        items
    } = props;

    const [show, setShow] = React.useState<boolean>(false)

    const mod: Mods = {
        [cls.active]: show
    }
    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    const changeShow = () => {
        setShow(prevState => !prevState)
    }

    return (

        <div className={classNames(cls.body, mod,[] )} >
            <div className={cls.coverBtn}>
                <Button
                    classname={cls.btnOpen}
                    onClick={changeShow}
                >
                    <ArraySvg className={cls.arrowSvg}/>
                    <div className={cls.text}>{items.question}</div>
                </Button>
            </div>
            <div className={cls.bodyHide}>
                {items.answer}
            </div>
        </div>
    );
};

export default Question;