export interface PurchasedCategory {
    category:string
    id:number
    price:string
    purchaseBuyDate:string
    purchaseEndDate:string
    purchasePeriod:number
    title:string
}

export interface PurchasedCategory {
    category:string
    id:number
    price:string
    purchaseBuyDate:string
    purchaseEndDate:string
    purchasePeriod:number
    title:string
}

export type PurchasedNotification = {
    id: number
    category: string
    purchaseBuyDate: string
    purchaseEndDate: string
    purchasePeriod: number
    chatList: string

}

export type User = {
    id:number
    email: string
    forChangeEmail: string
    phoneNumber: string
    forChangePhoneNumber: string
    fullName: string
    chatIdTg: string
    access: AccessPosts
    userIdTg: string
    isAdmin: boolean
    wallet: number
    isMainAdmin: boolean
    isActivatedEmail: boolean
    isActivatedPhone: boolean
    activatedFreePeriod: boolean
    endFreePeriod: boolean
    activatedFreePeriodNotification: boolean
    endFreePeriodNotification: boolean
    ip: string
    lastVisit: null | Date
    activationNumber: string
    activationTgNumber: string
    activationCodeForChangePassword: string
    activationCodeForChangePasswordTg: string
    categoriesFreePeriod: PurchasedCategory[]
    notificationsFreePeriod: PurchasedNotification[]
    categoriesHasBought: PurchasedCategory[]
    notificationsHasBought: PurchasedNotification[]
    timeCallVerify: Date
    timeSendMessageVerify: Date
    createdAt: Date
    updateAt: Date
    deletedAt: Date
}

export type UserAuthorization = {
    id:number
    forChangeEmail: string
    phoneNumber: string
    forChangePhoneNumber: string
    fullName: string
    chatIdTg: string
    userIdTg: string
    email:string
    isAdmin: boolean
    isMainAdmin: boolean
    isActivatedEmail: boolean
    isActivatedPhone: boolean
    activatedFreePeriod: boolean
    endFreePeriod: boolean
    wallet:number
    walletRef: number
    access: AccessPosts
    activatedFreePeriodNotification: boolean
    endFreePeriodNotification: boolean
    ip: string,
    childrenRefId: number[]
    lastVisit: null | Date
    activationTgNumber: string
    activationCodeForChangePassword: string
    activationCodeForChangePasswordTg: string
    categoriesFreePeriod: PurchasedCategory[]
    notificationsFreePeriod: PurchasedNotification[]
    categoriesHasBought: PurchasedCategory[]
    notificationsHasBought: PurchasedNotification[]
    timeCallVerify: Date
    timeSendMessageVerify: Date
    createdAt: Date
    sessionToken:string,
    refreshToken: string,
    accessToken: string
}

export interface AccessPosts {
    [key: string]: number[];
}

export interface AuthSchema {
    data: UserAuthorization | null,
    isAdmin:boolean,
    isMainAdmin:boolean,
    stateAuth: boolean,
}