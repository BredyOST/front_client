import { RootState } from '@/app/redux/config/store';

export const selectAuthState = (state: RootState) => state.auth.stateAuth;
