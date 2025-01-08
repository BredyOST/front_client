'use client';
import React from 'react';
import cls from './postsBlock.module.scss'
import {useAppSelector} from "@/app/redux/hooks/redux";
import {
    useGetAllKeysRedisMutation, useGetPostsRedisMutation, useOpenLinkMutation,
} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/ui/Loader/Loader";
import Link from "next/link";
import VkSvg from "@/assets/svgs/vk.svg"
import TgSvg from "@/assets/svgs/telegram.svg"
import {useRouter} from "next/navigation";
import {Button} from "@/ui/Button/Button";
import {filteredCategoriesType} from "@/app/redux/entities/categories/categoriesSchema";

interface postsBlockProps {}

const lists = {
    1: 'vk',
    2: 'FL',
    3: 'FR',
}

type allLoadedPostType = {
    city_group:string
    city_user:string
    country_group:string
    country_user:string
    createdAt:string
    first_name_user:string
    id:number
    id_group:string
    identification_post:string
    last_name_user:string
    name_group:string
    photo_100_group:string
    photo_100_user:string
    post_date_publish:string
    post_fromId:string
    post_id:string
    post_owner_id:string
    post_text:string
    post_type:string
    signer_id:string
    updateAt:string
    userName: null | string
}
export interface IPostsBlock {
    categories?:filteredCategoriesType[],
}

const PostsBlock = ({categories}:IPostsBlock) => {

    let [keysRedis, {
        data: keysRedisRes, error: keysRedisError, isError: isErrorkeysRedis,  isLoading: loadingkeysRedis,
    }] = useGetAllKeysRedisMutation()
    let [redisPosts, {
        data: redisPostsRes, error: redisPostsError, isError: isErrorRedisPosts,  isLoading: loadingRedisPosts,
    }] = useGetPostsRedisMutation()
    let [openThisLink, {
        data: linkRes, error: linkResError, isError: isErrorLinkRes,  isLoading: loadingLinkRes,
    }] = useOpenLinkMutation()

    const {chosenCategory, keyWords, keyCityWords, postsCount, social} = useAppSelector(state => state.searchParams)
    const {data:infoUser} = useAppSelector(state => state.auth)

    const [expandedPosts, setExpandedPosts] = React.useState<number[]>([]);
    const [page, setPage] = React.useState<number>(1);
    const [filteredPosts, setFilteredPosts] = React.useState<allLoadedPostType[]>([]);
    const [changedBalance, setChangedBalance] = React.useState<boolean>(false);

    const applyFilters =(allLoadedPosts:allLoadedPostType[]) => {

        if ((!keyWords || !keyWords?.length) && (!keyCityWords || !keyCityWords?.length)) {
            return allLoadedPosts;
        }
        let filtered = allLoadedPosts?.filter((post: allLoadedPostType) => {
            const matchesWords = !keyWords.length || keyWords.some((word:string) =>
                post.post_text.toLowerCase().includes(word.toLowerCase())
            );

            // constants matchesCity = !keyCityWords?.length || (keyCityWords?.some((word:string) =>
            //     post.city_group?.toLowerCase().includes(word.toLowerCase()))) || (keyCityWords?.some((word:string) =>
            //     post.city_user?.toLowerCase().includes(word.toLowerCase())));

            const matchesCity = !keyCityWords.length || (
                post.city_group ?
                    keyCityWords.some((word: string) =>
                        post.city_group.toLowerCase().includes(word.toLowerCase())
                    ) :
                    keyCityWords.some((word: string) =>
                        post.name_group?.toLowerCase().includes(word.toLowerCase())
                    )
            );

            // let filterSocial;
            // if(social) filterSocial = lists[social[0]]
            // constants matchesSocial;
            // for(let i  = 0; i <= social.length - 1; i++) {
            //     let number = +social[i]
            //     console.log(number)
            // if(lists[number]) {
            // }
            // }
            // !social || post?.identification_post?.toLowerCase() === filterSocial?.index.toLowerCase();

            // console.log(social)

            return matchesWords && matchesCity
        });

        return filtered;
    }

    const getStartIndexFromKey = (key:string) => {
        const parts = key.split('-');
        const index = parseInt(parts[1], 10);
        return index;
    };

    const getKeys = async (idCat: string | number) => {
        let result:string[] = [];

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
        let result:allLoadedPostType[] = [];

        try {
            const response = await redisPosts({str: keys[i]});
            if ('data' in response && response.data) {
                result = response.data
            } else {
                result = [];
            }
        } catch (error) {
            console.error('Error getting keys from Redis:', error);
        }
        return result;
    }

    const loadMorePostsIfNeeded = async (currentPage:string | number) => {

        const postsPerPage = postsCount;
        const neededPosts = +currentPage * (postsPerPage + 3);
        const postsInKey = 300;
        // check, do we need more posts ?
        if (neededPosts >= filteredPosts.length - postsCount) {
            if(filteredPosts.length < postsInKey) return
            // which keys we should use for loading posts
            let keys:string[]  = []
            if(chosenCategory?.id) {
                keys = await getKeys(chosenCategory?.id);
            }

            const keyIndex = Math.ceil(filteredPosts.length / postsInKey); // 300 / 300 = 1, 900/300 = 3
            // constants keyToLoad = keys[keyIndex]; // if like this 900/300 = 3 , it's we've used 0, 1, 2 key,  300 + 300 + 300
            const newPosts:allLoadedPostType[] = await loadPostsFromRedis(keyIndex, keys);
            if (newPosts && newPosts.length) {
                const updatedPosts = [...filteredPosts, ...newPosts];
                setFilteredPosts(updatedPosts.sort((a:any, b:any) => a.data - b.data))
            }
        }
    };

    React.useEffect(() => {
        loadMorePostsIfNeeded(page);
    }, [page]);

    React.useEffect(() =>  {
        setPage(1)
    }, [chosenCategory])


    React.useEffect(() =>  {
        const abortController = new AbortController();
        const { signal } = abortController;
        const loadAndFilterPosts = async () => {
            let postsToLoad = 300; // start count
            let allLoadedPosts:allLoadedPostType[] = [];
            let filteredPosts:allLoadedPostType[] = [];
            let keys:string[] = [];
            let i = 0;

            if (chosenCategory && chosenCategory.id) keys = await getKeys(chosenCategory?.id)

            while (allLoadedPosts.length < postsToLoad) {
                if (signal.aborted) return;
                let newPosts = await loadPostsFromRedis(i, keys);
                if (!newPosts.length) {
                    break;
                }

                if (infoUser && infoUser?.categoriesFreePeriod?.length > 0 && !infoUser?.endFreePeriod) {
                    const currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - 3);
                    newPosts = newPosts.filter((item: any) => new Date(item.post_date_publish*1000).getTime() < currentDate.getTime());
                }

                allLoadedPosts = [...allLoadedPosts, ...newPosts];
                filteredPosts = applyFilters(allLoadedPosts);

                setFilteredPosts(filteredPosts.sort((a:any, b:any) => a.data - b.data))

                if (filteredPosts.length >= postsToLoad) {
                    break;
                }

                postsToLoad += 300;
                i++;
            }
        };
        loadAndFilterPosts()
        setPage(1)
        return () => {
            abortController.abort(); // cancel last query for cleaning effect
        };
    }, [keyWords, keyCityWords, social, postsCount, chosenCategory])

    // pagination block
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
            return pages.slice(0, 5);
        } else if (page > pageCount - 4) {
            return pages.slice(-5);
        } else {
            return pages.slice(page - 3, page + 2);
        }
    };

    const pagesToDisplay = displayPages();

    const openLink = async (item:any) => {

        let link = null

        if(!item.signer_id) {
            if( item.identification_post == 'vk') {
                link =  `https://vk.com/wall${item.post_owner_id}_${item.post_id}`
            } else if (item.identification_post == 'tg'){
                link = `https://t.me/${item?.id_group}/${item?.post_id}`
            } else if (item.identification_post == 'FL' || item.identification_post == 'freelancer.ru' ){
                link = item?.id_group
            }
        } else if(item.signer_id) {
            if( item.identification_post == 'vk') {
                link = `https://vk.com/id${item.signer_id}`
            } else if (item.identification_post == 'tg'){
                link = `https://t.me/${item?.id_group}/${item?.post_id}`
            } else if (item.identification_post == 'FL' || item.identification_post == 'freelancer.ru' ){
                link = item?.id_group
            }
        }

        let result:any = await openThisLink({salary: 35})
        if(result?.data?.text == 'средства успешно списаны') {
            setChangedBalance(true)
            window.open(link, '_blank');
        }
    }

    return (
        <div className={cls.bodyInfo}>
            {
                infoUser && infoUser?.categoriesFreePeriod?.length > 0 && !infoUser?.endFreePeriod &&
                <div className={cls.textAttent}>В бесплатном тарифе доступны заявки старше 3 суток с текущей даты</div>
            }
            {changedBalance && <div className={cls.attentionBalance}>Обновите страницу для отображения актуального баланса</div>}
            {postsToShow && postsToShow?.length > 0 &&
                postsToShow.map((item: any) => (
                    <div
                        key={item.id}
                        className={cls.rows}>
                        <div className={cls.mainBlock}>
                            <div>{getFormattedDate(item.post_date_publish)}</div>
                            <div>{getFormattedTime(item.post_date_publish)}</div>
                            {item.identification_post == 'vk' && <div className={cls.identificator}><VkSvg/></div>}
                            {item.identification_post == 'tg' && <div className={cls.identificatorTg}><TgSvg/></div>}
                            {item.identification_post == 'FL' && <div className={cls.identificatorFl}><div className={cls.flRu}>FL</div></div>}
                            {item.identification_post == 'freelancer.ru' && <div className={cls.identificatorFR}><div className={cls.flRu}>FR</div></div>}
                        </div>
                        <div className={cls.secondBlock}>
                            <div className={cls.blockUser}>
                                <Button onClick={() => openLink(item)} classname={cls.notPaidMessage}>Открыть ( 35 р )</Button>
                                {/*? !item.signer_id*/}
                                {/*    ? <Link className={cls.link}*/}
                                {/*        href={*/}
                                {/*            item.identification_post == 'vk' ?*/}
                                {/*                `https://vk.com/wall${item.post_owner_id}_${item.post_id}`:*/}
                                {/*                item.identification_post == 'tg' ?*/}
                                {/*                    `https://t.me/${item?.id_group}/${item?.post_id}`:*/}
                                {/*                    item.identification_post == 'FL' || item.identification_post == 'freelancer.ru' ?*/}
                                {/*                        item?.id_group : ''*/}
                                {/*        }*/}
                                {/*        target="_blank">*/}
                                {/*        <div className={cls.rightLinkSvg}>*/}
                                {/*            {item?.photo_100_group && <img className={cls.imageGroup} src={item?.photo_100_group} alt=""/>}*/}
                                {/*            <div className={cls.nameGroup}>*/}
                                {/*                {item.name_group}*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </Link>*/}
                                {/*    : <Link className={cls.link}*/}
                                {/*        href={*/}
                                {/*            item.identification_post == 'vk' ?*/}
                                {/*                `https://vk.com/id${item.signer_id}`:*/}
                                {/*                item.identification_post == 'tg' ?*/}
                                {/*                    `https://t.me/${item?.id_group}/${item?.post_id}`:*/}
                                {/*                    item.identification_post == 'FL' || item.identification_post == 'freelancer.ru' ?*/}
                                {/*                        item?.id_group : ''*/}
                                {/*        }*/}
                                {/*        target="_blank">*/}
                                {/*        <div className={cls.rightLinkSvg}>*/}
                                {/*            {item.photo_100_user && <img className={cls.image} src={item.photo_100_user} alt=""/>}*/}
                                {/*            <div className={cls.nameGroup}>*/}
                                {/*                {item.first_name_user || item.last_name_user &&*/}
                                {/*                    <div className={cls.nameBlock}>*/}
                                {/*                        <div>*/}
                                {/*                            {item.first_name_user}*/}
                                {/*                        </div>*/}
                                {/*                        <div>*/}
                                {/*                            {item.last_name_user}*/}
                                {/*                        </div>*/}
                                {/*                    </div>}*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </Link>*/}
                            </div>
                            <div className={cls.blockText}>
                                {infoUser?.access?.[`${chosenCategory?.id}`]?.find((element: number) => element === item?.post_id)
                                    ? <Link className={cls.linkText}
                                        href={
                                            item.identification_post == 'vk' ?
                                                `https://vk.com/wall${item?.post_owner_id}_${item?.post_id}`:
                                                item.identification_post == 'tg' ?
                                                    `https://t.me/${item?.id_group}/${item?.post_id}`:
                                                    item.identification_post == 'FL' || item.identification_post == 'freelancer.ru' ?
                                                        item?.id_group : ''
                                        }
                                        target="_blank"
                                    >
                                        {expandedPosts.includes(item?.id) || item?.post_text?.length <= 350
                                            ? item?.post_text
                                            : `${item.post_text?.slice(0, 350)}...`
                                        }
                                    </Link>
                                    :
                                    <div className={cls.linkText}
                                    >
                                        {expandedPosts.includes(item?.id) || item?.post_text?.length <= 350
                                            ? item?.post_text
                                            : `${item.post_text?.slice(0, 350)}...`
                                        }
                                    </div>
                                }
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
                            {!item?.city_group &&
                                <div className={cls.cityBlockTwo}>
                                    {!item.city_user && <div className={cls.noInfo}>пользователь: - </div>}
                                    {item.city_user && <div className={cls.noInfo}>пользователь: {item.city_user}</div>}
                                </div>
                            }
                            {
                                item?.city_group &&
                                <div className={cls.cityBlockOne}>
                                    {!item.city_group && !item.country_group && <div className={cls.noInfo}>группа: -</div>}
                                    {item.city_group && <div className={cls.noInfo}>группа: {item.city_group}</div>}
                                </div>
                            }
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
                            {"<<"}
                        </Button>
                        <Button
                            classname={`${cls.pageBtn} ${cls.size}`}
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
                            classname={`${cls.pageBtn} ${cls.size}`}
                            onClick={() => changePage(page + 5)}
                        >
                            {">"}
                        </Button>
                        <Button
                            classname={`${cls.pageBtn} ${cls.size}`}
                            onClick={() => changePage(pageCount)}
                        >
                            {">>"}
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