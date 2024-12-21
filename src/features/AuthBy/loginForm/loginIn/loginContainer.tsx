// import React from 'react';
// import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
// import {useLoginInMutation} from "@/app/redux/entities/requestApi/requestApi";
// import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
// import {SubmitHandler} from "react-hook-form";
// import {loginFormType} from "@/app/components/features/helpersAuth/helpersAuthLogin";
// import {ActiveTabIdType} from "@/app/types/types";
// import LoginForm from "@/app/components/features/AuthBy/loginForm/loginIn/loginForm";
// import {useAddInfoAboutUserWithCookie} from "@/app/hooks/hooks";
//
// const LoginContainer = () => {
//
//     const dispatch = useAppDispatch();
//
//     let [loginEnter, {
//         data: requestLogin, error: errorLogin, isError: isErrorLogin, isLoading: loadingLogin,
//     }] = useLoginInMutation();
//
//     const [activeTab, setActiveTab] = React.useState<ActiveTabIdType>(2);
//
//     const { changeStateCurrentPopupNumber } = stateAuthWindowSliceActions;
//     const { currentPopupNumber } = useAppSelector((state) => state.statePopup);
//
//     const onSubmit: SubmitHandler<loginFormType> = (data:loginFormType) => {
//         /**
//          * activeTab === 1 - вход через email
//          * activeTab === 2 - вход через номер телефона
//          **/
//         if (activeTab === 1) {
//             loginEnter({ email: data.mailOrNumberLoginIn, phoneNumber: 'no date', password: data.passwordLoginIn, });
//         }
//         if (activeTab === 2) {
//             loginEnter({ email: 'no date', phoneNumber: data.mailOrNumberLoginIn, password: data.passwordLoginIn, });
//         }
//     }
//
//     useAddInfoAboutUserWithCookie(requestLogin)
//
//     if (currentPopupNumber != 0 ) {
//         return null
//     }
//
//     return <LoginForm
//         setActiveTab={setActiveTab}
//         currentPopupNumber={currentPopupNumber}
//         changeStateCurrentPopupNumber={changeStateCurrentPopupNumber}
//         onSubmit={onSubmit}
//         activeTab={activeTab}
//         loadingLogin={loadingLogin}
//     />
// };
//
// export default LoginContainer;