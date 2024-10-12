import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPriceSchema, pricesType} from "@/app/redux/entities/prices/pricesSchema";


const initialState:IPriceSchema = {
    prices:[],
    activePriceWindows: 1
};

export const PricesSLice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        addPrices: (state, action:PayloadAction<pricesType[]>) => {
            state.prices = action.payload;
        },
        addActivePrice: (state, action:PayloadAction<number>) => {
            state.activePriceWindows = action.payload;
        },
    },
});

export default PricesSLice.reducer;
export const { actions: PricesSLiceActions } = PricesSLice;
