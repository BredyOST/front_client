'use client';
import React, {FC} from 'react';
import cls from './feedBackPeople.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

interface feedBackProps {
    classname?: string;
}

const links = [
    {id:1, link: "https://timgotow.ru/uploads/2.1.jpg"},
    {id:2, link: "https://timgotow.ru/uploads/2.2.jpg"},
    {id:3, link: "https://timgotow.ru/uploads/2.3.jpg"},
    {id:4, link: "https://timgotow.ru/uploads/2.4.jpg"},
    {id:5, link: "https://timgotow.ru/uploads/2.5.jpg"},
]

export const FeedBackPeople:FC<feedBackProps> = (props) => {
    const { classname } = props;
    
    //ACTIONS FROM REDUX
    
    //STATES FROM REDUX
    
    //USESTATE
    
    //USEREF
    
    //FUNCTIONS

    return (
        <div className={classNames(cls.feedBack, {},[classname] )} >
            <div className={cls.cover}>
                <div className={cls.section}>
                    <h1 className={cls.mainTitle}>Отзывы наших клиентов</h1>
                </div>
                <div className={cls.video}>
                    <div className={cls.videoWrapper}>
                        <div className={cls.item_video}>
                            <iframe
                                className={cls.frame}
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/nyoWsqG5QgQ"
                                frameBorder="0"
                                allowFullScreen
                                title="YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                    <div className={cls.videoWrapper}>
                        <div className={cls.item_video}>
                            <iframe
                                className={cls.frame}
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/nyoWsqG5QgQ"
                                frameBorder="0"
                                allowFullScreen
                                title="YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                    <div className={cls.videoWrapper}>
                        <div className={cls.item_video}>
                            <iframe
                                className={cls.frame}
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/nyoWsqG5QgQ"
                                frameBorder="0"
                                allowFullScreen
                                title="YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <div className={cls.coverImage}>
                    {links?.length && links.map((item) => (
                        <div
                            className={cls.coverIbg}
                            key={item.id}
                        >
                            <img className={cls.ibg} src={item.link} alt="картинка"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cls.coverBtn}>
                <AppLink
                    classname={cls.link}
                    href={'/dashboard/feedback'}
                >
                    Больше отзывов
                </AppLink>
            </div>
        </div>
    );
};

export default FeedBackPeople;

