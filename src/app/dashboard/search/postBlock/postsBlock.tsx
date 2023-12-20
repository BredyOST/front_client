'use client';
import React, {FC} from 'react';
import cls from './postsBlock.module.scss'
import Link from "next/link";
import {Button} from "@/app/components/shared/ui/Button/Button";
import LinkSvg from '../../../components/svgs/link.svg';
import {useAppSelector} from "@/app/redux/hooks/redux";
import {useGetNanniesPostsMutation, useGetTutorsPostsMutation} from "@/app/redux/entities/requestApi/requestApi";

interface postsBlockProps {
    classname?: string;
    posts:any;
    date:Date,
}

interface CategoryToRequestFunction {
    [key: string]: any;
    // Здесь 'MutationTrigger<...>' - это тип значения, которое вы ожидаете в объекте.
    // Вам нужно заменить его на фактический тип, который соответствует вашему объекту.
}

const PostsBlock:FC<postsBlockProps> = (props) => {
    const {
        classname,
        posts,
        date,
    } = props;

    //ACTIONS FROM REDUX

    // Запрос на регистрацию пользователя
    let [turorsGet, {
        data: tutorsPostsRes, error: tutorsError, isError: isErrorTutors,  isLoading: loadingTutors,
    }] = useGetTutorsPostsMutation()
    let [nanniesGet, {
        data: nanniesPostsRes, error: nanniesError, isError: isErrorNannies,  isLoading: loadingNannies,
    }] =   useGetNanniesPostsMutation()

    let categoryToRequestFunction:CategoryToRequestFunction = {
        'Для репетиторов': turorsGet,
        'Поиск домашнего персонала': nanniesGet,
    }

    //STATES FROM REDUX
    const {chosenCategory, keyWords, keyCityWords, postsCount, social} = useAppSelector(state => state.searchParams)
    //USESTATE
    const [expandedPosts, setExpandedPosts] = React.useState<number[]>([]);
    const [page, setPage] = React.useState<number>(1); // номер страницы
    const [filteredPosts, setFilteredPosts] = React.useState<any>([]); // Добавили состояние для отфильтрованных постов
    const [postsFromDataBase, setPostsFromDataBase] = React.useState<any[] | null>(null)
    // const [prevCategory, setPrevCategory] = React.useState<string | undefined>(undefined) // для отслеживания смены категории и отправки запроса

    const [lastRequestTimesCategory, setLastRequestTimesCategory] = React.useState([
        { id: 1, name:'Для репетиторов', lastRequestTime: date, filterLastDate:date },
        { id: 2, name:'Поиск домашнего персонала', lastRequestTime: date, filterLastDate:date },
    ]);

    //USEREF
    console.log(posts.length)
    //FUNCTIONS

    React.useEffect(() =>  {

        const currentDate = new Date();
        let thisCategoryDateStart = lastRequestTimesCategory.find((item) => item.id == chosenCategory?.id)

        if(thisCategoryDateStart && !thisCategoryDateStart?.lastRequestTime) {
            setPostsFromDataBase(posts);
            const updatedLastRequestTimesCategory = lastRequestTimesCategory.map(item =>
                item.id === chosenCategory?.id ? { ...item, lastRequestTime: currentDate } : item
            );
            setLastRequestTimesCategory(updatedLastRequestTimesCategory);
        } else {

            const startDate = thisCategoryDateStart?.lastRequestTime;

            if (startDate) {

                const differenceInMilliseconds = currentDate.getTime() - startDate?.getTime();
                const minutesDifference = Math.round(differenceInMilliseconds / (1000 * 60));

                if(minutesDifference > 0) {

                    const updatedLastRequestTimesCategory = lastRequestTimesCategory.map(item =>
                        item.id === chosenCategory?.id ? { ...item, lastRequestTime: currentDate } : item
                    );

                    const categoryName = chosenCategory?.name;

                    if (categoryName) {
                        const requestFunction = categoryToRequestFunction[categoryName];

                        if (requestFunction) {
                            requestFunction('').then((results:any) => {
                                if (results) {
                                    setPostsFromDataBase('data' in results && results?.data);
                                    setLastRequestTimesCategory(updatedLastRequestTimesCategory);
                                    console.log(results);
                                }
                            });
                        }
                    }

                } else {
                    setPostsFromDataBase(posts);
                }
            } else {
                setPostsFromDataBase(posts);
            }
        }
    },[chosenCategory])

    React.useEffect(() =>  {

        const currentDate = new Date();
        let thisCategoryDateStart = lastRequestTimesCategory.find((item) => item.id == chosenCategory?.id)

        if(thisCategoryDateStart && !thisCategoryDateStart?.filterLastDate) {
            const updatedLastRequestTimesCategory = lastRequestTimesCategory.map(item =>
                item.id === chosenCategory?.id ? { ...item, filterLastDate: currentDate } : item
            );
            setLastRequestTimesCategory(updatedLastRequestTimesCategory);
        } else {

            const startDate = thisCategoryDateStart?.filterLastDate;

            if (startDate) {

                const differenceInMilliseconds = currentDate.getTime() - startDate?.getTime();
                const minutesDifference = Math.round(differenceInMilliseconds / (1000 * 60));

                if (minutesDifference > 0) {

                    const updatedLastRequestTimesCategory = lastRequestTimesCategory.map(item =>
                        item.id === chosenCategory?.id ? {...item, filterLastDate: currentDate} : item
                    );
                    const categoryName = chosenCategory?.name;

                    if (categoryName) {

                        const requestFunction = categoryToRequestFunction[categoryName];

                        if (requestFunction) {
                            requestFunction('').then((results: any) => {
                                if (results) {
                                    setPostsFromDataBase('data' in results && results?.data);
                                    setLastRequestTimesCategory(updatedLastRequestTimesCategory);
                                    console.log(results);
                                }
                            });
                        }
                    }
                }
            }
        }
    }, [keyWords, keyCityWords, social, postsCount])

    // ТУТ ПЕРЕДЕЛАТЬ ИНДИКАТОР СОЦ СЕТИ, СДЕЛАТЬ ID в базе данных
    // Функция фильтрации постов
    const filterPosts = React.useCallback(() => {

        if ((!keyWords || !keyWords?.length) && (!keyCityWords || !keyCityWords?.length)) {
            if(postsFromDataBase && postsFromDataBase?.length) {
                setFilteredPosts(postsFromDataBase)
            } else {
                setFilteredPosts(posts)
            }
            return
        }

        const filtered = postsFromDataBase?.filter((post: any) => {
            const matchesWords = !keyWords.length ||  keyWords.some((word) =>
                post.post_text.toLowerCase().includes(word.toLowerCase())
            );

            const matchesCity = !keyCityWords?.length ||  (keyCityWords?.some((word) =>
                post.city_group?.toLowerCase().includes(word.toLowerCase()))) ||  (keyCityWords?.some((word) =>
                post.city_user?.toLowerCase().includes(word.toLowerCase())));
            return matchesWords && matchesCity
        });

        setFilteredPosts(filtered)

    }, [posts, keyWords, keyCityWords, social, postsCount, chosenCategory, postsFromDataBase]);

    // Вызываем функцию фильтрации каждый раз, когда меняются фильтры или данные постов
    React.useEffect(() => {
        filterPosts();
        setPage(1); // Сбрасываем на первую страницу при изменении фильтров
    }, [filterPosts]);

    // Пагинация
    const pageCount = Math.ceil(filteredPosts?.length / postsCount);
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    const startIndex = (page - 1) * postsCount;
    const endIndex = startIndex + postsCount;
    const postsToShow = filteredPosts?.slice(startIndex, endIndex);

    const toggleText = (postId: number) => {
        if (expandedPosts.includes(postId)) {
            setExpandedPosts(prevState => prevState.filter(id => id !== postId));
        } else {
            setExpandedPosts(prevState => [...prevState, postId]);
        }
    };

    function getFormattedDate(dateString:any) {
        const date = new Date(dateString * 1000);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const weekday = date.getDay();

        const months = [
            "янв.", "февр.", "марта", "апр.",
            "мая", "июня", "июля", "авг.",
            "сент.", "окт.", "ноя.", "дек."
        ];

        if (date.toDateString() === today.toDateString()) {
            return "Сегодня";
        }

        if (date.toDateString() === yesterday.toDateString()) {
            return "Вчера";
        }

        return `${day} ${months[+month - 1]} ${year} г.`;
    }

    function getFormattedTime(dateString:any) {
        const date = new Date(dateString * 1000);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    const changePage = (pageNumber:number) => {
        setPage(pageNumber)
    }

    const displayPages = () => {
        if (page <= 4) {
            return pages.slice(0, 6);
        } else if (page > pageCount - 4) {
            return pages.slice(-6);
        } else {
            return pages.slice(page - 3, page + 3);
        }
    };

    const pagesToDisplay = displayPages();

    return (
        <div className={cls.bodyInfo}>
            {postsToShow && postsToShow?.length > 0 &&
                postsToShow.map((item: any) => (
                    <div
                        key={item.id}
                        className={cls.rows}>
                        <div className={cls.blockCategories}>{chosenCategory?.name}</div>
                        <div className={cls.blockDate}>
                            <div>{getFormattedDate(item.post_date_publish)}</div>
                            <div>{getFormattedTime(item.post_date_publish)}</div>
                        </div>
                        <div className={cls.blockUser}>
                            {!item.signer_id
                                ? <Link className={cls.link}
                                    href={`https://vk.com/wall${item.post_owner_id}_${item.post_id}`}
                                    target="_blank">
                                    <div className={cls.linkTop}>
                                        ссылка
                                        <LinkSvg
                                            className={cls.linkSvg}
                                        />
                                    </div>
                                    <div className={cls.rightLinkSvg}>
                                        {item.photo_100_group && <img className={cls.imageGroup} src={item.photo_100_group} alt=""/>}
                                        <div className={cls.nameGroup}>
                                            {item.name_group}
                                        </div>
                                    </div>
                                    {item.identification_post == 'vk' && <div>vk</div>}
                                </Link>
                                : <Link className={cls.link}
                                    href={`https://vk.com/id${item.signer_id}`}
                                    target="_blank">
                                    <div className={cls.linkTop}>
                                        ссылка
                                        <LinkSvg
                                            className={cls.linkSvg}
                                        />
                                    </div>
                                    <div className={cls.rightLinkSvg}>
                                        {item.photo_100_user && <img className={cls.image} src= {item.photo_100_user} alt=""/>}
                                        <div className={cls.nameGroup}>
                                            {item.first_name_user || item.last_name_user &&
                                                <div className={cls.nameBlock}>
                                                    <div>
                                                        {item.first_name_user}
                                                    </div>
                                                    <div>
                                                        {item.last_name_user}
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                </Link>
                            }
                        </div>
                        <div className={cls.blockText}>
                            <Link className={cls.linkText}
                                href={`https://vk.com/wall${item.post_owner_id}_${item.post_id}`}
                                target="_blank"
                            >
                                <div className={cls.linkTop}>
                                    ссылка
                                    <LinkSvg
                                        className={cls.linkSvg}
                                    />
                                </div>
                                {expandedPosts.includes(item.id) || item.post_text.length <= 350
                                    ? item.post_text
                                    : `${item.post_text.slice(0, 350)}...`
                                }
                            </Link>
                            {item.post_text.length > 350 &&
                                <div className={cls.coverBtnShow}>
                                    <Button classname={cls.showTextBtn}
                                        onClick={() => toggleText(item.id)}
                                    >
                                        {expandedPosts.includes(item.id) ? "Скрыть текст" : "Показать скрытый текст"}
                                    </Button>
                                </div>
                            }
                        </div>
                        <div className={cls.blockCity}>
                            {!item.city_group && !item.country_group &&
                                <div>информация отсутствует</div>
                            }
                            {item.city_group && <div>{item.city_group}</div>}
                            {item.country_group && <div>{item.country_group}</div>}
                            <div>
                                {item.city_user && <div>{item.city_user}</div>}
                                {item.country_user && <div>{item.country_user}</div>}
                            </div>
                        </div>
                    </div>
                ))
            }
            <div className={cls.coverPageBtn}>
                {page > 4 && (
                    <>
                        <Button
                            classname={`${cls.pageBtn} ${cls.size}`}
                            onClick={() => changePage(1)}
                        >
                            {"В начало"}
                        </Button>
                        <Button
                            classname={cls.pageBtn}
                            onClick={() => changePage(page - 5)}
                        >
                            {"<"}
                        </Button>
                    </>
                )}
                {pagesToDisplay.map((item) => (
                    <Button
                        key={item}
                        classname={`${cls.pageBtn} ${page === item && cls.active}`}
                        onClick={() => changePage(item)}
                    >
                        {item}
                    </Button>
                ))}
                {page < pageCount - 4 && (
                    <>
                        <Button
                            classname={cls.pageBtn}
                            onClick={() => changePage(page + 5)}
                        >
                            {">"}
                        </Button>
                        <Button
                            classname={`${cls.pageBtn} ${cls.size}`}
                            onClick={() => changePage(pageCount)}
                        >
                            {"В конец"}
                        </Button>
                    </>
                )}

            </div>
        </div>
    );
};

export default PostsBlock;