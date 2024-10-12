import {AuthSchema} from "@/app/redux/entities/auth/authSchema";
import {StatePopupLoginSchema} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSliceSchema";
import {StateAuthWindowSchema} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSchema";
import {IdentificatorsWindowSchema} from "@/app/redux/entities/indentidicatorsWindow/identificatorsWindowSchema";
import {requestApi} from './../entities/requestApi/requestApi'
import {NotificationsSchema} from "@/app/redux/entities/notifications/notificationsSchema";
import {ICategoriesSchema} from "@/app/redux/entities/categories/categoriesSchema";
import {IPriceSchema} from "@/app/redux/entities/prices/pricesSchema";
import {StateBurgerMenuSchema} from "@/app/redux/entities/stateBurger/stateBurgerSchema";
import {ISearchParamsSchema} from "@/app/redux/entities/searchParams/searchParamsSchema";
import {IndicatorsLogInSchema} from "@/app/redux/entities/indicatorsLogInWindow/indicatorsLogInSchema";

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
    IndicatorsLogIn: IndicatorsLogInSchema,
    message:any
    // message: any
    [requestApi.reducerPath]: any
}