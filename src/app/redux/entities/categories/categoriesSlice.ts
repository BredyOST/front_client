import {filteredCategoriesType, ICategoriesSchema, itemType} from "@/app/redux/entities/categories/categoriesSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState:ICategoriesSchema = {
    categories: [],
    chosenCategory:[],
}

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers: {
        addCategories:(state, action:PayloadAction<filteredCategoriesType[]>) => {
            state.categories = action.payload;
        },
        addChosenCategories:(state, action:PayloadAction<itemType[]>) => {
            state.chosenCategory = action.payload;
        }
    }
})

export default categoriesSlice.reducer;
export const {actions: categoriesActions} = categoriesSlice;