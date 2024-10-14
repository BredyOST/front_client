/**
 * общий тип для функций
 **/
export type TypeForFunc<T,U> = (arg:T) => U;

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

//CONTACTS_PAGE
export type InfoType = {
    id:number,
    name:string,
    text:string
};



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




// что передаем в NavBar
export type NavBar = {
    text: string,
    href:string,
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