'use client'
import React, {FC} from 'react';
import cls from './feedBackPeople.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";

interface feedBackProps {
    classname?: string;
}

const linksVideoFeedBack = [
    "https://www.youtube.com//embed/M2WoS2mSEOY",
    "https://www.youtube.com//embed/nyoWsqG5QgQ",
    "https://www.youtube.com//embed/Qcw1SMbC8W8",
    "https://www.youtube.com//embed/IYkR6YaYKLY",
    "https://www.youtube.com//embed/It64FQZfj4g",
    "https://www.youtube.com//embed/6s7p4tExCJw"
]

export const FeedBackPeople:FC<feedBackProps> = (props) => {

    const {
        classname,
    } = props;

    return (
        <div className={classNames(cls.feedBack, {},[classname] )} >
            <div className={cls.cover}>
                <div className={cls.section}>
                    <h1 className={cls.mainTitle}>Отзывы наших клиентов</h1>
                </div>
                <div className={cls.video}>
                    {linksVideoFeedBack?.length >= 1 && linksVideoFeedBack.map((item) =>
                        <div
                            key={item}
                            className={cls.videoWrapper}
                        >
                            <div className={cls.item_video}>
                                <iframe
                                    className={cls.frame}
                                    src={item}
                                    allowFullScreen
                                    title="YouTube Video"
                                ></iframe>
                            </div>
                        </div>
                    )}
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

