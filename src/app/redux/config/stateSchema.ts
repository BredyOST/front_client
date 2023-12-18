import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import {AuthSchema} from "@/app/redux/entities/auth/types/authSchema";
import {StatePopupLoginSchema} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSliceSchema";
import {StateAuthWindowSchema} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSchema";
import {IdentificatorsWindowSchema} from "@/app/redux/entities/indentidicatorsWindow/identificatorsWindowSchema";
import {requestApi} from './../entities/requestApi/requestApi'
import {NotificationsSchema} from "@/app/redux/entities/notifications/notificationsSchema";
import {ICategoriesSchema} from "@/app/redux/entities/categories/categoriesSchema";
import {IPriceSchema} from "@/app/redux/entities/prices/pricesSchema";
import {StateBurgerMenuSchema} from "@/app/redux/entities/stateBurger/stateBurgerSchema";
import {ISearchParamsSchema} from "@/app/redux/entities/searchParams/searchParamsSchema";

export interface StateSchema {
    auth: AuthSchema,
    loginPopup:StatePopupLoginSchema,
    statePopup:StateAuthWindowSchema,
    indicatorWindow:IdentificatorsWindowSchema,
    notifications: NotificationsSchema,
    categories:ICategoriesSchema,
    prices:IPriceSchema,
    stateBurgerMenu:StateBurgerMenuSchema,
    searchParams:ISearchParamsSchema,
    [requestApi.reducerPath]: any
}

// для того чтобы использовать в ReducerManager. Будем вытягивать непоcредственно названия а не передавать массив строк
export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state:StateSchema, action:AnyAction) => CombinedState<StateSchema>;
    add: (key:StateSchemaKey, reducer:Reducer) => void;
    remove: (key:StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager:ReducerManager
}
