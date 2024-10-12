export type loginTextType = {
    id:number,
    text:string
}
export const loginText:loginTextType[] = [
    { id: 1, text: 'Email' },
    { id: 2, text: 'Телефон' },
]
export type loginFormType = {
    mailOrNumberLoginIn: string | number,
    passwordLoginIn: string,
}
export type passwordHideType = {
    enteredLoginText: boolean,
    passwordBtnShowOrHide: boolean,
}
export type ForTextFormsType = {
    loginIn: string,
    passwordLogin: string,
}