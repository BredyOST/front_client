import {itemType} from "@/app/redux/entities/categories/categoriesSchema";

export type CardsType = {
    сreatedAt: string
    description: string
    descriptionNotification: string
    id:number
    identificatorId: string
    period:number
    title: 'Бесплатный' | 'Недельный' | 'Погрузись в работу'
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

export type PaymentObjType = {
    category: itemType[]
    price: number | string,
    period: string,
    title: string,
}

export type CategoryListsUpdate = {
    id: number
    text: string
    chatNames: string[]
}