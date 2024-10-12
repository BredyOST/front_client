
export type pricesType = {
    id: number,
    identificatorId: string,
    title: string,
    period: number,
    description: string,
    descriptionNotification: string,
    createdAt: string,
    updateAt: string,
}

export interface IPriceSchema {
    prices:pricesType[]
    activePriceWindows: number
}