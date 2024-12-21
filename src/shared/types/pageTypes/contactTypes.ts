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
