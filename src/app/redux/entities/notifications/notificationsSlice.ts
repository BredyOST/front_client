import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NotificationsSchema} from "@/app/redux/entities/notifications/notificationsSchema";

const initialState:NotificationsSchema = {
    commonForRequest:'',
    commonForError:'',
}

const notifications = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        addInfoForCommonRequest:(state, action:PayloadAction<{text: string} | string>) => {
            state.commonForRequest = action.payload;
        },
        addInfoForCommonError:(state, action:PayloadAction<{message: string} | string>) => {
            state.commonForError = action.payload;
        },
    },
});

export default notifications.reducer;
export const { actions: indicatorsNotifications } = notifications;
