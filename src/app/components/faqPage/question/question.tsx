'use client';
import React from 'react';
import cls from './question.module.scss';
import { Button } from '@/app/components/shared/ui/Button/Button';
import ArraySvg from '../../svgs/arrow.svg';
import {
    classNames,
    Mods,
} from '@/app/components/shared/lib/classNames/className';
import { FaqAnswer, FaqItem } from '@/app/dashboard/faq/types';
import { useToggleState } from '@/app/components/faqPage/question/hooks';

interface QuestionProps {
    items: FaqItem;
}

export const Question = ({ items }: QuestionProps) => {
    const [show, setShow] = React.useState<boolean>(false);

    const mod: Mods = {
        [cls.active]: show,
    };
    const handleToggleState = useToggleState(setShow);

    return (
        <div className={classNames(cls.body, mod, [])}>
            <div className={cls.coverBtn}>
                <Button classname={cls.btnOpen} onClick={handleToggleState}>
                    <ArraySvg className={cls.arrowSvg} />
                    <div className={cls.text}>{items?.question}</div>
                </Button>
            </div>
            <div className={cls.bodyHide}>
                {items?.answer?.length >= 1 &&
                    items?.answer?.map((item: FaqAnswer) => (
                        <div className={cls.elem} key={item.id}>
                            {item?.text}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Question;
