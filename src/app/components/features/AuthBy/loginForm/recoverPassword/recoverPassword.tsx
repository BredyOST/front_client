'use client';
import React, {FC} from 'react';
import cls from './recoverPassword.module.scss'
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {Control, Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {
    useCallMutation,
    useChangePasswordMutation,
    useNumberTgForgetPasswordMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import PhoneInput from "react-phone-number-input";
import PhoneSvg from "@/app/components/svgs/phone.svg";
import EmailSvg from "@/app/components/svgs/email.svg";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import ShowSvg from "@/app/components/svgs/show.svg";
import HideSvg from "@/app/components/svgs/hide.svg";

interface recoverPasswordProps {
    classname?: string;
}

type loginForm = {
    phoneNumber:string,
    myEmail:string,
    password:string,
    passwordTwo:string,
    code:string,
}

interface passwordHide {
    register: boolean,
    registerCheck:boolean,
    registerShowHide: boolean,
    registerCheckShowHide:boolean
}


interface ForTextForms {
    passwordRegister: string,
    passwordRegisterCheck:string
}

const loginText: any = [
    { id: 1, text: 'Звонок' },
    { id: 2, text: 'Телеграмм' },
]

export const RecoverPassword:FC<recoverPasswordProps> = (props) => {
    const {
        classname,
    } = props;
    const dispatch = useAppDispatch();

    //RTK
    // восстановление пароля
    let[sendNewPassword, {data:messageNewPassword, error:errorNewPassword, isError: isNewPassword, isLoading: loadingNewPassword}] = useChangePasswordMutation();
    const [reqCall, {data:requestCall, error:errorrequestCall, isError: isErrorCall, isLoading: loadingReqCall}] =  useCallMutation()
    const [reqTgForgetPassword, {data:requestTgForgetPassword, error:errorrequestTgForgetPassword, isError: isErrorTgForgetPassword, isLoading: loadingReqTgForgetPassword}] =  useNumberTgForgetPasswordMutation()

    //ACTIONS FROM REDUX
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    //STATES FROM REDUX

    // для отображения введенных символов в инпуте пароля, login и registration, registerCheck - false значит ничего в поля не введено, loginShowHide, registerShowHide: false - значит пароль скрыт
    const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHide>({
        register: false, registerCheck:false, registerShowHide: false, registerCheckShowHide: false,
    });
    //USESTATE
    // что выбрано - email или phone при авторизации
    const [activeTab, setActiveTab] = React.useState<number>(1);
    // 1 это запрос вызова, 2 - это отправка
    const [activeWindow, setActiveWindow] = React.useState<string>('');
    // для того чтобы делать проверки после введенного логина в графы. Делаем управляемые импуты
    const [textFromForms, setTextFromForms] = React.useState<ForTextForms>({
        passwordRegister: '', passwordRegisterCheck: '',
    });
    //USEREF
    // для получения элемента input при первый
    const passwordRegisterRef = React.useRef<HTMLInputElement | null>(null);
    // для получения элемента input второй
    const passwordRegisterCheckRef = React.useRef<HTMLInputElement | null>(null);


    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);
    // для отображения введенных символов в инпуте пароля, login и registration, registerCheck - false значит ничего в поля не введено, loginShowHide, registerShowHide: false - значит пароль скрыт

    //USEREF
    
    //FUNCTIONS

    const onSubmit: SubmitHandler<loginForm> = (data) => {

        // если выбран звонок
        if(activeTab == 1) {
            //если нажали на кнопку запроса вызова
            if(activeWindow == `1`) {
                if(data?.phoneNumber?.length <= 6) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательное поле, номер телефона'}))
                    return;
                } else if (data?.phoneNumber?.length > 7) {
                    reqCall({
                        phone: data?.phoneNumber,
                        indicator: `2`
                    })
                }
            }

            if(activeWindow == `2`) {
                if(data?.phoneNumber?.length <= 6 || data?.password.length <= 0 || data?.passwordTwo.length <= 0 || data?.code.length <= 0) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона, пароли и код подтверждения'}))
                    return;
                } else  {
                    //восстановление пароля
                    sendNewPassword({
                        email:data?.myEmail,
                        phoneNumber: data?.phoneNumber,
                        password: data?.password,
                        passwordTwo: data?.passwordTwo,
                        code:data?.code,
                        indicator: `2`
                    })
                }
            }
        }

        // если выбран телеграмм
        if(activeTab == 2) {
            //если нажали на кнопку запроса вызова
            if(activeWindow == `1`) {
                if(data?.phoneNumber?.length <= 6) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательное поле, номер телефона'}))
                    return;
                } else {
                    reqTgForgetPassword({
                        phoneNumber: data?.phoneNumber,
                        indicator: `1`
                    })
                }
            }

            if (activeWindow == `2`) {
                if(data?.phoneNumber?.length <= 6 || data?.password.length <= 0 || data?.passwordTwo.length <= 0 || data?.code.length <= 0) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона, пароли и код подтверждения'}))
                    return;
                } else  {
                    //восстановление пароля
                    sendNewPassword({
                        phoneNumber: data?.phoneNumber,
                        password: data?.password,
                        passwordTwo: data?.passwordTwo,
                        code:data?.code,
                        indicator: `1`
                    })
                }
            }

        }
    };
    //  для отправки запроса с form и регистрации полей инпута, для валидации регистрации. когда поля пустые выдает предупреждение
    const {register, handleSubmit, control, setError, formState: { errors, isValid },} = useForm<loginForm>({
        mode: 'onChange',
    });

    // возвращаемся на ввод логина и пароля
    const backToLoginIn = () => {
        dispatch(changeStateClickOnEnter(0));
    };

    React.useEffect(() => {
        if (messageNewPassword?.text ==`Пароль успешно изменен` || messageNewPassword?.text ==`Ожидайте сообщения от официального бота, в течении нескольких минут вам будет направлено сообщение с новым паролем` ) {
            dispatch(changeStateClickOnEnter(0))
        }
    },[messageNewPassword])

    // для изменения индикатора который меняет type у input на text или password. Показать или скрыть пароль при вводе

    // для изменения индикатора который меняет type у input на text или password. Показать или скрыть пароль при вводе
    const showAndHideTextPassword = (name:any) => {
        setPasswordHideButton({ ...passwordHideButton, registerShowHide: !passwordHideButton.registerShowHide });
    };
    const showAndHideTextTwoPassword = (name:any) => {
        setPasswordHideButton({ ...passwordHideButton, registerCheckShowHide: !passwordHideButton.registerCheckShowHide });
    };
    const changeActiveTab = (id: number) => {
        setActiveTab(id)
    }
    const changeClickWindow = (num:string) => {
        setActiveWindow(num)
    }


    // для отображения кнопки показать/скрыть пароль в окне входа в учетную запись
    const checkTextFormsLogin = (e: any) => {
        const targetName = e.target.name;
        const value = e.target.value;

        if (targetName === 'password' || targetName === 'passwordTwo') {
            const isPassword = targetName === 'password';
            const isPasswordCheck = targetName === 'passwordTwo';
            if (isPassword) {
                setTextFromForms({ ...textFromForms, passwordRegister: value });
                value.length
                    ?  setPasswordHideButton({ ...passwordHideButton, register: true })
                    :  setPasswordHideButton({ ...passwordHideButton, register: false });
            }

            if(isPasswordCheck) {
                setTextFromForms({ ...textFromForms, passwordRegisterCheck: value });
                value.length
                    ? setPasswordHideButton({ ...passwordHideButton, registerCheck: true })
                    : setPasswordHideButton({ ...passwordHideButton, registerCheck: false });
            }
        }
    };



    if (clickOnEnter != 2 ) {
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
                    {loginText && loginText.map((item: any) => (
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
                {/*<h3 className={cls.text}>или email адрес</h3>*/}
                {/*<Input*/}
                {/*    type="text"*/}
                {/*    classForInput={cls.input}*/}
                {/*    placeholder="Введите Email"*/}
                {/*    classname={cls.inputRelative}*/}
                {/*    autofocus*/}
                {/*    defaultValue=""*/}
                {/*    register={{ ...(register('myEmail')) }}*/}
                {/*/>*/}

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
                        type={passwordHideButton.registerShowHide ? 'text' : 'password'}
                        classname={cls.inputRelative}
                        forRef={passwordRegisterRef}
                        autofocus
                        defaultValue={textFromForms.passwordRegister}
                        register={{ ...(register('password')) }}
                    >
                        {
                            passwordHideButton.register
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        name='textRegistrationPasswordMain'
                                        addNametoFunction={true}
                                        onClick={showAndHideTextPassword}
                                    >
                                        {!passwordHideButton.registerShowHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                    </Button>
                                )
                        }
                    </Input>
                    <Input
                        classForInput={cls.input}
                        placeholder="Повторите новый пароль"
                        type={passwordHideButton.registerCheckShowHide ? 'text' : 'password'}
                        classname={cls.inputRelative}
                        forRef={passwordRegisterCheckRef}
                        autofocus
                        defaultValue={textFromForms.passwordRegisterCheck}
                        register={{ ...(register('passwordTwo')) }}
                    >
                        {
                            passwordHideButton.registerCheck
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        name='textRegistrationPasswordMain'
                                        addNametoFunction={true}
                                        onClick={showAndHideTextTwoPassword}
                                    >
                                        {!passwordHideButton.registerCheckShowHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
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