import cls from './faq.module.scss';
import React from "react";
import Question from "@/app/components/faqPage/question/question";
import {FAQ_PAGE_TITLE} from "@/app/utils/index.constants";
import {FAQ_ITEMS} from "@/app/dashboard/faq/constants/FaqPageConst";
import {FaqItem} from "@/app/types/types";

export const metadata = {
    title: 'Ответы на вопросы - клиенты.com',
    description: 'ответы на вопросы',
};

async function Faq () {

    return (
        <div className={cls.faq}>
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>{FAQ_PAGE_TITLE}</h1>
                    </div>
                    <div className={cls.coverQuestions}>
                        {FAQ_ITEMS?.length > 1 && FAQ_ITEMS?.map((item:FaqItem) => (
                            <Question
                                key={item.id}
                                items = {item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;