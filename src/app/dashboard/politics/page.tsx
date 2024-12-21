import React from 'react';
import cls from './politics.module.scss'
import {POLITICS_PAGE_TITLE} from "@/shared/constants/index.constants";

export const metadata = {
    title: 'Политика конфиденциальности - клиенты.com',
    description: 'Политика конфиденциальности',
}

function Politics (){

    return (
        <div className={cls.page} >
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>{POLITICS_PAGE_TITLE}</h1>
                    </div>
                    <div className={cls.coverMain}>
                        <div className={cls.common}>
                            <h3 className={cls.titleText}>1. Что регулирует настоящая политика конфиденциальности</h3>
                            <div className={cls.text}>
                                <p>Настоящая политика конфиденциальности (далее — Политика) действует в отношении всей информации, включая персональные данные в понимании применимого законодательства (далее — «Персональная информация»), которую Сайт клиенты.com / Администрация Сайта  может получить о Вас в процессе использования Сайта.</p>
                                <p>Обратите внимание, что использование Сайта может регулироваться дополнительными условиями, которые могут вносить в настоящую Политику изменения и/или дополнения, и/или иметь специальные условия в отношении персональной информации, размещенные в соответствующих разделах документов для Сайта.</p>
                            </div>
                            <h3 className={cls.titleText}>2. Обработка персональной информации</h3>
                            <div className={cls.text}>
                                <p>2.1 Сайт клиенты.com / Администрация Сайта может собирать следующие категории Персональной информации о Вас во время использования Вами Сайтом:</p>
                                <p>* Персональная информация, предоставленная Вами при регистрации (создании учетной записи), такая как Ваше имя, номер телефона, email;</p>
                                <p>* электронные данные (HTTP-заголовки, IP-адрес, файлы cookie, веб-маяки/пиксельные теги, данные об идентификаторе браузера, информация об аппаратном и программном обеспечении, время доступа);</p>
                                <p>* дата и время осуществления доступа к Сайту;</p>
                                <p>* информация о геолокации;</p>
                                <p>2.2 Настоящая Политика применима только к Сайту клиенты.com. Сайт клиенты.com / Администрация Сайта не контролирует и не несет ответственность за сайты третьих лиц, на которые пользователь может перейти по ссылкам, доступным на сайтах, в том числе в результатах поиска. На таких сайтах у пользователя может собираться или запрашиваться иная персональная информация, а также могут совершаться иные действия.</p>
                                <p>2.3 Сайт клиенты.com / Администрация Сайта не проверяет достоверность персональной информации, предоставляемой Пользователем, и не может оценивать его дееспособность. Однако Сайт клиенты.com / Администрация Сайта исходит из того, что пользователь предоставляет достоверную и достаточную персональную информацию и поддерживает эту информацию в актуальном состоянии.</p>
                            </div>
                            <h3 className={cls.titleText}>3. Правовая основа и цели обработки Вашей Персональной информации</h3>
                            <div className={cls.text}>
                                <p>3.1 Сайт клиенты.com / Администрация Сайта не вправе обрабатывать Вашу Персональную информацию без достаточных на то правовых оснований. Поэтому Сайт клиенты.com / Администрация Сайта обрабатывает Вашу Персональную информацию только в том случае, если:</p>
                                <p>* обработка необходима для выполнения договоров между Вами и Сайтом клиенты.com / Администрация Сайта, таких как Пользовательское соглашение </p>
                                <p>* чтобы совершенствовать, менять, персонализировать или иным образом улучшать Сайт в интересах всех пользователей;</p>
                                <p>* Идентификация стороны в рамках работы с Сайтом клиенты.com;</p>
                                <p>* Связь с пользователем, в том числе направление уведомлений, запросов и информации, касающихся использования Сайта, оказания услуг, а также обработка запросов и заявок от пользователя;</p>
                                <p>* Улучшение качества, удобства их использования, разработка услуг;</p>
                                <p>* Таргетирование рекламных материалов;</p>
                                <p>* осуществление связи с Вами для направления Вам уведомлений, запросов и информации, относящейся к работе Сайта, выполнения соглашений с Вами и обработки Ваших запросов и заявок;</p>
                                <p>* сбор, обработка и представление статистических данных, больших данных и других исследований;</p>
                                <p>Полученные данные не могут быть использованы для передачи третьим лицам, для показа рекламных материалов и иных целей, связанных с неправомерным доступом.</p>
                            </div>
                            <h3 className={cls.titleText}>4. Условия обработки персональной информации пользователя и её передачи третьим лицам:</h3>
                            <div className={cls.text}>
                                <p>Сайт хранит персональную информацию пользователей в соответствии с внутренними регламентами конкретных сервисов.</p>
                                <p>В отношении персональной информации пользователя сохраняется ее конфиденциальность, кроме случаев добровольного предоставления пользователем информации о себе для общего доступа неограниченному кругу лиц. При использовании отдельных Сервисов пользователь соглашается с тем, что определённая часть его персональной информации становится общедоступной.</p>
                                <p>Персональная информация Пользователя может быть передана третьим лицам в следующих случаях:</p>
                                <p>* Пользователь дал согласие любым доступным способом;</p>
                                <p>* Передача необходима в рамках использования пользователем определенного Сервиса либо для оказания услуги пользователю;</p>
                                <p>* Передача предусмотрена российским или иным применимым законодательством в рамках установленной законодательством процедуры;</p>
                                <p> При обработке персональных данных пользователей сайт клиенты.com руководствуется Федеральным законом РФ «О персональных данных».</p>
                            </div>
                            <h3 className={cls.titleText}>5. Где хранится и обрабатывается Ваша Персональная информация</h3>
                            <div className={cls.text}>
                                <p>5.1 Сайт клиенты.com осуществляет запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение персональных данных граждан с использованием баз данных, находящихся на территории Российской Федерации.</p>
                                <p>5.2 Если Вы находитесь на территории, где для передачи Вашей Личной информации в другую юрисдикцию требуется Ваше согласие, то используя Сайт клиенты,com, Вы даете Администрации Сайта свое явное и однозначное согласие на такую передачу или хранение, и/или обработку информации в других указанных юрисдикциях, включая Россию.</p>
                            </div>
                            <h3 className={cls.titleText}>6. Как долго мы храним Вашу Персональную информацию</h3>
                            <div className={cls.text}>
                                <p>Сайт клиенты.com будет хранить Вашу Персональную информацию столько времени, сколько это необходимо для достижения цели, для которой она была собрана, или для соблюдения требований законодательства и нормативных актов.</p>
                            </div>
                            <h3 className={cls.titleText}>7. Ваши права</h3>
                            <div className={cls.text}>
                                <p>Пользователь может в любой момент изменить (обновить, дополнить) предоставленную им персональную информацию или её часть на странице профиля, либо воспользовавшись обратной связью написав письмо с соответствующим запросом на infoclient.com@gmail.com.</p>
                                <p>Пользователь может требовать удаления предоставленной им Персональной информации, написав письмо с соответствующим запросом на infoclient.com@gmail.com, понимая, что удаление аккаунта может повлечь невозможность использования Сайта.</p>
                            </div>
                            <h3 className={cls.titleText}>8. Как мы используем файлы cookie и другие подобные технологии на Сайте</h3>
                            <div className={cls.text}>
                                <p>Файлы cookie — это небольшой фрагмент данных, который принимается и обрабатывается устройством, которое Вы используете для доступа к Сайту. Файлы cookie хранят и отправляют обратно на Сайт информацию, которая помогает Вашей работе с Сайтом и позволяет нам запоминать Ваши предпочтения по истечении времени, например, настройки браузера или узнавать Вашу учетную запись.</p>
                                <p>На Сайте используются следующие типы файлов cookie:</p>
                                <p>* строго необходимые файлы cookie / технические файлы cookie: эти файлы cookie необходимы для работы Сайтов и предоставления Вам Сервисов; кроме всего прочего, они позволяют Сайту клиенты.com идентифицировать Ваше аппаратное и программное обеспечение, включая тип Вашего браузера;</p>
                                <p>* статистические / аналитические файлы cookie: эти файлы cookie позволяют распознавать пользователей, подсчитывать их количество и собирать информацию, такую как произведенные Вами операции на Сайтах и в Сервисах, включая информацию о посещенных Вами веб-страницах и контенте, который Вы получаете;</p>
                                <p>* технические файлы cookie: эти файлы cookie собирают информацию о том, как пользователи взаимодействуют с Сайтами и/или Сервисами, что позволяет выявлять ошибки и тестировать новые функции для повышения производительности Сайтов и Сервисов;</p>
                                <p>* функциональные файлы cookie: эти файлы cookie позволяют предоставлять определенные функции, чтобы облегчить использование Вами Сайтов, например, сохраняя Ваши предпочтения (такие как язык и местоположение);</p>
                                <p>* (сторонние) файлы отслеживания / рекламные файлы cookie: эти файлы cookie собирают информацию о пользователях, источниках трафика, посещенных страницах и рекламе, отображенной для Вас, а также той, по которой Вы перешли на рекламируемую страницу. Они позволяют отображать рекламу, которая может Вас заинтересовать, на основе анализа Персональной информации, собранной о Вас. Они также используются в статистических и исследовательских целях.</p>
                                <p>клиенты.com использует информацию, содержащуюся в файлах cookie только в указанных выше целях, после чего собранные данные будут храниться на Вашем устройстве в течение периода, который может зависеть от соответствующего типа файлов cookie, но не превышая срока, необходимого для достижения их цели, после чего они будут автоматически удалены из Вашей системы.</p>
                            </div>
                            <h3 className={cls.titleText}>9.Обновление настоящей Политики</h3>
                            <div className={cls.text}>
                                <p>В настоящую Политику могут быть внесены изменения. Сайт клиенты.com / Администрация Сайта  имеет право вносить изменения по своему усмотрению, в том числе, но не ограничиваясь, в случаях, когда соответствующие изменения связаны с изменениями в применимом законодательстве, а также когда соответствующие изменения связаны с изменениями в работе Сайта.</p>
                                <p>Сайт клиенты.com / Администрация Сайта обязуется не вносить существенных изменений, не налагать дополнительных обременений или ограничений Ваших прав, установленных настоящей Политикой без Вашего уведомления. Вы будете уведомлены о таких изменениях. Соответствующие уведомления могут быть отображены на Сайте (например, через всплывающее окно или баннер) до того, как такие изменения вступят в силу, или могут быть отправлены Вам по другим каналам связи (например, по электронной почте).</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Politics;
