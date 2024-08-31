import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthSchema, User } from '../types/authSchema';

const initialState: AuthSchema = {
    data: null,
    isAdmin: false,
    isMainAdmin: false,
    stateAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addInfoUser: (state, action: PayloadAction<User | null>) => {
            state.data = action.payload;
        },
        addAdminRole: (state, action: PayloadAction<boolean>) => {
            state.isAdmin = action.payload;
        },
        addMainAdminRole: (state, action: PayloadAction<boolean>) => {
            state.isMainAdmin = action.payload;
        },
        addAuthStatus: (state, action: PayloadAction<boolean>) => {
            state.stateAuth = action.payload;
        },
        LogOutFromProfile: (state, action: PayloadAction<null>) => {
            state.data = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { actions: authSliceActions } = authSlice;
