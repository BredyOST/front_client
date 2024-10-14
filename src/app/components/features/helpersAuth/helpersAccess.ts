export type accessNumber = {
    phoneNumber:string
    numberActivation:string,
}

type accessTextType = {
    id:number,
    text: string
}

export const loginTextAccess: accessTextType[] = [
    { id: 1, text: 'Звонок' },
    { id: 2, text: 'Телеграмм' },
]
