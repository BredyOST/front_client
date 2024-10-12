import {IndicatorsLogInSchema} from "@/app/redux/entities/indicatorsLogInWindow/indicatorsLogInSchema";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActiveWindowType} from "@/app/types/types";

const initialState: IndicatorsLogInSchema = {
    activeWindow: ''
}


const IndicatorsLogInSlice = createSlice({
    name: 'IndicatorsLogInWindow',
    initialState,
    reducers: {
        changeActiveWindow: (state, action:PayloadAction<ActiveWindowType>) => {
            state.activeWindow = action.payload
        }
    }
})

export default IndicatorsLogInSlice.reducer;
export const {actions: IndicatorsLogInAction} = IndicatorsLogInSlice