interface IChosenCategory {
    id?: number;
    name?: string;
    positive:string[];
    negative:string[];
}

export interface ISearchParamsSchema {
    chosenCategory: IChosenCategory | null,
    keyWords:string[],
    keyCityWords:string[],
    social:number[],
    postsCount:number,

}



