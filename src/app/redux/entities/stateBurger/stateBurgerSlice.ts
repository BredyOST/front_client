import {StateBurgerMenuSchema} from "@/app/redux/entities/stateBurger/stateBurgerSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:StateBurgerMenuSchema = {
    stateMenuBurgerHeader: false,
};

export const stateBurgerMenuSlice = createSlice({
    name: 'burgerMenu',
    initialState,
    reducers: {
        changeStateMenuBurger: (state, action:PayloadAction<boolean>) => {
            state.stateMenuBurgerHeader = action.payload;
        },
    },
});

export default stateBurgerMenuSlice.reducer;
export const { actions: stateBurgerMenuSliceActions } = stateBurgerMenuSlice;