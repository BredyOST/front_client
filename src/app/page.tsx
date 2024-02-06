import React from 'react';
import cls from './page.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import HomePageBtn from "@/app/components/clientBtnForHomePage/homePageBtn/homePageBtn";
import {FeedBackPeople} from "@/app/components/mainPage/feedBackPeople/feedBackPeople";
import Burger from "@/app/components/mainPage/burger/burger";
import { MetadataRoute } from 'next';

async function getData() {
    let categories = [];
    let feedback = [];

    try {
        const categoriesRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/categories/getAll`, { next: { revalidate: 120}})
        if (categoriesRes.ok) {
            const responseData = await categoriesRes.json();
            if( responseData.length >= 1) categories = responseData
        } else {
            console.error('Categories API request failed with status:', categoriesRes.status);
        }
    } catch (err) {

    }

    try {
        const feedbackRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/files/getAllStart`, { next: { revalidate: 500 } })
        if (feedbackRes.ok) {
            const feedbackData = await feedbackRes.json();
            if( feedbackData.length >= 1) feedback = feedbackData
        } else {
            console.error('feedbackRes API request failed with status:', feedbackRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }

    return {feedback, categories};
}


interface pageProps {
}

export interface ICategory {
    id: number
    id_category: string
    name: string
    description: string
    positiveWords: string[]
    negativeWords: string[]
    createdAt: Date
    updateAt: Date
}


async function Home(props:pageProps) {
    const {} = props;
    const {categories, feedback} = await getData();

    const categ = categories.filter((item:any) => item.show)


    return (
        <div className={classNames(cls.page, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <h1 className={cls.mainTitle}><span>Клиенты.com</span> - Сервис для поиска клиентов</h1>
                    <div className={cls.coverMain}>
                        <Burger
                            categ = {categ}
                        />
                        <div className={cls.section}>
                            <div className={cls.coverVideo}>
                                <div className={cls.videoWrapper}>
                                    <div className={cls.item_video}>
                                        {/*<iframe*/}
                                        {/*    className={cls.frame}*/}
                                        {/*    width="560"*/}
                                        {/*    height="315"*/}
                                        {/*    src="https://www.youtube.com/embed/nyoWsqG5QgQ"*/}
                                        {/*    frameBorder="0"*/}
                                        {/*    allowFullScreen*/}
                                        {/*    title="YouTube Video"*/}
                                        {/*></iframe>*/}
                                        <video poster='https://timgotow.ru/uploads/e8fb9f338255bb72d4.png' controls preload="metadata">
                                            <source type="video/mp4" src="https://www.youtube.com/watch?v=nyoWsqG5QgQ"/>
                                            {/*<source type="video/mp4" src="https://timgotow.ru/uploads/768abc98d7a19a6a93.mp4"/>*/}
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </div>
                                <HomePageBtn/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.coverFeedBack}>
                <div className='page__container'>
                    <FeedBackPeople
                        pictures = {feedback}
                    />
                </div>
            </div>
        </div>
    );
};

export  default Home;
