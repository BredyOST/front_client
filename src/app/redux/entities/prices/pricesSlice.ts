import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPriceSchema} from "@/app/redux/entities/prices/pricesSchema";


const initialState:IPriceSchema = {
    prices:[],
    activePriceWindows: 1
};

export const PricesSLice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        addPrices: (state, action:PayloadAction<any>) => {
            state.prices = action.payload;
        },
        addActivePrice: (state, action:PayloadAction<any>) => {
            state.activePriceWindows = action.payload;
        },
    },
});

export default PricesSLice.reducer;
export const { actions: PricesSLiceActions } = PricesSLice;

export class pricesReducer {
}