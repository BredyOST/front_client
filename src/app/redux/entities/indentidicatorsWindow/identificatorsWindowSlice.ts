import {IdentificatorsWindowSchema} from "@/app/redux/entities/indentidicatorsWindow/identificatorsWindowSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:IdentificatorsWindowSchema = {
    windowWidth: undefined,
    scrollUp: false,
    scrollDown: false,
    scrolledHeight: 0,
}

const indicatorsSlice = createSlice({
    name: 'indicatorWindow',
    initialState,
    reducers: {
        setWindowWidth: (state, action:PayloadAction<number>) => {
            state.windowWidth = action.payload;
        },
        setScrollUp: (state, action:PayloadAction<boolean>) => {
            state.scrollUp = action.payload;
        },
        setScrollDown: (state, action:PayloadAction<boolean>) => {
            state.scrollDown = action.payload;
        },
        setScrolledHeight: (state, action:PayloadAction<number>) => {
            state.scrolledHeight = action.payload;
        },
    },
});

export default indicatorsSlice.reducer;
export const { actions: indicatorsWindowActions } = indicatorsSlice;
