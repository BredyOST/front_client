'use client';
import React, {FC} from 'react';
import cls from './recoverPassword.module.scss'
import Loader from "@/ui/Loader/Loader";
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    useCallMutation,
    useChangePasswordMutation,
    useNumberTgForgetPasswordMutation
} from "@/app/redux/entities/requestApi/requestApi.test";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import PhoneInput from "react-phone-number-input";
import PhoneSvg from "@/assets/svgs/phone.svg";
import EmailSvg from "@/assets/svgs/email.svg";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import ShowSvg from "@/assets/svgs/show.svg";
import HideSvg from "@/assets/svgs/hide.svg";
import {passwordHide} from "@/features/helpersAuth/helpersRegistration";
import {IndicatorsLogInAction} from "@/app/redux/entities/indicatorsLogInWindow/indicatorsLogInSlice";
import {
    ActiveTabIdType, ActiveWindowType, ForTextFormsRecovery, LoginFormRecovery, LoginTextRecovery,
    ObjForReqCallType,
    SendNewPasswordTwoType,
    SendNewPasswordType, TypeForFunc
} from "@/shared/types/types";
import {loginTextRecovery} from "@/shared/constants/constants";



export const RecoverPassword = () => {

    const dispatch = useAppDispatch();

    let[sendNewPassword, {data:messageNewPassword, error:errorNewPassword, isError: isNewPassword, isLoading: loadingNewPassword}] = useChangePasswordMutation();
    const [reqCall, {data:requestCall, error:errorrequestCall, isError: isErrorCall, isLoading: loadingReqCall}] =  useCallMutation()
    const [reqTgForgetPassword, {data:requestTgForgetPassword, error:errorrequestTgForgetPassword, isError: isErrorTgForgetPassword, isLoading: loadingReqTgForgetPassword}] =  useNumberTgForgetPasswordMutation()

    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;
    const { changeStateCurrentPopupNumber } = stateAuthWindowSliceActions;

    const [activeTab, setActiveTab] = React.useState<ActiveTabIdType>(1);
    const {activeWindow} = useAppSelector(state => state.IndicatorsLogIn)
    const {changeActiveWindow} = IndicatorsLogInAction

    const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHide>({
        enteredRegisterText: false, enteredRegisterCheckText:false, registerBtnShowOrHide: false, registerBtnCheckShowOrHide: false,
    });
    const [textFromForms, setTextFromForms] = React.useState<ForTextFormsRecovery>({
        passwordRegister: '', passwordRegisterCheck: '',
    });

    const passwordRegisterRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRegisterCheckRef = React.useRef<HTMLInputElement | null>(null);

    const { currentPopupNumber } = useAppSelector((state) => state.statePopup);

    const onSubmit: SubmitHandler<LoginFormRecovery> = (data:LoginFormRecovery) => {
        if (activeTab == 1) {
            if (activeWindow == `1`) {
                if (data?.phoneNumber?.length <= 6) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательное поле, номер телефона'}))
                    return;
                } else if (data?.phoneNumber?.length > 7) {
                    const objForReqCall: ObjForReqCallType = {
                        phone: data?.phoneNumber,
                        indicator: `1`
                    }
                    reqCall(objForReqCall)
                }
            }
            if (activeWindow == `2`) {
                if (data?.phoneNumber?.length <= 6 || data?.password.length <= 0 || data?.passwordTwo.length <= 0 || data?.code.length <= 0) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона, пароли и код подтверждения'}))
                    return;
                } else {
                    const objSendNewPassword:SendNewPasswordTwoType = {
                        email: data?.myEmail,
                        phoneNumber: data?.phoneNumber,
                        password: data?.password,
                        passwordTwo: data?.passwordTwo,
                        code: data?.code,
                        indicator: `2`
                    }
                    sendNewPassword(objSendNewPassword)
                }
            }
        }
        if (activeTab == 2) {
            if (activeWindow == `1`) {
                if (data?.phoneNumber?.length <= 6) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательное поле, номер телефона'}))
                    return;
                } else {
                    const ObjReqTgForgetPassword: ObjForReqCallType = {
                        phone: data?.phoneNumber,
                        indicator: `1`
                    }
                    reqTgForgetPassword(ObjReqTgForgetPassword)
                }
            }
            if (activeWindow == `2`) {
                if (data?.phoneNumber?.length <= 6 || data?.password.length <= 0 || data?.passwordTwo.length <= 0 || data?.code.length <= 0) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона, пароли и код подтверждения'}))
                    return;
                } else {
                    const ObjSendNewPassword:SendNewPasswordType = {
                        phoneNumber: data?.phoneNumber,
                        password: data?.password,
                        passwordTwo: data?.passwordTwo,
                        code: data?.code,
                        indicator: `1`
                    }
                    sendNewPassword(ObjSendNewPassword)
                }
            }
        }
    }

    const {register, handleSubmit, control, setError, formState: { errors, isValid },} = useForm<LoginFormRecovery>({
        mode: 'onChange',
    });

    const backToLoginIn:TypeForFunc<void, void> = () => {
        dispatch(changeStateCurrentPopupNumber(0));
    };

    React.useEffect(() => {
        if (messageNewPassword?.text ==`Пароль успешно изменен` || messageNewPassword?.text ==`Ожидайте сообщения от официального бота, в течении нескольких минут вам будет направлено сообщение с новым паролем` ) {
            dispatch(changeStateCurrentPopupNumber(0))
        }
    },[messageNewPassword])
    const showAndHideTextPassword:TypeForFunc<void, void> = () => {
        setPasswordHideButton({ ...passwordHideButton, registerBtnShowOrHide: !passwordHideButton.registerBtnShowOrHide });
    };
    const showAndHideTextSecondPassword:TypeForFunc<void, void> = () => {
        setPasswordHideButton({ ...passwordHideButton, registerBtnCheckShowOrHide: !passwordHideButton.registerBtnCheckShowOrHide });
    };
    const changeActiveTab:TypeForFunc<ActiveTabIdType, void> = (id) => {
        setActiveTab(id)
    }
    const changeClickWindow:TypeForFunc<ActiveWindowType,void>= (num)=> {
        dispatch(changeActiveWindow(num))
    }

    const checkTextFormsLogin:TypeForFunc<React.ChangeEvent<HTMLFormElement>, void> = (e:React.ChangeEvent<HTMLFormElement>) => {
        const targetName:string = e.target.name;
        const value:string = e.target.value;

        if (targetName === 'password' || targetName === 'passwordTwo') {
            const isPassword:boolean = targetName === 'password';
            const isPasswordCheck:boolean = targetName === 'passwordTwo';
            if (isPassword) {
                setTextFromForms({ ...textFromForms, passwordRegister: value });
                value.length
                    ?  setPasswordHideButton({ ...passwordHideButton, enteredRegisterText: true })
                    :  setPasswordHideButton({ ...passwordHideButton, enteredRegisterText: false });
            }
            if(isPasswordCheck) {
                setTextFromForms({ ...textFromForms, passwordRegisterCheck: value });
                value.length
                    ? setPasswordHideButton({ ...passwordHideButton, enteredRegisterCheckText: true })
                    : setPasswordHideButton({ ...passwordHideButton, enteredRegisterCheckText: false });
            }
        }
    };

    if (currentPopupNumber != 2 ) {
        return null
    }

    return (
        <form
            className={cls.form}
            onSubmit={handleSubmit(onSubmit)}
            onChange={checkTextFormsLogin}
        >
            <h2
                className={cls.title}
            >Выберите способ восстановление пароля
            </h2>
            <div className={cls.coverBtn}>
                <div className={cls.coverPhoneAndMail}>
                    {loginTextRecovery && loginTextRecovery.map((item: LoginTextRecovery) => (
                        <Button
                            key={item.id}
                            classname={cls.choose}
                            indicatorActiveTab={item.id == activeTab}
                            onClick={() => changeActiveTab(item.id)}
                        >
                            {item.text === 'Звонок' && <PhoneSvg className={cls.phoneSvg} />}
                            {item.text === 'Телеграмм'&& <EmailSvg className={cls.emailSvg} />}
                            {item.text}
                        </Button>
                    ))}
                </div>
            </div>
            <div className={cls.inputsForm}>
                {activeTab == 1 &&
                    <div className={cls.text}>
                        Восстановление пароля по звонку доступно для России, Казахстана, Беларуси, Украины.
                    </div>
                }
                {activeTab == 2 &&
                    <div className={cls.text}>
                        На зарегистрированный номер в телеграмм чат придет код.
                    </div>
                }
                <h3 className={cls.text}>Введите номер в международном формате на который зарегистрирован аккаунт.</h3>
                <Controller
                    name="phoneNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }: { field: any}) => (
                        <PhoneInput
                            className={cls.input}
                            international
                            defaultCountry="RU"
                            placeholder="Введите номер телефона"
                            defaultValue=""
                            countries={['RU', 'KZ', 'BY', 'UA']}
                            register={{
                                ...register('phoneNumber', {}),
                            }}
                            {...field}
                        />
                    )}
                />
                <div className={cls.coverBtnTwo}>
                    <Button
                        classname={cls.btnGet}
                        type={'submit'}
                        onClick={() => changeClickWindow(`1`)}
                    >
                        {activeTab == 1 ? "Запрос вызова" : "Запрос кода"}
                    </Button>
                </div>
                <>
                    <Input
                        type="text"
                        classForInput={cls.input}
                        placeholder="4 последние цифры номера"
                        classname={cls.inputRelative}
                        autofocus
                        defaultValue=''
                        register={{ ...(register('code')) }}
                    />
                    <Input
                        classForInput={cls.input}
                        placeholder="Введите новый пароль"
                        type={passwordHideButton.registerBtnShowOrHide ? 'text' : 'password'}
                        classname={cls.inputRelative}
                        forRef={passwordRegisterRef}
                        autofocus
                        defaultValue={textFromForms.passwordRegister}
                        register={{ ...(register('password')) }}
                    >
                        {
                            passwordHideButton.enteredRegisterText
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        name='textRegistrationPasswordMain'
                                        addNametoFunction={true}
                                        onClick={showAndHideTextPassword}
                                    >
                                        {!passwordHideButton.registerBtnShowOrHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                    </Button>
                                )
                        }
                    </Input>
                    <Input
                        classForInput={cls.input}
                        placeholder="Повторите новый пароль"
                        type={passwordHideButton.registerBtnCheckShowOrHide ? 'text' : 'password'}
                        classname={cls.inputRelative}
                        forRef={passwordRegisterCheckRef}
                        autofocus
                        defaultValue={textFromForms.passwordRegisterCheck}
                        register={{ ...(register('passwordTwo')) }}
                    >
                        {
                            passwordHideButton.enteredRegisterCheckText
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        name='textRegistrationPasswordMain'
                                        addNametoFunction={true}
                                        onClick={showAndHideTextSecondPassword}
                                    >
                                        {!passwordHideButton.registerBtnCheckShowOrHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                    </Button>
                                )
                        }
                    </Input>
                </>
            </div>
            <div className={cls.btnCoverTwo}>
                <Button
                    classname={cls.btnLogIn}
                    type="submit"
                    onClick={() => changeClickWindow(`2`)}
                >
                    <span>Отправить</span>
                </Button>
                <Button
                    classname={cls.back}
                    onClick={backToLoginIn}
                >
                    Вернуться
                </Button>
            </div>
            { loadingNewPassword
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
            { loadingReqCall
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </form>

    );
};

export default RecoverPassword;