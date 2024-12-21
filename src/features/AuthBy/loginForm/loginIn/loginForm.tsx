// import React, {ChangeEvent} from 'react';
// import cls from "@/app/components/features/AuthBy/loginForm/loginForm.module.scss";
// import {
//     ForTextFormsType,
//     loginFormType,
//     loginText,
//     loginTextType,
//     passwordHideType
// } from "@/app/components/features/helpersAuth/helpersAuthLogin";
// import {Button} from "@/app/components/shared/ui/Button/Button";
// import {ActiveTabIdType, TypeForFunc} from "@/app/types/types";
// import PhoneSvg from "@/app/components/svgs/phone.svg";
// import EmailSvg from "@/app/components/svgs/email.svg";
// import {Input} from "@/app/components/shared/ui/input/Input";
// import {Controller, useForm} from "react-hook-form";
// import PhoneInput from "react-phone-number-input/min";
// import ShowSvg from "@/app/components/svgs/show.svg";
// import HideSvg from "@/app/components/svgs/hide.svg";
// import Loader from "@/app/components/shared/ui/Loader/Loader";
// import {useAppDispatch} from "@/app/redux/hooks/redux";
//
// interface ILoginForm {
//     setActiveTab:(arg: ActiveTabIdType) => void
//     currentPopupNumber:number
//     changeStateCurrentPopupNumber:(arg:number) => number
//     onSubmit: () => void
//     activeTab:ActiveTabIdType
//     loadingLogin:boolean
// }
//
//
// const LoginForm = ({
//     setActiveTab, currentPopupNumber, changeStateCurrentPopupNumber, activeTab,onSubmit, loadingLogin
// }:ILoginForm) => {
//
//     const dispatch = useAppDispatch();
//
//     const {register, handleSubmit, setError, control, formState: { errors, isValid },} = useForm<loginFormType>({
//         mode: 'onChange',
//     });
//
//     const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHideType>({
//         enteredLoginText: false,  passwordBtnShowOrHide: false,
//     });
//     const [textFromForms, setTextFromForms] = React.useState<ForTextFormsType>({
//         loginIn: '', passwordLogin: '',
//     });
//
//     const loginRef = React.useRef<HTMLInputElement | null>(null);
//     const passwordLoginRef = React.useRef<HTMLInputElement | null>(null);
//     const changeActiveTab:TypeForFunc<ActiveTabIdType, void> = (id: ActiveTabIdType):void => {
//         setActiveTab(id)
//     }
//     const showAndHideTextPassword:TypeForFunc<void, void> = () => {
//         setPasswordHideButton(prevState => ({...prevState, passwordBtnShowOrHide: !passwordHideButton.passwordBtnShowOrHide }));
//     };
//     const checkTextFormsLogin:TypeForFunc<ChangeEvent<HTMLFormElement>, void> = (e:ChangeEvent<HTMLFormElement>) => {
//         const targetName = e.target.name;
//         const value = e.target.value;
//
//         if (currentPopupNumber === 0 && targetName === `passwordLoginIn`) {
//             setTextFromForms({ ...textFromForms, passwordLogin: e.target.value });
//             value.length && !passwordHideButton.enteredLoginText && setPasswordHideButton({ ...passwordHideButton, enteredLoginText: true })
//             !value.length && passwordHideButton.enteredLoginText && setPasswordHideButton({ ...passwordHideButton, enteredLoginText: false })
//         }
//     };
//     const changeStateEnterOrRegister:TypeForFunc<void, void> = () => {
//         dispatch(changeStateCurrentPopupNumber(1));
//     };
//     const changeStateAccessNumber:TypeForFunc<void, void> = () => {
//         dispatch(changeStateCurrentPopupNumber(4));
//     }
//     const openWindowRecoveryAccess:TypeForFunc<void, void> = ()=> {
//         dispatch(changeStateCurrentPopupNumber(2));
//     };
//
//     return (
//         <form
//             className={cls.form}
//             onSubmit={handleSubmit(onSubmit)}
//             onChange={checkTextFormsLogin}
//         >
//             <h2
//                 className={cls.title}
//             >
//                 Вход в учетную запись
//             </h2>
//             <div className={cls.coverBtn}>
//                 <h3 className={cls.titleForBtn}>Выберите способ авторизации</h3>
//                 <div className={cls.coverPhoneAndMail}>
//                     {loginText && loginText.map((item: loginTextType) => (
//                         <Button
//                             key={item.id}
//                             classname={cls.choose}
//                             indicatorActiveTab={item.id == activeTab}
//                             onClick={() => changeActiveTab(item.id as ActiveTabIdType)}
//                         >
//                             {item.text === 'Телефон' && <PhoneSvg className={cls.phoneSvg}/>}
//                             {item.text === 'Email' && <EmailSvg className={cls.emailSvg}/>}
//                             {item.text}
//                         </Button>
//                     ))}
//                 </div>
//             </div>
//             <div className={cls.inputsForm}>
//                 {activeTab == 1 &&
//                     <Input
//                         type={activeTab === 1 ? 'text' : 'tel'}
//                         classForInput={cls.input}
//                         classname={cls.inputRelative}
//                         placeholder={activeTab === 1 ? 'Введите email' : 'Номер телефона'}
//                         autofocus
//                         defaultValue={textFromForms.loginIn}
//                         autoComplete="login"
//                         forRef={loginRef}
//                         disabled={loadingLogin && true}
//                         register={{...register('mailOrNumberLoginIn')}}
//                     />
//                 }
//                 {activeTab == 2 &&
//                     <Controller
//                         name="mailOrNumberLoginIn"
//                         control={control}
//                         defaultValue=""
//                         render={({field}: { field: any }) => (
//                             <PhoneInput
//                                 className={cls.input}
//                                 international
//                                 placeholder="Введите номер телефона"
//                                 value={textFromForms.loginIn}
//                                 defaultCountry="RU"
//                                 register={{
//                                     ...register('mailOrNumberLoginIn', {}),
//                                 }}
//                                 {...field}
//                             />
//                         )}
//                     />
//                 }
//                 <div
//                     className={cls.coverPassword}
//                 >
//                     <Input
//                         classForInput={cls.input}
//                         type={passwordHideButton.passwordBtnShowOrHide ? 'text' : 'password'}
//                         placeholder="Введите пароль"
//                         defaultValue={textFromForms.passwordLogin}
//                         classname={cls.inputRelative}
//                         autoComplete="password"
//                         forRef={passwordLoginRef}
//                         disabled={loadingLogin && true}
//                         register={{...register('passwordLoginIn')}}
//                     >
//                         {
//                             passwordHideButton.enteredLoginText
//                             && (
//                                 <Button
//                                     type="button"
//                                     classname={cls.hideButton}
//                                     name='textLoginPasswordMain'
//                                     addNametoFunction={true}
//                                     onClick={showAndHideTextPassword}
//                                 >
//                                     {!passwordHideButton.passwordBtnShowOrHide ? <ShowSvg className={cls.showSvg}/> :
//                                         <HideSvg className={cls.hideSvg}/>}
//                                 </Button>
//                             )
//                         }
//                     </Input>
//                 </div>
//             </div>
//             <div className={cls.btnCover}>
//                 <div className={cls.blockAdditional}>
//                     <Button
//                         classname={cls.profileRegistration}
//                         onClick={changeStateEnterOrRegister}
//                     >
//                         Регистрация
//                     </Button>
//                     <Button
//                         classname={cls.profileRegistration}
//                         onClick={changeStateAccessNumber}
//                     >
//                         Подтвердить номер телефона
//                     </Button>
//                     <Button
//                         classname={cls.forgetPassword}
//                         onClick={openWindowRecoveryAccess}
//                     >
//                         Восстановление пароля
//                     </Button>
//                     {/*<Button*/}
//                     {/*    classname={cls.noMessage}*/}
//                     {/*    onClick={dontGetMessageActivation}*/}
//                     {/*>*/}
//                     {/*    Получить код подтверждения повторно*/}
//                     </Button>
//                 </div>
//                 <div className={cls.button}>
//                     <Button
//                         classname={cls.btnEnter}
//                         type="submit"
//                     >
//                         <span>Войти</span>
//                     </Button>
//                 </div>
//             </div>
//             {loadingLogin
//                 && (
//                     <Loader
//                         classname="color-dark"
//                     />
//                 )}
//         </form>
//     );
// };
//
// export default LoginForm;