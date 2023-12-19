import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPriceSchema} from "@/app/redux/entities/prices/pricesSchema";


const initialState:IPriceSchema = {
    prices:[]
};

export const PricesSLice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        addPrices: (state, action:PayloadAction<any>) => {
            state.prices = action.payload;
        },
    },
});

export default PricesSLice.reducer;
export const { actions: PricesSLiceActions } = PricesSLice;

export class pricesReducer {
}