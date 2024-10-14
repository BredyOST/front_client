export type TypeForFunc<T,U> = (arg:T) => U;

/**
 * тип для отправки сообщения на почту со страницы контактов
 **/
export type MessageInfo = {
    name:string,
    email:string,
    message:string,
}

/**
 * enum для того чтобы передать значение в обработчик события при изменения state в contactUs компоненте
 **/
export enum infoForMassage {
    name = 'name',
    email = 'email',
    message = 'message'
}

/**
 * ActiveTabIdType - активный таб при выборе 'email' or 'phone' or 'telegramm' в popup входа
 * ActiveWindowType - активный попам 'logIn' or 'register' ane etc.
 **/
export type ActiveTabIdType = 1 | 2 | 3 | 4
export type ActiveWindowType = `1` | `2` | '3' |''

/**
 * тип для запроса вызова в подтверждении номера телефона после регистрации 'accessNumber компонент'
 **/
export type ObjForReqCallType = {
    phone: string
    indicator: string
}
export type ReqCallCodeType = {
    phoneNumber: string
    numberActivation: string
}
/**
 * типы для отправки запроса на восстановление пароля
 **/
export type SendNewPasswordType = {
    phoneNumber: string
    password: string
    passwordTwo: string
    code: string
    indicator: string
}
export type SendNewPasswordTwoType = SendNewPasswordType & {
    email: string
}

/**
 * типы для формы восстановления пароля
 **/
//
export type LoginFormRecovery = {
    phoneNumber:string,
    myEmail:string,
    password:string,
    passwordTwo:string,
    code:string,
}

export type ForTextFormsRecovery = {
    passwordRegister: string,
    passwordRegisterCheck:string
}

export type LoginTextRecovery = {
    id:number
    text: string
}

/**
 *  типы для формы запроса повторной активации
 **/
// FAQ_PAGE
export type AnswerType = {
    id: number
    text: string | any
}
export type FaqItem = {
    id: number
    question: string
    answer: AnswerType[]
}

//CONTACTS_PAGE
export type InfoType = {
    id:number,
    name:string,
    text:string
};

//FEEDBACK_PAGE
export type PicturesType = {
    deletedAt: string
    filename: string
    id: number
    mimetype: string
    originalName: string
    size: number
}

//PRICE_PAGE
export type TextListsType = {
    text: string
}

//PROFILE_PAGE
export interface HidePassword {
    current: boolean,
    new:boolean,
    newTwo:boolean
}



//PICTURES
export interface PicturesProps {
    pictures:any
}


// что передаем в NavBar
export type NavBar = {
    text: string,
    href:string,
}


/**
 * тип для списка ссылок для видео
 **/
export type LinkVideoType = {
    id:number,
    link:string
}


export type CategoriesType = {
    channelActive: boolean
    chatNames: string[]
    create: boolean
    createdAt: string
    description: string
    disabled: boolean
    extraWords: string[]
    id:number
    id_category:string
    name:string
    negativeWords:string[]
    percentSale:number
    positiveWords:string[]
    salary:number
    salaryChanel:number
    show:boolean
    updateAt:string
}