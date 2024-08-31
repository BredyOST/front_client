import cls from './faq.module.scss';
import React from 'react';
import Question from '@/app/components/faqPage/question/question';
import { FAQ_ITEMS } from '@/app/dashboard/faq/constants';

export const metadata = {
    title: 'Ответы на вопросы - клиенты.com',
    description: 'ответы на вопросы',
};

async function Faq() {
    return (
        <div className={cls.faq}>
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Ответы на вопросы</h1>
                    </div>
                    <div className={cls.coverQuestions}>
                        {FAQ_ITEMS.map((item: any) => (
                            <Question key={item.id} items={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Faq;
