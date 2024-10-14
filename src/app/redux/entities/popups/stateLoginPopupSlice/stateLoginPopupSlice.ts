import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {StatePopupLoginSchema} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSliceSchema";


const initialState:StatePopupLoginSchema = {
    stateLoginFormPopup: false,
    categoriesPopup:false,
    stateFreePeriodPopup:true,
    goClosePopups:false,
};

export const StateLogingPopupSlice = createSlice({
    name: 'statePopup',
    initialState,
    reducers: {
        changeStateLoginFormPopup: (state, action:PayloadAction<boolean>) => {
            state.stateLoginFormPopup = action.payload;
        },
        changeStateCategoriesPopup: (state, action:PayloadAction<boolean>) => {
            state.categoriesPopup = action.payload;
        },
        changeStateFreePeriod: (state, action:PayloadAction<boolean>) => {
            state.categoriesPopup = action.payload;
        },
        closeAllPopups: (state, action:PayloadAction<boolean>) => {
            state.goClosePopups = action.payload;
        },
    },
});

export default StateLogingPopupSlice.reducer;
export const { actions: statePopupSliceActions } = StateLogingPopupSlice;
