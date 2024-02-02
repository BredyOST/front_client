'use client';
import React, {FC} from 'react';
import cls from './feedBackPeople.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import Pictures from "@/app/dashboard/feedback/pictures/pictures";

interface feedBackProps {
    classname?: string;
    pictures?:any
}

const links = [
    {id:1, link: "https://timgotow.ru/uploads/2.1.jpg"},
    {id:2, link: "https://timgotow.ru/uploads/2.2.jpg"},
    {id:3, link: "https://timgotow.ru/uploads/2.3.jpg"},
    {id:4, link: "https://timgotow.ru/uploads/2.4.jpg"},
    {id:5, link: "https://timgotow.ru/uploads/2.5.jpg"},
]

export const FeedBackPeople:FC<feedBackProps> = (props) => {
    const {
        classname,
        pictures
    } = props;
    
    //ACTIONS FROM REDUX
    
    //STATES FROM REDUX
    
    //USESTATE
    
    //USEREF
    
    //FUNCTIONS


    const nextImages = pictures?.filter((item:any) => /\b2\.\d/.test(item.originalName)).sort((a:any, b:any ) => a.fileName - b.fileName).slice(0,5)

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
                                src="https://www.youtube.com//embed/Qcw1SMbC8W8"
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
                                src="https://www.youtube.com//embed/IYkR6YaYKLY"
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
                                src="https://www.youtube.com//embed/It64FQZfj4g"
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
                                src="https://www.youtube.com//embed/6s7p4tExCJw"
                                frameBorder="0"
                                allowFullScreen
                                title="YouTube Video"
                            ></iframe>
                        </div>
                    </div>
                </div>
                <Pictures
                    classname={cls.pictures}
                    pictures={nextImages}/>
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

