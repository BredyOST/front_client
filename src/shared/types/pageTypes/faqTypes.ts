/**
 *  типы для формы запроса повторной активации
 **/
// FAQ_PAGE
export type AnswerType = {
    id: number
    text: string | any
}
/**
 * тип для списока вопросов
 **/
export type FaqItem = {
    id: number
    question: string
    answer: AnswerType[]
}
