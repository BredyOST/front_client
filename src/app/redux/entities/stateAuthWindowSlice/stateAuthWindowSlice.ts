import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {StateAuthWindowSchema} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSchema";


const initialState: StateAuthWindowSchema = {
    clickOnEnter: 0,
};

export const stateAuthWindowSlice = createSlice({
    name: 'Indicators',
    initialState,
    reducers: {
        changeStateClickOnEnter: (state, action: PayloadAction<number>) => {
            state.clickOnEnter = action.payload;
        },
    },
});

export default stateAuthWindowSlice.reducer;
export const { actions: stateAuthWindowSliceActions } = stateAuthWindowSlice;
