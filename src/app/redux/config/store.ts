import {Action, configureStore, ReducersMapObject, ThunkAction} from "@reduxjs/toolkit";
import {StateSchema} from "@/app/redux/config/stateSchema";
import authSliceReducer from '../entities/auth/slice/authSlice';
import stateLoginPopupReducer from './../entities/popups/stateLoginPopupSlice/stateLoginPopupSlice';
import stateAuthWindowReducer from './../entities/stateAuthWindowSlice/stateAuthWindowSlice';
import indicatorWindowReducer from './../entities/indentidicatorsWindow/identificatorsWindowSlice';
import  notificationsReducer from './../entities/notifications/notificationsSlice';
import categoriesReducer from './../entities/categories/categoriesSlice';
import pricesReducer from './../entities/prices/pricesSlice';
import burgerMenuReducer from './../entities/stateBurger/stateBurgerSlice';
import searchParamsReducer from '../entities/searchParams/searchParamsSlice';
import {requestApi} from "@/app/redux/entities/requestApi/requestApi";


const rootReducers: ReducersMapObject<StateSchema> = {
    auth: authSliceReducer,
    loginPopup:stateLoginPopupReducer,
    statePopup:stateAuthWindowReducer,
    indicatorWindow: indicatorWindowReducer,
    notifications:notificationsReducer,
    categories:categoriesReducer,
    prices:pricesReducer,
    stateBurgerMenu:burgerMenuReducer,
    searchParams:searchParamsReducer,
    [requestApi.reducerPath]: requestApi.reducer,
};

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(requestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
