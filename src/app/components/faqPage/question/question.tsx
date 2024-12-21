'use client';
import React from 'react';
import cls from './question.module.scss'
import {Button} from "@/ui/Button/Button";
import ArraySvg from '@/assets/svgs/arrow.svg'
import {classNames, Mods} from "@/helpers/lib/classNames/className";
import {AnswerType, FaqItem} from "@/shared/types/types";
import {useToggleState} from "@/shared/hooks/hooks";

export interface QuestionProps {
    items:FaqItem
}

const Question = ({items}:QuestionProps) => {
    const [show, setShow] = React.useState<boolean>(false)

    const mod: Mods = {
        [cls.active]: show
    }

    const handleToggleState = useToggleState(setShow);

    return (

        <div className={classNames(cls.body, mod,[] )} >
            <div className={cls.coverBtn}>
                <Button
                    classname={cls.btnOpen}
                    onClick={handleToggleState}
                >
                    <ArraySvg className={cls.arrowSvg}/>
                    <div className={cls.text}>{items?.question}</div>
                </Button>
            </div>
            <div className={cls.bodyHide}>
                {items?.answer?.length >= 1 && 
                    items?.answer?.map((item:AnswerType) => (
                        <div className={cls.elem} key={item.id}>{item?.text}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default Question;