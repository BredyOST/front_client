
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
 * тип для объекта табов в окне авторизации
 **/
export type LoginTextRecovery = {
    id:number
    text: string
}
