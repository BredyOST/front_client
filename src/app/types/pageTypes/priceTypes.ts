
export type CardsType = {
    reatedAt: string
    description: string
    descriptionNotification: string
    id:number
    identificatorId: string
    period:number
    title: string
    updateAt: string
}

export type CategoriesType = {
    channelActive:boolean
    chatNames:string[] | []
    create:boolean
    createdAt:string
    description:string
    disabled:boolean
    extraWords:string[] | []
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


export type CardPeriod = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '14' | '21' | '28'

export enum nameCards {
    free = 'Бесплатный',
    weeks = 'Недельный',
    month = 'Погрузись в работу',
}
