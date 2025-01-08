
export type loginForm = {
    phoneNumberRegistration: string,
    // mailOrNumberRegistration: string,
    passwordRegistration: string,
    passwordRegistrationCheck:string,
}

export interface ForTextForms {
    phoneRegister:string,
    passwordRegister: string,
    passwordRegisterCheck:string
}

export type passwordHide = {
    enteredRegisterText: boolean,
    enteredRegisterCheckText:boolean,
    registerBtnShowOrHide: boolean,
    registerBtnCheckShowOrHide:boolean
}

export type createUserType = {
    phoneNumber:string
    password: string
    passwordCheck: string
    refId: null | string
}

export const textErrors = {
    message: 'Не совпадают введенные пароли',
    messageSecond: 'Не совпадают введенные пароли',
    messageThird: 'Не совпадают введенные пароли',
}