import cls from './faq.module.scss';
import React from "react";
import Link from "next/link";


export const metadata = {
    title: 'Ответы на вопросы - клиенты.com',
    description: 'ответы на вопросы',
}

interface faqProps {

}

async function Faq (props:faqProps) {
    const {} = props;

    const arrayQuestions = [
        {id:1, question: 'Как пользоваться сайтом', answer: `с инструкцией по сайту можете ознакомится на ${<Link href={'/'}>на главной странице</Link>}`}
    ]

    return (
        <div className={cls.faq}>
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Ответы на вопросы</h1>
                    </div>
                    В разработке
                    {/*{arrayQuestions?.length && arrayQuestions.map((item:any) => (*/}
                    {/*    <Question*/}
                    {/*        key={item.id}*/}
                    {/*        items = {item}*/}
                    {/*    />*/}
                    {/*))}*/}
                </div>
            </div>
        </div>
    );
};

export default Faq;