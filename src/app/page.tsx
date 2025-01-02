import React from 'react';
import cls from './page.module.scss'
import LineSvg from "@/assets/svgs/line.svg";
import VectorSvg from "@/assets/svgs/vector.svg";
import FeedBackPeople from "@/app/components/mainPage/feedBackPeople/feedBackPeople";
import HomePageBtn from "@/app/components/mainPage/homePageBtn/homePageBtn";


interface pageProps {}

async function Home( props:pageProps ) {

    const {} = props;

    return (
        <div className={cls.page}>
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.coverTitle}>
                        <h1 className={cls.mainTitle}>СЕРВИС ДЛЯ ПОИСКА КЛИЕНТОВ</h1>
                        <div className={cls.instructions}>
                            <div className={cls.basic}>Как пользоваться сайтом?
                                <LineSvg className={cls.svgLine}/>
                            </div>
                            <div>Смотри видео</div>
                        </div>
                    </div>
                    <div className={cls.coverMain}>
                        <div className={cls.sectionText}>
                            <div className={cls.firstBlock}>
                                <div className={cls.textInfo}>Общайтесь с клиентами напрямую без комиссий. Более <span>2000</span> заявок в день.</div>
                                <div className={cls.textInfo}>Попробуйте бесплатный доступ на <span>1 день</span>, и оцените все возможности сервиса.</div>
                            </div>
                            <div className={cls.btnBlock}>
                                <HomePageBtn/>
                            </div>
                        </div>
                        <div className={cls.section}>
                            <div className={cls.coverVideo}>
                                <div className={cls.videoWrapper}>
                                    <div className={cls.item_video}>
                                        <iframe
                                            className={cls.frame}
                                            src="https://www.youtube.com/embed/gMzs7QeXQiE"
                                            allowFullScreen
                                            title="YouTube Video"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cls.howWorks}>
                    <div className={cls.mainBlock}>
                        <h3 className={cls.titleTwo}>Как это работает?</h3>
                        <div className={cls.cycle}>
                            <div className={cls.blockNumbers}>
                                <div className={cls.num}>1</div>
                                <div className={cls.textUpperTwo}>Клиенты создают заказы, делают запросы на различных площадках, социальных сетях. Это все собирается на сайте.</div>
                            </div>
                            <div className={cls.line}>
                                <div className={cls.textUpper}>Клиенты создают заказы, делают запросы на различных площадках, социальных сетях. Это все собирается на сайте.</div>
                            </div>
                            <div className={cls.blockNumbers}>
                                <div className={cls.num}>2</div>
                                <div className={cls.textUpperTwo}>Вы выбираете категорию и заинтересовавшие вас заказы.</div>
                            </div>
                            <div className={cls.line}>
                                <div className={cls.textUpper}>Вы выбираете категорию и заинтересовавшие вас заказы.</div>
                            </div>
                            <div className={cls.blockNumbers}>
                                <div className={cls.num}>3</div>
                                <div className={cls.textUpperTwo}>Пишите клиенту и обсуждаете условия.</div>
                            </div>
                            <div className={cls.line}>
                                <div className={cls.textUpper}>Пишите клиенту и обсуждаете условия.</div>
                            </div>
                            <div className={cls.blockNumbers}>
                                <div className={cls.num}>4</div>
                                <div className={cls.textUpperTwo}>Предоставляете услугу и получаете оплату от клиента напрямую.</div>
                            </div>
                            <div className={cls.line}>
                                <div className={cls.textUpper}>Предоставляете услугу и получаете оплату от клиента напрямую.</div>
                            </div>
                            <div className={cls.blockNumbers}>
                                <div className={`${cls.num} ${cls.fill}`}> <VectorSvg className={cls.vector}/></div>
                            </div>
                        </div>
                    </div>
                </div>
                <FeedBackPeople/>
            </div>
        </div>
    );
};

export default Home;
