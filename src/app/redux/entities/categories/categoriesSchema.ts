export type itemType = {
    id: number, text: string
}

export type filteredCategoriesType = {
    id: number,
    id_category: string,
    name: string,
    description:string,
    positiveWords: string[],
    negativeWords: string[]
    extraWords: string[],
    chatNames: string[],
    salary: number,
    salaryChanel: number,
    percentSale: number,
    show: boolean,
    create: boolean,
    disabled: boolean,
    channelActive: boolean,
    createdAt: string,
    updateAt: string

}

export interface ICategoriesSchema {
    categories:filteredCategoriesType[],
    chosenCategory:itemType[]
}