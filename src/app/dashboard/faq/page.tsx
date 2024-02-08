import cls from './faq.module.scss';
import React from "react";
import Question from "@/app/dashboard/faq/question/question";
import Link from "next/link";

export const metadata = {
    title: 'Ответы на вопросы - клиенты.com',
    description: 'ответы на вопросы',
}

interface faqProps {

}

async function Faq (props:faqProps) {
    const {} = props;

    const arrayQuestions = [
        {id:1, question: 'Как пользоваться сайтом?', answer: [{id:1, text: <span>C инструкцией по сайту вы можете ознакомится на <Link className={cls.link} href="/">главной странице.</Link></span>}]},
        {id:2, question: 'Что включает в себя тариф бесплатный?', answer: [{id:1, text: <span>При оформлении подписки с тарифом бесплатный вы получаете доступ ко всем заявкам по выбранной одной категории в течении 24 часов с момента оформления подписки. Для оформления перейдите на страницу <Link className={cls.link} href='/dashboard/price'>тарифов.</Link></span>}]},
        {id:3, question: 'Что включает в себя тариф посуточный?', answer: [{id:1, text: <span>При оформлении подписки с тарифом посуточный вы получаете доступ ко всем заявкам по выбранной одной или нескольким категориям на период от 1 до 30 дней, в зависимости от вашего выбора с момента оформления подписки. Для оформления перейдите на страницу <Link className={cls.link} href='/dashboard/price'>тарифов.</Link></span>}]},
        {id:4, question: 'Что включает в себя тариф погрузись в работу?', answer: [{id:1, text: <span>При оформлении подписки с тарифом погрузись в работу вы получаете доступ ко всем заявкам по выбранной одной или нескольким категориям на период от 1 до 12 месяцев, в зависимости от вашего выбора с момента оформления подписки. Для оформления перейдите на страницу <Link className={cls.link} href='/dashboard/price'>тарифов.</Link></span>}]},
        {id:5, question: 'Где посмотреть список доступных к подписке категорий?', answer: [{id:1, text: <span>Со списком доступных категорий вы можете ознакомится на <Link className={cls.link} href="/">главной странице</Link> или на странице с <Link className={cls.link} href='/dashboard/price'>тарифами</Link> нажав на кнопку добавить категории </span> }]},
        {id:6, question: 'Как происходит процесс получения заявок?', answer: [
            {id:1, text: `* Вам необходимо пройти регистрацию на сайте, введя действующий email адрес.`},
            {id:2, text: `* После регистрации на указанную вами почту будет направлено сообщение с ссылкой активации аккаунта.`},
            {id:3, text: `* Открываем сообщение на почте и кликаем на обозначенное поле, после чего вы будете возвращены на сайт и можете вводить ваши регистрационные данные для авторизации.`},
            {id:4, text: <span>* После чего вам необходимо будет перейти на <Link className={cls.link} href='/'>главную страницу</Link> и выбрать в списке категорию заинтересовавшую вас.</span>},
            {id:5, text: <span>* После чего выбудете перемещены на страницу с <Link className={cls.link} href='/dashboard/price'>тарифами</Link>, где вы сможете выбрать одну из доступных подписок.</span>},
            {id:6, text: `* Для подтверждения выбора подписки вам необходимо нажать на кнопку "оформить подписку", после чего вы будете перемещены на страницу оплаты если это не бесплатный тариф, который оформляется автоматически, если вы ранее его не использовали.`},
            {id:7, text: <span>* После осуществления оплаты и подтверждения платежа, что происходит автоматически, вы можете перейти на страницу <Link className={cls.link} href='/dashboard/search'>поиска</Link> и приступать к просмотру заявок</span> },
        ]},
        {id:7, question: 'На какой период я получу доступ к заявкам?', answer: [
            {id:1, text: `* При оформлении тарифа бесплатный вы получаете доступ к заявкам на 24 часа.`},
            {id:2, text: `* При оформлении тарифа посуточный вам доступно на выбор, получение доступа к заявкам на период от 1 до 30 дней.`},
            {id:3, text: `* При оформлении тарифа погрузись в работу вам доступно на выбор, получение доступа к заявкам на период от 1 до 12 месяцев.`},
        ]},
        {id:8, question: 'Какие ограничение в тарифе бесплатный?', answer: [{id:1, text: `Ограничение затрагивает только период пользования подпиской, который составляет 24 ч с момента оформления.`}]},
        {id:9, question: 'Как продлить подписку?', answer: [
            {id:1, text: <span>* Для продления подписки вы можете в любой момент, даже в период когда у вас активна подписка, произвести процесс оплаты на странице с <Link className={cls.link} href='/dashboard/price'>тарифами</Link> и новый период будет добавлен к вашему текущему.</span>},
            {id:2, text: <span>* Вы также можете зайти в ваш <Link className={cls.link} href='/dashboard/profile'>поиска</Link> после авторизации и посмотреть текущий статус всех активных подписок с периодами действия.</span>}
        ]},
        {id:10, question: 'Как пользоваться фильтром по ключевым словам', answer: [
            {id:1, text: <span>* Для осуществления поиска вам необходимо в поле ввода на странице <Link className={cls.link} href='/dashboard/search'>поиска</Link> ввести ключевое слово. Например, вас интересуют те посты где люди ищут репетиторов, поэтому вы можете ввести один из вариантов представленных далее репет, репетит, репетитор. Важно понять что нет необходимости вводить полностью искомое слово.</span>},
            {id:2, text: `* Если вы ввели слово 'репет', то вам выдаст результаты постов в которых присутствует то что вы ввели, а это будут посты со словам  'репетитор', 'репетитора', 'репетиторы' и т.п.`},
            {id:3, text: `* После того как ввели слово, нажмите enter или плюсик рядом с полем ввода после чего посты будут обновлены`},
            {id:4, text: `* Помимо этого используется регистронезависимый поиск, т.е. не важно как вы введете слово, с большой буквы или с маленькой. Например, 'репет', 'Репет', резульаты поиска будут одинаковыми.`},
        ]
        },
        {id:11, question: 'Как пользоваться фильтром по городам', answer: [
            {id:1, text: <span>* Для осуществления поиска вам необходимо в поле ввода на странице <Link className={cls.link} href='/dashboard/search'>поиска</Link> ввести город. Например, вас интересует город Москва, поэтому вы можете ввести один из вариантов представленных далее моск, москв, москва. Важно понять что нет необходимости вводить полностью искомое слово.</span>},
            {id:2, text: `* Если вы ввели слово 'моск', то вам выдаст результаты постов в которых присутствует то что вы ввели, а это будут посты со словам  'москва'.`},
            {id:3, text: `* После того как ввели слово, нажмите enter или плюсик рядом с полем ввода после чего посты будут обновлены.`},
            {id:4, text: `* Помимо этого используется регистронезависимый поиск, т.е. не важно как вы введете слово, с большой буквы или с маленькой. Например, 'репет', 'Репет', резульаты поиска будут одинаковыми.`},
        ]
        },
        {id:12, question: 'Не нашли ответа на ваш вопрос?', answer: [{id:1, text: `Напишите нам сообщение на наш почтовый адрес infoclient.com@gmail.com.`}]},
    ];
    return (
        <div className={cls.faq}>
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Ответы на вопросы</h1>
                    </div>
                    <div className={cls.coverQuestions}>
                        {arrayQuestions?.length && arrayQuestions.map((item:any) => (
                            <Question
                                key={item.id}
                                items = {item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;