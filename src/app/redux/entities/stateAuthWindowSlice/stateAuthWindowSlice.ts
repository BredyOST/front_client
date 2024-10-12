import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {StateAuthWindowSchema} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSchema";


const initialState: StateAuthWindowSchema = {
    currentPopupNumber: 0,
};

export const stateAuthWindowSlice = createSlice({
    name: 'Indicators',
    initialState,
    reducers: {
        changeStateCurrentPopupNumber: (state, action: PayloadAction<number>) => {
            state.currentPopupNumber = action.payload;
        },
    },
});

export default stateAuthWindowSlice.reducer;
export const { actions: stateAuthWindowSliceActions } = stateAuthWindowSlice;
