'use client'
import React, {FC} from 'react';
import cls from './feedBackPeople.module.scss'
import {AppLink} from "@/app/components/shared/ui/appLink/appLink";
import {LINKS_VIDEO_FEEDBACK} from "@/app/utils/index.constants";
import {LinkVideoType} from "@/app/types/types";
export const FeedBackPeople = () => {

    return (
        <div className={cls.feedBack} >
            <div className={cls.cover}>
                <div className={cls.section}>
                    <h1 className={cls.mainTitle}>Отзывы наших клиентов</h1>
                </div>
                <div className={cls.video}>
                    {LINKS_VIDEO_FEEDBACK?.length >= 1 && LINKS_VIDEO_FEEDBACK.map((item:LinkVideoType) =>
                        <div
                            key={item.id}
                            className={cls.videoWrapper}
                        >
                            <div className={cls.item_video}>
                                <iframe
                                    className={cls.frame}
                                    src={item.link}
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

