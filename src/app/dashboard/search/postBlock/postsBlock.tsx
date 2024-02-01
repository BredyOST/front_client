'use client';
import React, {FC} from 'react';
import cls from './postsBlock.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetAllKeysRedisMutation, useGetPostsRedisMutation,
} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import Link from "next/link";
import VkSvg from "./../../../components/svgs/vk.svg"

interface postsBlockProps {

}

const PostsBlock:FC<postsBlockProps> = (props) => {
    const {} = props;

    //ACTIONS FROM REDUX

    // Запрос на регистрацию пользователя
    let [keysRedis, {
        data: keysRedisRes, error: keysRedisError, isError: isErrorkeysRedis,  isLoading: loadingkeysRedis,
    }] = useGetAllKeysRedisMutation()
    let [redisPosts, {
        data: redisPostsRes, error: redisPostsError, isError: isErrorRedisPosts,  isLoading: loadingRedisPosts,
    }] = useGetPostsRedisMutation()

    //STATES FROM REDUX
    const {chosenCategory, keyWords, keyCityWords, postsCount, social} = useAppSelector(state => state.searchParams)
    //USESTATE
    const [expandedPosts, setExpandedPosts] = React.useState<number[]>([]);
    const [page, setPage] = React.useState<number>(1); // номер страницы
    const [filteredPosts, setFilteredPosts] = React.useState<any>([]); // Добавили состояние для отфильтрованных постов
    console.log(chosenCategory)
    //USEREF

    //FUNCTIONS

    // функция фильтрации
    const applyFilters =(allLoadedPosts:any) => {
        if ((!keyWords || !keyWords?.length) && (!keyCityWords || !keyCityWords?.length)) {
            return allLoadedPosts;
        }
        const filtered = allLoadedPosts?.filter((post: any) => {
            const matchesWords = !keyWords.length || keyWords.some((word:string) =>
                post.post_text.toLowerCase().includes(word.toLowerCase())
            );

            const matchesCity = !keyCityWords?.length || (keyCityWords?.some((word:string) =>
                post.city_group?.toLowerCase().includes(word.toLowerCase()))) || (keyCityWords?.some((word:string) =>
                post.city_user?.toLowerCase().includes(word.toLowerCase())));
            return matchesWords && matchesCity
        });
        return filtered;
    }

    // Функция для извлечения начального индекса из ключа
    const getStartIndexFromKey = (key:string) => {
        const parts = key.split('-');
        const index = parseInt(parts[1], 10);
        return index;
    };

    // получиь ключи по категории
    const getKeys = async (idCat: string | number) => {
        let result = [];
        try {
            const response = await keysRedis({ id: `${idCat}` });
            if ('data' in response && response.data.length) {
                const dataCopy = [...response.data];
                result = dataCopy.sort((a, b) => getStartIndexFromKey(a) - getStartIndexFromKey(b));
            } else {
                result = [];
            }
        } catch (error) {
            console.error('Error getting keys from Redis:', error);
        }
        return result;
    };

    const loadPostsFromRedis = async (i:number, keys:string[]) => {

        let result = [];

        try {
            const response = await redisPosts({str: keys[i]});
            if ('data' in response && response.data) {
                result = response.data
            } else {
                result = []; // Обработка ситуации с пустым массивом
            }
        } catch (error) {
            console.error('Error getting keys from Redis:', error);
        }
        return result;
    }

    const loadMorePostsIfNeeded = async (currentPage:string | number) => {
        const postsPerPage = postsCount; // количество постов на страницу 10, 30, 50
        const neededPosts = +currentPage * (postsPerPage + 3); // 2 * (10 + 3) =
        const postsInKey = 300; // количество постов в одном ключе

        // Проверяем, достаточно ли у нас постов
        if (neededPosts >= filteredPosts.length - postsCount) {
            if(filteredPosts.length < postsInKey) return
            // Вычисляем, какой ключ использовать для загрузки новых постов
            let keys = []
            if(chosenCategory?.id) {
                keys = await getKeys(chosenCategory?.id);
            }
            const keyIndex = Math.ceil(filteredPosts.length / postsInKey); // 300 / 300 = 1, 900/300 = 3
            // const keyToLoad = keys[keyIndex]; // если будет так 900/300 = 3 то значит ключи 0, 1, 2 использовали 300 + 300 + 300
            // Загрузка новых постов
            const newPosts = await loadPostsFromRedis(keyIndex, keys);
            if (newPosts && newPosts.length) {
                // Обновление состояния с новыми постами
                const updatedPosts = [...filteredPosts, ...newPosts];
                setFilteredPosts(updatedPosts.sort((a, b) => a.data - b.data))
            }
        }
    };

    React.useEffect(() => {
        loadMorePostsIfNeeded(page); // вызываем при смене страницы
    }, [page]);

    React.useEffect(() =>  {
        setPage(1)
    }, [chosenCategory])

    React.useEffect(() =>  {
        //Функция для Загрузки и Фильтрации Постов:
        const loadAndFilterPosts = async () => {
            let postsToLoad = 300; // начальное количество постов для загрузки
            let allLoadedPosts:any = []; // массив для всех загруженных постов
            let filteredPosts= [];
            let keys:string[] = [];
            let i = 0;

            if (chosenCategory && chosenCategory.id) keys = await getKeys(chosenCategory?.id)
            while (allLoadedPosts.length < postsToLoad) {
                const newPosts = await loadPostsFromRedis(i, keys); // функция для загрузки постов из Redis
                if (!newPosts.length) {
                    break;
                }

                allLoadedPosts = [...allLoadedPosts, ...newPosts];

                filteredPosts = applyFilters(allLoadedPosts); // функция для применения фильтров
                setFilteredPosts(filteredPosts.sort((a:any, b:any) => a.data - b.data))
                if (filteredPosts.length >= postsToLoad) {
                    break;
                }

                postsToLoad += 300; // увеличиваем количество постов для следующей загрузки
                i++;
            }
        };
        loadAndFilterPosts()
    }, [keyWords, keyCityWords, social, postsCount, chosenCategory])

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
                        <div className={cls.mainBlock}>
                            <div>{getFormattedDate(item.post_date_publish)}</div>
                            <div>{getFormattedTime(item.post_date_publish)}</div>
                            {item.identification_post == 'vk' && <div className={cls.identificator}><VkSvg/></div>}
                        </div>
                        <div className={cls.secondBlock}>
                            <div className={cls.blockUser}>
                                {!item.signer_id
                                    ? <Link className={cls.link}
                                        href={`https://vk.com/wall${item.post_owner_id}_${item.post_id}`}
                                        target="_blank">
                                        <div className={cls.rightLinkSvg}>
                                            {item.photo_100_group && <img className={cls.imageGroup} src={item.photo_100_group} alt=""/>}
                                            <div className={cls.nameGroup}>
                                                {item.name_group}
                                            </div>
                                        </div>
                                    </Link>
                                    : <Link className={cls.link}
                                        href={`https://vk.com/id${item.signer_id}`}
                                        target="_blank">
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
                                    {/*<div className={cls.linkTop}>*/}
                                    {/*    ссылка*/}
                                    {/*    <LinkSvg*/}
                                    {/*        className={cls.linkSvg}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {expandedPosts.includes(item?.id) || item?.post_text?.length <= 350
                                        ? item?.post_text
                                        : `${item.post_text?.slice(0, 350)}...`
                                    }
                                </Link>
                                {item?.post_text?.length > 350 &&
                                    <div className={cls.coverBtnShow}>
                                        <Button classname={cls.showTextBtn}
                                            onClick={() => toggleText(item.id)}
                                        >
                                            {expandedPosts.includes(item.id) ? "Скрыть текст" : "Показать скрытый текст"}
                                        </Button>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={cls.blockCity}>
                            <div className={cls.cityBlockOne}>
                                {!item.city_group && !item.country_group &&
                                    <div className={cls.noInfo}>информация отсутствует</div>
                                }
                                {item.city_group && <div className={cls.noInfo}>{item.city_group}</div>}
                                {item.country_group && <div className={cls.noInfo}>{item.country_group}</div>}
                            </div>
                            <div className={cls.cityBlockTwo}>
                                {item.city_user && <div className={cls.noInfo}>{item.city_user}</div>}
                                {item.country_user && <div className={cls.noInfo}>{item.country_user}</div>}
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
            {/*{ loadingkeysRedis*/}
            {/*    && (*/}
            {/*        <Loader*/}
            {/*            classname="color-dark"*/}
            {/*        />*/}
            {/*    )}*/}
            { loadingRedisPosts
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default PostsBlock;