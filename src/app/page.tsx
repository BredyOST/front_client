import React, {FC} from 'react';
import cls from './page.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import HomePageBtn from "@/app/components/clientBtnForHomePage/homePageBtn/homePageBtn";

async function getData() {
    let categories = [];

    try {
        const categoriesRes = await fetch('http://localhost:7777/categories/getAll', { next: { revalidate: 120}})
        categories = await categoriesRes.json();
    } catch (err) {

    }

    return { categories };
}

interface pageProps {
    classname?: string;
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
    const { classname } = props;

    const {
        categories
    } = await getData();

    return (
        <div className={classNames(cls.page, {},[classname] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}><span>Клиенты.com</span> - Сервис для поиска потенциальных клиентов</h1>
                        <h3 className={cls.howWorks}>Как работает поиск?</h3>
                        <div className={cls.text}>
                            Миллионы пользователей ежедневно публикуют в интернет площадках посты, сообщения, которые содеражат ифнормацию:
                        </div>
                        <div className={cls.coverFor}>
                            {textSecond?.length && textSecond.map((item) =>
                                <div key={item.id} className={cls.searchText}>
                                    <p>{item.text}</p>
                                </div>
                            )}
                        </div>
                        <div className={cls.textFree}>
                            Сервис <span> Клиенты.com </span> имеет доступ к этим сообщениям и он сделает все за вас!
                        </div>
                        <ul className={cls.textCover}>
                            <li className={cls.textFree}>
                                Вам нужно только ввести данные для запроса, выбрать категорию и получить потенциальных клиентов с контактной информацией для связи с ними.
                            </li>
                        </ul>
                        <div className={cls.recommend}>
                            <div className={cls.coverLastBlock}>
                                {textFour?.length && textFour.map((item) =>
                                    <h3 key={item.id} className={cls.blockEnd}>
                                        {item.text}
                                    </h3>
                                )}
                            </div>
                            <HomePageBtn/>
                        </div>
                    </div>
                    <div className={cls.category}>
                        <h3 className={cls.titleMainCategory}>Список доступных категорий</h3>
                        <div className={cls.coverCategory}>
                            {
                                categories && categories.map((item:ICategory) =>
                                <div className={cls.titleCategory}>
                                    <div className={cls.name}>{item.name}</div>
                                    <div className={cls.description}>{item.description}</div>
                                </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export  default Home;
