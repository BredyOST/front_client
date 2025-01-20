import React from 'react';
import cls from './feedback.module.scss'
import Pictures from "@/app/components/feedbackPage/pictures/pictures";
import {FEEDBACK_PAGE_TITLE} from "@/shared/constants/index.constants";
import {PicturesType} from "@/shared/types/types";

export const metadata = {
    title: 'Отзывы клиентов - клиенты.com',
    description: 'отзывы',
}

async function getData() {

    let feedback;

    try {
        const feedbackRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/files/getAllStart`, { next: { revalidate: 500 } })
        if (feedbackRes.ok) {
            const feedbackArray = await feedbackRes.json();
            if (feedbackArray.length >= 1)     feedback = feedbackArray
        } else {
            console.error('feedbackRes feed API request failed with status:', feedbackRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }
    return {feedback};
}

async function Feedback () {

    const { feedback} = await getData();

    const nextImages:PicturesType[] = feedback?.filter((item:any) => /\b2\.\d/.test(item.originalName));

    return (
        <div className={cls.feedback}>
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>{FEEDBACK_PAGE_TITLE}</h1>
                    </div>
                    <div className={cls.cover_feedBack}>
                        <h3>Анна</h3>
                        <div>почта: 7284wm@mail.ru</div>
                        <div>vk: vk/133rdas.com</div>
                        <div>tg: @mouse_fle</div>
                        <div>Крутой сайт, пользуюсь регулярно и вское разное такое что там и тут и очень все хорошо</div>
                    </div>
                    {/*<Pictures pictures={nextImages}></Pictures>*/}
                </div>
            </div>
        </div>
    );
};

export default Feedback;
