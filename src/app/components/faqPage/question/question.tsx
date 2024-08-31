'use client';
import React, {FC} from 'react';
import cls from './question.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import ArraySvg from '../../svgs/arrow.svg'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";

interface questionProps {
    items:any;
}

export const Question:FC<questionProps> = (props) => {
    const {
        items
    } = props;

    const [show, setShow] = React.useState<boolean>(false)

    const mod: Mods = {
        [cls.active]: show
    }
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
                    <div className={cls.text}>{items?.question}</div>
                </Button>
            </div>
            <div className={cls.bodyHide}>
                {items?.answer?.length >= 1 &&
                items?.answer?.map((item:any) => (
                    <div className={cls.elem} key={item.id}>{item?.text}</div>
                ))
                }
            </div>
        </div>
    );
};

export default Question;