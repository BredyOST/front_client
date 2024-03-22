'use client';
import React, {FC} from 'react';
import cls from './../loginForm.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import EmailSvg from "@/app/components/svgs/email.svg";
import PhoneSvg from "@/app/components/svgs/phone.svg";
import {Input} from "@/app/components/shared/ui/input/Input";
import ShowSvg from "@/app/components/svgs/show.svg";
import HideSvg from "@/app/components/svgs/hide.svg";
import {useLoginInMutation} from "@/app/redux/entities/requestApi/requestApi";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import {Control, Controller, SubmitHandler, useForm} from "react-hook-form";
import {setThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import {authSliceActions} from "@/app/redux/entities/auth/slice/authSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {redirect} from "next/navigation";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import PhoneInput from "react-phone-number-input";

interface LogiInProps {
}

const loginText: any = [
    { id: 2, text: 'Телефон' },
    { id: 1, text: 'Email' },
]

type loginForm = {
    mailOrNumberLoginIn: string | number,
    passwordLoginIn: string,
}

interface passwordHide {
    login: boolean,
    loginShowHide: boolean,
}

interface ForTextForms {
    loginIn: string,
    passwordLogin: string,
}
const LogiIn:FC<LogiInProps> = (props) => {
    const {
    } = props;
    const dispatch = useAppDispatch();

    //RTK
    // Запрос на вход
    let [loginEnter, {
        data: requestLogin, error: errorLogin, isError: isErrorLogin, isLoading: loadingLogin,
    }] = useLoginInMutation();

    //ACTIONS FROM REDUX
    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    // для сохранения данных о пользователе
    const {
        addMainAdminRole, addAdminRole, addAuthStatus, addInfoUser, LogOutFromProfile,
    } = authSliceActions;
    const { changeStateLoginFormPopup, closeAllPopups } = statePopupSliceActions;
    //STATES FROM REDUX
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);
    // что выбрано - email или phone при авторизации
    const [activeTab, setActiveTab] = React.useState<number>(2);
    //USESTATE

    // для отображения введенных символов в инпуте пароля, login и registration, registerCheck - false значит ничего в поля не введено, loginShowHide, registerShowHide: false - значит пароль скрыт
    const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHide>({
        login: false,  loginShowHide: false,
    });
    // для того чтобы делать проверки после введенного логина в графы. Делаем управляемые импуты
    const [textFromForms, setTextFromForms] = React.useState<ForTextForms>({
        loginIn: '', passwordLogin: '',
    });

    //USEREF
    // для получения элемента input при входе (ввод логина)
    const loginRef = React.useRef<HTMLInputElement | null>(null);
    // для получения элемента input при входе в учетную запись (ввод пароля)
    const passwordLoginRef = React.useRef<HTMLInputElement | null>(null);

    //FUNCTIONS

    const onSubmit: SubmitHandler<loginForm> = (data) => {
        // вход в учетную запись
        if (activeTab === 1) {
            loginEnter({ email: data.mailOrNumberLoginIn, phoneNumber: 'no date', password: data.passwordLoginIn, });
        }
        // через номер телефона
        if (activeTab === 2) {
            loginEnter({ email: 'no date', phoneNumber: data.mailOrNumberLoginIn, password: data.passwordLoginIn, });
        }
    }

    //  для отправки запроса с form и регистрации полей инпута, для валидации регистрации. когда поля пустые выдает предупреждение
    const {register, handleSubmit, setError, control, formState: { errors, isValid },} = useForm<loginForm>({
        mode: 'onChange',
    });

    const changeActiveTab = (id: number) => {
        setActiveTab(id)
    }

    // для изменения индикатора который меняет type у input на text или password. Показать или скрыть пароль при вводе
    const showAndHideTextPassword = (name:string) => {
        setPasswordHideButton({ ...passwordHideButton, loginShowHide: !passwordHideButton.loginShowHide });
    };

    // тут меняем на false для того чтобы после смены окна опять индикаторы были в false и не было кнопки открытия с сохранившейся позицией. Сохранялось в общем выбранное в предыдущем окне
    const changeStateEnterOrRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(changeStateClickOnEnter(1));
    };
    const changeStateAccessNumber = () => {
        dispatch(changeStateClickOnEnter(4));
    }

    // для отображения кнопки показать/скрыть пароль в окне входа в учетную запись
    const checkTextFormsLogin = (e: any) => {
        const targetName = e.target.name;
        const value = e.target.value;

        if (clickOnEnter === 0 && targetName === `passwordLoginIn`) {
            setTextFromForms({ ...textFromForms, passwordLogin: e.target.value });
            value.length && !passwordHideButton.login && setPasswordHideButton({ ...passwordHideButton, login: true })
            !value.length && passwordHideButton.login && setPasswordHideButton({ ...passwordHideButton, login: false })
        }
    };

    // меняем на окно забыл логин или пароль
    const openWindowRecoveryAccess = () => {
        dispatch(changeStateClickOnEnter(2));
    };
    const dontGetMessageActivation= () => {
        dispatch(changeStateClickOnEnter(4));
    };

    React.useEffect(() => {
        if (requestLogin && requestLogin.refreshToken) {
            dispatch(addInfoUser(requestLogin));
            dispatch(addAdminRole(requestLogin.isAdmin));
            dispatch(addMainAdminRole(requestLogin.isMainAdmin));
            dispatch(addAuthStatus(true));
            setThisCookie('_d', requestLogin.refreshToken)
            setThisCookie('_z', requestLogin.accessToken)
            setThisCookie('_a', requestLogin.sessionToken)
            dispatch(changeStateLoginFormPopup(false));
            if ((requestLogin?.activatedFreePeriod && requestLogin?.categoriesFreePeriod?.length) || (requestLogin?.categoriesHasBought?.length)) {
                redirect('/dashboard/search')
                dispatch(closeAllPopups(true));
            } else {
                redirect('/dashboard/price')
                dispatch(closeAllPopups(true));
            }
        }
    },[requestLogin])

    if (clickOnEnter != 0 ) {
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
            >
                Вход в учетную запись
            </h2>
            <div className={cls.coverBtn}>
                <h3 className={cls.titleForBtn}>Выберите способ авторизации</h3>
                <div className={cls.coverPhoneAndMail}>
                    {loginText && loginText.map((item: any) => (
                        <Button
                            key={item.id}
                            classname={cls.choose}
                            indicatorActiveTab={item.id == activeTab}
                            onClick={() => changeActiveTab(item.id)}
                        >
                            {item.text === 'Телефон' && <PhoneSvg className={cls.phoneSvg} />}
                            {item.text === 'Email' && <EmailSvg className={cls.emailSvg} />}
                            {item.text}
                        </Button>
                    ))}
                </div>
            </div>
            <div className={cls.inputsForm}>
                {activeTab == 1 &&
                    <Input
                        type={activeTab === 1 ? 'text' : 'tel'}
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        placeholder={activeTab === 1 ? 'Введите email' : 'Номер телефона'}
                        autofocus
                        defaultValue={textFromForms.loginIn}
                        autoComplete="login"
                        forRef={loginRef}
                        disabled={loadingLogin && true}
                        register={{ ...register('mailOrNumberLoginIn') }}
                    />
                }
                {activeTab == 2 &&
                    <Controller
                        name="mailOrNumberLoginIn"
                        control={control}
                        defaultValue=""
                        render={({ field }: { field: any}) => (
                            <PhoneInput
                                className={cls.input}
                                international
                                placeholder="Введите номер телефона"
                                value={textFromForms.loginIn}
                                defaultCountry="RU"
                                inputStyle={{ width: '100%' }} // Настройте стили ввода
                                register={{
                                    ...register('mailOrNumberLoginIn', {}),
                                }}
                                {...field}
                            />
                        )}
                    />
                }
                <div
                    className={cls.coverPassword}
                >
                    <Input
                        classForInput={cls.input}
                        type={passwordHideButton.loginShowHide ? 'text' : 'password'}
                        placeholder="Пароль"
                        defaultValue={textFromForms.passwordLogin}
                        classname={cls.inputRelative}
                        autoComplete="password"
                        forRef={passwordLoginRef}
                        disabled={loadingLogin && true}
                        register={{ ...register('passwordLoginIn') }}
                    >
                        {
                            passwordHideButton.login
                            && (
                                <Button
                                    type="button"
                                    classname={cls.hideButton}
                                    name='textLoginPasswordMain'
                                    addNametoFunction={true}
                                    onClick={showAndHideTextPassword}
                                >
                                    {!passwordHideButton.loginShowHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                </Button>
                            )
                        }
                    </Input>
                </div>
            </div>
            <div className={cls.btnCover}>
                <div className={cls.blockAdditional}>
                    <Button
                        classname={cls.profileRegistration}
                        onClick={changeStateEnterOrRegister}
                    >
                        Регистрация
                    </Button>
                    <Button
                        classname={cls.profileRegistration}
                        onClick={changeStateAccessNumber}
                    >
                        Подтвердить номер телефона
                    </Button>
                    <Button
                        classname={cls.forgetPassword}
                        onClick={openWindowRecoveryAccess}
                    >
                        Восстановление пароля
                    </Button>
                    {/*<Button*/}
                    {/*    classname={cls.noMessage}*/}
                    {/*    onClick={dontGetMessageActivation}*/}
                    {/*>*/}
                    {/*    Получить код подтверждения повторно*/}
                    {/*</Button>*/}
                </div>
                <div className={cls.button}>
                    <Button
                        classname={cls.btnEnter}
                        type="submit"
                    >
                        Войти
                    </Button>
                </div>
            </div>
            { loadingLogin
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </form>
    );
};

export default LogiIn;