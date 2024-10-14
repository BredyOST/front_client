
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

export type SendNewPasswordAdditionalType = SendNewPasswordType & {
    email: string
}

/**
 * тип для объекта табов в окне авторизации
 **/
export type LoginTextRecovery = {
    id:number
    text: string
}

/**
 * тип для выбора способа авторизации
 **/
export type AccessTextType = {
    id:number,
    text: string
}

export type loginFormType = {
    mailOrNumberLoginIn: string | number,
    passwordLoginIn: string,
}

export type PasswordHideType = {
    enteredLoginText: boolean,
    passwordBtnShowOrHide: boolean,
}

export type ForTextFormsType = {
    loginIn: string,
    passwordLogin: string,
}

export type AccessNumberType = {
    phoneNumber:string
    numberActivation:string,
}

export type loginTextType = {
    id:number,
    text:string
}


export type loginFormRegistrationType = {
    phoneNumberRegistration: string,
    // mailOrNumberRegistration: string,
    passwordRegistration: string,
    passwordRegistrationCheck:string,
}

export interface ForTextFormsRegisterType{
    phoneRegister:string,
    passwordRegister: string,
    passwordRegisterCheck:string
}

export type PasswordRecoverHideType = {
    enteredRegisterText: boolean,
    enteredRegisterCheckText:boolean,
    registerBtnShowOrHide: boolean,
    registerBtnCheckShowOrHide:boolean
}

export type CreateUserType = {
    phoneNumber:string
    password: string
    passwordCheck: string
}

