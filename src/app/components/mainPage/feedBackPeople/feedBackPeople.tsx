'use client';
import React, {FC} from 'react';
import cls from './feedBackPeople.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

interface feedBackProps {
    classname?: string;
}

const links = [
    {id:1, link: "https://timgotow.ru/uploads/c438849fbc4100a8e81.jpg"},
    {id:2, link: "https://timgotow.ru/uploads/8c0100aca9ae16107acb.jpg"},
    {id:3, link: "https://timgotow.ru/uploads/104e49c479103c6e2e3b.jpg"},
    // {id:4, link: "https://timgotow.ru/uploads/8851489b2e96581e29.jpg"},
    // {id:5, link: "https://timgotow.ru/uploads/706f86b1dcdc3361098.jpg"},
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
                            <video poster='https://timgotow.ru/uploads/e8fb9f338255bb72d4.png' controls preload="metadata">
                                <source type="video/webm" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.webm"/>
                                <source type="video/mp4" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className={cls.videoWrapper}>
                        <div className={cls.item_video}>
                            <video poster='https://timgotow.ru/uploads/e8fb9f338255bb72d4.png' controls preload="metadata">
                                <source type="video/webm" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.webm"/>
                                <source type="video/mp4" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                    <div className={cls.videoWrapper}>
                        <div className={cls.item_video}>
                            <video poster='https://timgotow.ru/uploads/e8fb9f338255bb72d4.png' controls preload="metadata">
                                <source type="video/webm" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.webm"/>
                                <source type="video/mp4" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.mp4"/>
                                Your browser does not support the video tag.
                            </video>
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

