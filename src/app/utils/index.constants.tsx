import {LinkVideoType, NavBar, LoginTextRecovery} from "@/app/types/types"

/**
 * константы для основных страниц - заголовки
 **/
export const CONTACT_PAGE_TITLE = 'Контакты';
export const FAQ_PAGE_TITLE= 'Ответы на вопросы';
export const FEEDBACK_PAGE_TITLE= 'Отзывы';

export const POLITICS_PAGE_TITLE= 'Политика конфиденциальности';
export const PRICE_PAGE_TITLE= 'Тарифы на подписку';
export const PROFILE_PAGE_TITLE= 'Профиль пользователя';
export const SEARCH_PAGE_TITLE= 'Поиск клиентов';
export const TERMS_PAGE_TITLE= 'Пользовательское соглашение сайта «клиенты.com»';

/**
 * константы для заголовков в компонентах
 **/
export const CONTACT_US_TITLE = 'Форма обратной связи'


/**
 * константы - объекты, массивы,
 **/

export const NAVBAR_FIRST :NavBar[] = [
    {text: 'Тарифы', href:'/dashboard/price'},
    {text: 'Вопросы', href:'/dashboard/faq'},
    {text: 'Отзывы', href:'/dashboard/feedback'},
]
export const LINKS_VIDEO_FEEDBACK:LinkVideoType[] = [
    {id:1, link: "https://www.youtube.com//embed/M2WoS2mSEOY",},
    {id:2, link: "https://www.youtube.com//embed/nyoWsqG5QgQ"},
    {id:3, link: "https://www.youtube.com//embed/Qcw1SMbC8W8"},
    {id:4, link: "https://www.youtube.com//embed/IYkR6YaYKLY"},
    {id:5, link: "https://www.youtube.com//embed/It64FQZfj4g"},
    {id:6, link: "https://www.youtube.com//embed/6s7p4tExCJw"}
]

export const LOGIN_TEXT_RECOVERY: LoginTextRecovery[] = [
    { id: 1, text: 'Звонок' },
    { id: 2, text: 'Телеграмм' },
]