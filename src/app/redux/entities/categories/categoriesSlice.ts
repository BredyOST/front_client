import { ICategoriesSchema } from '@/app/redux/entities/categories/categoriesSchema';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICategoriesSchema = {
    categories: null,
    chosenCategory: [],
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategories: (state, action: PayloadAction<any>) => {
            state.categories = action.payload;
        },
        addChosenCategories: (state, action: PayloadAction<any>) => {
            state.chosenCategory = action.payload;
        },
    },
});

export default categoriesSlice.reducer;
export const { actions: categoriesActions } = categoriesSlice;
