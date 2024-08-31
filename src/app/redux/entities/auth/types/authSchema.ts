export interface PurchasedCategory {
    id: number; // id купленной категории
    name: string; // Имя купленной категории
    purchaseBuyDate: Date; // Дата покупки
    purchaseEndDate: Date; // Дата окончания подписки
    purchasePeriod: number;
}

export type User = {
    id: number;
    email: string;
    forChangeEmail: string;
    phoneNumber: string;
    forChangePhoneNumber: string;
    fullName: string;
    chatIdTg: string;
    userIdTg: string;
    isAdmin: boolean;
    isMainAdmin: boolean;
    isActivatedEmail: boolean;
    isActivatedPhone: boolean;
    activatedFreePeriod: boolean;
    endFreePeriod: boolean;
    activatedFreePeriodNotification: boolean;
    endFreePeriodNotification: boolean;
    ip: string;
    lastVisit: null | Date;
    activationNumber: string;
    activationTgNumber: string;
    activationCodeForChangePassword: string;
    activationCodeForChangePasswordTg: string;
    categoriesFreePeriod: PurchasedCategory[];
    notificationsFreePeriod: PurchasedCategory[];
    categoriesHasBought: PurchasedCategory[];
    notificationsHasBought: PurchasedCategory[];
    timeCallVerify: Date;
    timeSendMessageVerify: Date;
    createdAt: Date;
    updateAt: Date;
    deletedAt: Date;
};

export interface AuthSchema {
    data: User | null;
    isAdmin: boolean;
    isMainAdmin: boolean;
    stateAuth: boolean;
}
