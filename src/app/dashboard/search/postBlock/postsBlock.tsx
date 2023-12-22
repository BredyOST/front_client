'use client';
import React, {FC} from 'react';
import cls from './postsBlock.module.scss'
import Link from "next/link";
import {Button} from "@/app/components/shared/ui/Button/Button";
import LinkSvg from '../../../components/svgs/link.svg';
import {useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetAllKeysRedisMutation,
    useGetNanniesPostsMutation, useGetPostsRedisMutation,
    useGetTutorsPostsMutation
} from "@/app/redux/entities/requestApi/requestApi";
import cards from "@/app/dashboard/price/cards/cards";

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

type IRequest = {
    id: number | string
    name:string
    lastRequestTime: null | Date,
    filterLastDate:null | Date,
    search:boolean
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
    let [keysRedis, {
        data: keysRedisRes, error: keysRedisError, isError: isErrorkeysRedis,  isLoading: loadingkeysRedis,
    }] = useGetAllKeysRedisMutation()
    let [redisPosts, {
        data: redisPostsRes, error: redisPostsError, isError: isErrorRedisPosts,  isLoading: loadingRedisPosts,
    }] = useGetPostsRedisMutation()

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

    const [lastRequestTimesCategory, setLastRequestTimesCategory] = React.useState<IRequest[]>([
        { id: 1, name:'Для репетиторов', lastRequestTime: null, filterLastDate:null, search:false },
        { id: 2, name:'Поиск домашнего персонала', lastRequestTime: null, filterLastDate:null, search:false  },
    ]);

    //USEREF

    //FUNCTIONS

    // const requestToPost = () => {
    //
    //     const currentDate = new Date();
    //     // let thisCategoryDateStart = lastRequestTimesCategory.find((item) => item.id == chosenCategory?.id)
    //     const categoryName = chosenCategory?.name;
    //
    //     if (chosenCategory) {
    //         keysRedis({id:`${chosenCategory?.id}`}).then((results:any) => {
    //             if (results?.data?.length) {
    //                 // console.log(results)
    //                 redisPosts({str: results.data[0]}).then((results:any) => {
    //                     if (results?.data?.length) {
    //                         // console.log(results)
    //                         setPostsFromDataBase('data' in results && results?.data);
    //                         const updatedLastRequestTimesCategory = lastRequestTimesCategory.map(item =>
    //                             item.id === chosenCategory?.id ? { ...item, lastRequestTime: currentDate } : item
    //                         );
    //                         setLastRequestTimesCategory(updatedLastRequestTimesCategory);
    //                     } else {
    //                         setPostsFromDataBase(posts);
    //                     }
    //                 })
    //             } else {
    //                 setPostsFromDataBase(posts);
    //             }
    //         });
    //     }
    // }

    // функция фильтрации
    const applyFilters =(allLoadedPosts:any) => {

        if ((!keyWords || !keyWords?.length) && (!keyCityWords || !keyCityWords?.length)) {
            return allLoadedPosts;
        }

        const filtered = allLoadedPosts?.filter((post: any) => {
            const matchesWords = !keyWords.length || keyWords.some((word) =>
                post.post_text.toLowerCase().includes(word.toLowerCase())
            );

            const matchesCity = !keyCityWords?.length || (keyCityWords?.some((word) =>
                post.city_group?.toLowerCase().includes(word.toLowerCase()))) || (keyCityWords?.some((word) =>
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
        const neededPosts = +currentPage * postsPerPage; // 2 * 30 = 60
        const postsInKey = 300; // количество постов в одном ключе

        // Проверяем, достаточно ли у нас постов
        if (neededPosts >= filteredPosts.length - postsCount) {
            // Вычисляем, какой ключ использовать для загрузки новых постов
            let keys = []

            if(chosenCategory?.id) {
                keys = await getKeys(chosenCategory?.id);
            }

            const keyIndex = Math.floor(filteredPosts.length / postsInKey); // 300 / 300 = 1, 900/300 = 3
            // const keyToLoad = keys[keyIndex]; // если будет так 900/300 = 3 то значит ключи 0, 1, 2 использовали 300 + 300 + 300

            // Загрузка новых постов
            const newPosts = await loadPostsFromRedis(keyIndex, keys);

            if (newPosts && newPosts.length) {
                // Обновление состояния с новыми постами
                const updatedPosts = [...filteredPosts, ...newPosts];
                setFilteredPosts(updatedPosts)
            }
        }
    };

    React.useEffect(() => {
        loadMorePostsIfNeeded(page); // вызываем при смене страницы
    }, [page]);

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
                if (!newPosts?.length && !posts) {
                    filteredPosts = []
                    break
                }
                if (!newPosts.length && posts && posts.length) {
                    console.log('s')
                    filteredPosts = posts
                    break
                }

                allLoadedPosts = [...allLoadedPosts, ...newPosts];

                filteredPosts = applyFilters(allLoadedPosts); // функция для применения фильтров

                if (filteredPosts.length >= postsToLoad || newPosts.length === 0) {
                    break;
                }
                postsToLoad += 300; // увеличиваем количество постов для следующей загрузки
                break
            }
            console.log(filteredPosts)
            setFilteredPosts(filteredPosts)
        };

        loadAndFilterPosts()

    }, [keyWords, keyCityWords, social, postsCount, chosenCategory])


    // React.useEffect(() =>  {
    //
    //     requestToPost();
    //
    // },[chosenCategory])

    // React.useEffect(() =>  {
    //
    //     const currentDate = new Date();
    //     let thisCategoryDateStart = lastRequestTimesCategory.find((item) => item.id == chosenCategory?.id)
    //
    //     if(thisCategoryDateStart && !thisCategoryDateStart?.lastRequestTime) {
    //
    //         requestToPost()
    //
    //     } else {
    //
    //         const startDate = thisCategoryDateStart?.lastRequestTime;
    //
    //         if (startDate) {
    //
    //             const differenceInMilliseconds = currentDate.getTime() - startDate?.getTime();
    //             const minutesDifference = Math.round(differenceInMilliseconds / (1000 * 60));
    //
    //             if (minutesDifference > 0) {
    //                 requestToPost()
    //             }
    //         }
    //     }
    // }, [keyWords, keyCityWords, social, postsCount])

    // ТУТ ПЕРЕДЕЛАТЬ ИНДИКАТОР СОЦ СЕТИ, СДЕЛАТЬ ID в базе данных
    // Функция фильтрации постов
    // const filterPosts = React.useCallback(() => {
    //     // console.log(postsFromDataBase)
    //     if ((!keyWords || !keyWords?.length) && (!keyCityWords || !keyCityWords?.length)) {
    //         if(postsFromDataBase && postsFromDataBase?.length) {
    //             setFilteredPosts(postsFromDataBase)
    //         } else {
    //             setFilteredPosts(posts)
    //         }
    //         return
    //     }
    //
    //     const filtered = postsFromDataBase?.filter((post: any) => {
    //         const matchesWords = !keyWords.length ||  keyWords.some((word) =>
    //             post.post_text.toLowerCase().includes(word.toLowerCase())
    //         );
    //
    //         const matchesCity = !keyCityWords?.length ||  (keyCityWords?.some((word) =>
    //             post.city_group?.toLowerCase().includes(word.toLowerCase()))) ||  (keyCityWords?.some((word) =>
    //             post.city_user?.toLowerCase().includes(word.toLowerCase())));
    //         return matchesWords && matchesCity
    //     });
    //
    //     setFilteredPosts(filtered)
    //
    // }, [posts, keyWords, keyCityWords, social, postsCount, chosenCategory, postsFromDataBase]);

    // Вызываем функцию фильтрации каждый раз, когда меняются фильтры или данные постов
    // React.useEffect(() => {
    //     filterPosts();
    //     setPage(1); // Сбрасываем на первую страницу при изменении фильтров
    // }, [filterPosts]);

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