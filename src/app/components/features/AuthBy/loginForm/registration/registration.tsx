'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './registration.module.scss'
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import ShowSvg from "@/app/components/svgs/show.svg";
import HideSvg from "@/app/components/svgs/hide.svg";
import {Control, Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {useRegisterUserMutation} from "@/app/redux/entities/requestApi/requestApi";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import CheckLogin from "@/app/components/features/AuthBy/checbox/checkLogin";
import Link from "next/link";
import {Country} from "@/app/dashboard/profile/changePhone/changePhone";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


interface RegistrationProps {
    classname?: string;
}

type loginForm = {
    phoneNumberRegistration: string,
    // mailOrNumberRegistration: string,
    passwordRegistration: string,
    passwordRegistrationCheck:string,
}

interface ForTextForms {
    phoneRegister:string,
    // loginRegister: string,
    passwordRegister: string,
    passwordRegisterCheck:string
}

interface passwordHide {
    register: boolean,
    registerCheck:boolean,
    registerShowHide: boolean,
    registerCheckShowHide:boolean
}

type createUserType = {
    phoneNumber:string
    // email: string
    password: string
    passwordCheck: string
}

const Registration:FC<RegistrationProps> = React.memo((props) => {
    const {
        classname,
    } = props;
    const dispatch = useAppDispatch();

    //RTK
    // Запрос на регистрацию пользователя
    let [registerIn, {
        data: requestRegister, error: errorRegister, isError: isErrorRegister,  isLoading: loadingRegister,
    }] = useRegisterUserMutation();

    //ACTIONS FROM REDUX
    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    const { closeAllPopups } = statePopupSliceActions;
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;
    const { changeStateLoginFormPopup } = statePopupSliceActions;
    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
    //STATES FROM REDUX
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);

    //USESTATE
    // для отображения введенных символов в инпуте пароля, login и registration, registerCheck - false значит ничего в поля не введено, loginShowHide, registerShowHide: false - значит пароль скрыт
    const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHide>({
        register: false, registerCheck:false, registerShowHide: false, registerCheckShowHide: false,
    });
    // для того чтобы делать проверки после введенного логина в графы. Делаем управляемые импуты
    const [textFromForms, setTextFromForms] = React.useState<ForTextForms>({
        phoneRegister:'', passwordRegister: '', passwordRegisterCheck: '',
    });
    //проверка соответствия паролей в инпутах
    const [comparePassword, serComparePassword] = React.useState<boolean | ' '>(' ');
    //USEREF
    // для получения элемента input при входе (ввод номера)
    const phoneRegisterRef = React.useRef<HTMLInputElement | null>(null);
    // для получения элемента input при регистрации (ввод пароля)
    const passwordRegisterRef = React.useRef<HTMLInputElement | null>(null);
    // для получения элемента input при регистрации (ввод пароля)
    const passwordRegisterCheckRef = React.useRef<HTMLInputElement | null>(null);
    //FUNCTIONS
    const onSubmit: SubmitHandler<loginForm> = (data) => {

        const textError = {
            message: 'Не совпадают введенные пароли'
        }
        const textErrorTwo = {
            message: 'Не приняты условия политики конфиденциальности'
        }
        const textErrorThree= {
            message: 'Введен некорректный номер телефона'
        }

        if(data.phoneNumberRegistration.length <= 6) {
            dispatch(addInfoForCommonError(textErrorThree))
            return
        }
        if(!isChecked) dispatch(addInfoForCommonError(textErrorTwo))
        if(!comparePassword) dispatch(addInfoForCommonError(textError))
        // отправляем данные на регистрацию пользователя и создаем объект для передачи
        if(comparePassword && isChecked) {
            const infoForRegistration:createUserType = {
                phoneNumber:data.phoneNumberRegistration,
                // email:data.mailOrNumberRegistration,
                password:data.passwordRegistration,
                passwordCheck:data.passwordRegistrationCheck,
            }
            registerIn(infoForRegistration)
        }
    };


    React.useEffect(() => {
        if (requestRegister?.text ==`Регистрация завершена. Подтвердите номер в мессенджере телеграмм` ) {
            // dispatch(changeStateLoginFormPopup(false));
            dispatch(changeStateClickOnEnter(4))
            // redirect('/dashboard/price')
            // dispatch(closeAllPopups(true));
        }
    },[requestRegister])


    //  для отправки запроса с form и регистрации полей инпута, для валидации регистрации. когда поля пустые выдает предупреждение
    const {register, handleSubmit, setError,control, formState: { errors, isValid },} = useForm<loginForm>({
        mode: 'onChange',
    });

    // для изменения индикатора который меняет type у input на text или password. Показать или скрыть пароль при вводе
    const showAndHideTextPassword = (name:any) => {
        setPasswordHideButton({ ...passwordHideButton, registerShowHide: !passwordHideButton.registerShowHide });
    };
    const showAndHideTextTwoPassword = (name:any) => {
        setPasswordHideButton({ ...passwordHideButton, registerCheckShowHide: !passwordHideButton.registerCheckShowHide });
    };

    // при регистрации
    const checkTextFormsRegistration = (e: any) => {
        if (clickOnEnter === 1) {
            const targetName = e.target.name;
            const value = e.target.value;

            if (targetName === 'passwordRegistration' || targetName === 'passwordRegistrationCheck') {
                const isPassword = targetName === 'passwordRegistration';
                const isPasswordCheck = targetName === 'passwordRegistrationCheck';
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
            // if(targetName === 'mailOrNumberRegistration') {
            //     setTextFromForms({ ...textFromForms, loginRegister: value });
            // }

            if(targetName === 'phoneNumberRegistration') {

                const hasCountryCode = value.startsWith(selectedCountry?.value || '');
                if(!selectedCountry?.name || selectedCountry == null) {
                    setTextFromForms({...textFromForms, phoneRegister: 'Выберите страну из списка'})
                } else {
                    setTextFromForms({...textFromForms, phoneRegister: hasCountryCode ? value.replace(/[A-Za-zА-Яа-яЁё]/, ''): (selectedCountry?.value.replace(/[A-Za-zА-Яа-яЁё]/, '') || '')})
                }
            }
            console.log(targetName)
        }
    };

    // провека введенных паролей в инпуты на соответствие
    React.useEffect(() => {
        if(textFromForms.passwordRegister !== textFromForms.passwordRegisterCheck) {
            serComparePassword(false)
        }
        if(textFromForms.passwordRegister === textFromForms.passwordRegisterCheck) {
            serComparePassword(true)
        }
    },[textFromForms.passwordRegister, textFromForms.passwordRegisterCheck])

    // возвращаемся на ввод логина и пароля
    const backToLoginIn = () => {
        dispatch(changeStateClickOnEnter(0));
    };

    const handleCheckboxChange = (value:any) => {
        setIsChecked(value);
    };

    if (clickOnEnter != 1 ) {
        return null
    }

    return (
        <form
            className={cls.form}
            onSubmit={handleSubmit(onSubmit)}
            onChange={checkTextFormsRegistration}
        >
            <h2
                className={cls.title}
            >
                Регистрация учетной записи
            </h2>
            <div className={cls.inputsForm}>
                <div className={cls.inputsForm}>
                    <div className={cls.coverBtn}>
                        <Controller
                            name="phoneNumberRegistration"
                            control={control}
                            defaultValue=""
                            render={({ field }: { field: any}) => (
                                <PhoneInput
                                    className={cls.input}
                                    international
                                    placeholder="Введите номер телефона"
                                    value={textFromForms.phoneRegister}
                                    defaultCountry="RU"
                                    inputStyle={{ width: '100%' }} // Настройте стили ввода
                                    register={{
                                        ...register('phoneNumberRegistration', {}),
                                    }}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={cls.coverPassword}>
                        <Input
                            classForInput={cls.input}
                            type={passwordHideButton.registerShowHide ? 'text' : 'password'}
                            placeholder="Введите пароль"
                            classname={cls.inputRelative}
                            defaultValue={textFromForms.passwordRegister}
                            disabled={loadingRegister && true}
                            forRef={passwordRegisterRef}
                            register={{
                                ...register('passwordRegistration', {
                                    required: 'Пароль должен содержать от 5 до 20 символов',
                                    minLength: {
                                        value: 5,
                                        message: 'Пароль должен содержать не менее 5 символов',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Пароль должен содержать не более 20 символов',
                                    },
                                }),
                            }}
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
                            <div className={cls.error}>
                                {errors.passwordRegistration && errors.passwordRegistration.type === 'minLength' && <div>{errors.passwordRegistration.message}</div>}
                            </div>
                        </Input>
                        <Input
                            classForInput={cls.input}
                            type={passwordHideButton.registerCheckShowHide ? 'text' : 'password'}
                            placeholder="Повторите пароль"
                            classname={cls.inputRelative}
                            defaultValue={textFromForms.passwordRegisterCheck}
                            disabled={loadingRegister && true}
                            forRef={passwordRegisterCheckRef}
                            register={{
                                ...register('passwordRegistrationCheck'),
                            }}
                        >
                            {
                                passwordHideButton.registerCheck
                            && (
                                <Button
                                    type="button"
                                    name='textRegistrationPassword'
                                    addNametoFunction={true}
                                    classname={cls.hideButton}
                                    onClick={showAndHideTextTwoPassword}
                                >
                                    {!passwordHideButton.registerCheckShowHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                </Button>
                            )
                            }
                            <div className={cls.error}>
                                {comparePassword === false && <div>Пароли не совпадают</div>}
                            </div>
                        </Input>
                    </div>
                    <div className={cls.checkCover}>
                        <CheckLogin
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <div className={cls.textInside}>
                            я соглашаюсь с <Link className={cls.linkAcess} href={'/dashboard/politics'} target={'_blank'}>политикой конфидициальности</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.btnCoverTwo}>
                <Button
                    classname={cls.btnEnter}
                    type="submit"
                >
                    Зарегистрироваться
                </Button>
                <Button
                    classname={cls.btnEnter}
                    onClick={backToLoginIn}
                    type="button"
                >
                    Вернуться
                </Button>
            </div>
            {loadingRegister
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </form>
    )
});

export default Registration;