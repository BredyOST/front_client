import React, {Dispatch, SetStateAction} from 'react';
import {useAppDispatch} from "@/app/redux/hooks/redux";
import {authSliceActions} from "@/app/redux/entities/auth/authSlice";
import {setThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {redirect} from "next/navigation";
import {UserAuthorization} from "@/app/redux/entities/auth/authSchema";
import {destroyCookie, setCookie} from "nookies";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";

/**
 * хук для изменения состояния
 **/
const useToggleState = (setEvent: Dispatch<SetStateAction<boolean>>) => {
    return () => setEvent((prevState) => !prevState);
};

/**
 * хук для добавления информации о пользователе и cookie после авторизации
 **/
const useAddInfoAboutUserWithCookie = (request:UserAuthorization):void => {
    console.log(32)
    const dispatch = useAppDispatch();
    const { addMainAdminRole, addAdminRole, addAuthStatus, addInfoUser, LogOutFromProfile } = authSliceActions;
    const { changeStateLoginFormPopup, closeAllPopups } = statePopupSliceActions;
    React.useEffect(() => {
        if (request && request.refreshToken) {
            dispatch(addInfoUser(request));
            dispatch(addAdminRole(request.isAdmin));
            dispatch(addMainAdminRole(request.isMainAdmin));
            dispatch(addAuthStatus(true));

            setThisCookie('_d', request.refreshToken);
            setThisCookie('_z', request.accessToken);
            setThisCookie('_a', request.sessionToken);
            dispatch(changeStateLoginFormPopup(false));

            if ((request.activatedFreePeriod && request.categoriesFreePeriod.length) || (request.categoriesHasBought.length)) {
                redirect('/dashboard/search');
                dispatch(closeAllPopups(true));
            } else {
                redirect('/dashboard/price');
                dispatch(closeAllPopups(true));
            }
            console.log(request)
        }
    },[request])
};

/**
 * хук для удаления информации о пользователе и очистке cookie после выхода из профиля
 **/
const useLogOutFromProfile = () => {
    console.log(34)
    const dispatch = useAppDispatch();
    const { addMainAdminRole, addAdminRole, addAuthStatus, addInfoUser, LogOutFromProfile } = authSliceActions;

    const logoutProfile = React.useCallback(() => {
        destroyCookie(null, "_z", { path: '/' });
        destroyCookie(null, "_d", { path: '/' });
        destroyCookie(null, "_a", { path: '/' });
        dispatch(LogOutFromProfile(null));
        dispatch(addMainAdminRole(false));
        dispatch(addAdminRole(false));
        dispatch(addAuthStatus(false));
        // location.reload()
    }, []);

    return {logoutProfile}
}

/**
 * хук для отображения окна уведомления при получении ответа от сервера при запросах
 * data оставил any т.к. много различных типов нужно добавлять, на все запросы где показывается уведомления
 **/
const useShowMessageAfterRequest= (obj:{text: string} | {message: string}, data:any, dataTwo?:any, dataThee?:any,) => {
    const dispatch = useAppDispatch();
    const { addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    React.useEffect(() => {
        if(typeof obj == 'object' && 'text' in obj && obj?.text) {
            dispatch(addInfoForCommonRequest({text: data?.text}))
        }
        if(typeof obj == 'object' && 'message' in obj && obj?.message) {
            dispatch(addInfoForCommonError({message: data?.text}))
        }
    },[data, dataTwo && dataTwo, dataThee && dataThee])
}

const useLocalStorage = (name:string, value:string) => {
    setCookie(null, name, value, {
        path: '/',
    });

}

// const useErrorOrRequestHandler = (message: {message: string} | string, type:'request' | 'error') => {
//     const dispatch = useAppDispatch();
//     const {addInfoForCommonError, addInfoForCommonRequest} = indicatorsNotifications
//     const handleError = (message: string, type:'request' | 'error') => {
//         if(type == 'request') {
//             dispatch(addInfoForCommonRequest(message));
//         }
//
//         if(type == 'error') {
//             dispatch(addInfoForCommonError({ message }));
//         }
//     };
//     return { handleError };
// };
//
//
//
export { useToggleState, useAddInfoAboutUserWithCookie, useLogOutFromProfile, useShowMessageAfterRequest };