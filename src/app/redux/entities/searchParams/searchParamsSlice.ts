
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISearchParamsSchema} from "@/app/redux/entities/searchParams/searchParamsSchema";

const initialState:ISearchParamsSchema = {
    chosenCategory: null,
    keyWords:[],
    keyCityWords:[],
    social:[],
    postsCount:1,
};

export const SearchParamsSLice = createSlice({
    name: 'searchingParams',
    initialState,
    reducers: {
        addCategoryChosen: (state, action:PayloadAction<{ id: number, name: string,positive: string[], negative:string[],} | null>) => {
            state.chosenCategory = action.payload;
        },
        addKeyWords: (state, action:PayloadAction<string[]>) => {
            state.keyWords = action.payload;
        },
        addKeyCityWords: (state, action:PayloadAction<string[]>) => {
            state.keyCityWords = action.payload;
        },
        addSocial: (state, action:PayloadAction<number[]>) => {
            state.social = action.payload;
        },
        addPostsCount: (state, action:PayloadAction<number>) => {
            state.postsCount = action.payload;
        },
    },
});

export default SearchParamsSLice.reducer;
export const { actions: SearchParamsActions } = SearchParamsSLice;