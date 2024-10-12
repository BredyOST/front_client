import {Action, configureStore, ReducersMapObject, ThunkAction} from "@reduxjs/toolkit";
import {StateSchema} from "@/app/redux/config/stateSchema";
import authSliceReducer from '../entities/auth/authSlice';
import stateLoginPopupReducer from './../entities/popups/stateLoginPopupSlice/stateLoginPopupSlice';
import stateAuthWindowReducer from './../entities/stateAuthWindowSlice/stateAuthWindowSlice';
import indicatorWindowReducer from './../entities/indentidicatorsWindow/identificatorsWindowSlice';
import  notificationsReducer from './../entities/notifications/notificationsSlice';
import categoriesReducer from './../entities/categories/categoriesSlice';
import pricesReducer from './../entities/prices/pricesSlice';
import burgerMenuReducer from './../entities/stateBurger/stateBurgerSlice';
import searchParamsReducer from '../entities/searchParams/searchParamsSlice';
import messageReducer from '../saga/sendMessageFromContact/reducer'
import {requestApi} from "@/app/redux/entities/requestApi/requestApi";
import createSagaMiddleware from 'redux-saga';
import mySaga from '../saga/sendMessageFromContact/sagaMain';
import IndicatorsLogInReducer from './../entities/indicatorsLogInWindow/indicatorsLogInSlice'


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
    IndicatorsLogIn:IndicatorsLogInReducer,
    message: messageReducer,
    [requestApi.reducerPath]: requestApi.reducer,
};

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(requestApi.middleware).concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;