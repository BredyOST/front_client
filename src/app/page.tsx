import React from 'react';
import cls from './page.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import HomePageBtn from "@/app/components/clientBtnForHomePage/homePageBtn/homePageBtn";
import {Button} from "@/app/components/shared/ui/Button/Button";

async function getData() {
    let categories = [];

    try {
        const categoriesRes = await fetch(`http://95.213.208.27/categories/getAll`, { next: { revalidate: 120}})
        console.log(categoriesRes)
        if (categoriesRes.ok) {
            const responseData = await categoriesRes.json();
            if( responseData.length) categories = responseData
        } else {
            console.error('Categories API request failed with status:', categoriesRes.status);
        }
    } catch (err) {

    }

    return { categories };
}

interface pageProps {
}

const textSecond = [
    {id:1, text:'Требуется репетитор'},
    {id:2, text:'В поисках няни'},
    {id:3, text:'Нужен электрик'},
]

const textFour = [
    {id:1, text:'Попробуй бесплатный период!'},
]

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

    const {categories} = await getData();

    return (
        <div className={classNames(cls.page, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <h1 className={cls.mainTitle}><span>Клиенты.com</span> - cервис для поиска потенциальных клиентов</h1>
                    <div className={cls.coverMain}>
                        <div className={cls.category}>
                            <h3 className={cls.titleMainCategory}>Категории</h3>
                            <div className={cls.coverCategory}>
                                {
                                    categories && categories.map((item:ICategory) =>
                                        <Button
                                            className={cls.titleCategory}
                                            key={item.id}
                                        >
                                            <div className={cls.name}>{item.name}</div>
                                        </Button>
                                    )
                                }
                            </div>
                        </div>
                        <div className={cls.section}>
                            <HomePageBtn/>
                            <div className={cls.coverVideo}>
                                <h3 className={cls.howWorks}>Как пользоваться сайтом</h3>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export  default Home;
