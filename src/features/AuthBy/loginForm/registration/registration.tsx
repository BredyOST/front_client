'use client';
import React, {FC} from 'react';
import cls from './registration.module.scss'
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import ShowSvg from "@/assets/svgs/show.svg";
import HideSvg from "@/assets/svgs/hide.svg";
import { Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {useRegisterUserMutation} from "@/app/redux/entities/requestApi/requestApi";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import Loader from "@/ui/Loader/Loader";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import CheckLogin from "@/features/AuthBy/checbox/checkLogin";
import Link from "next/link";
import {Country} from "@/app/components/profilePage/changePhone/changePhone";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import {
    createUserType,
    ForTextForms,
    loginForm,
    passwordHide, textErrors
} from "@/features/helpersAuth/helpersRegistration";
import {TypeForFunc} from "@/shared/types/types";
import {useParams, useRouter} from "next/navigation";


interface RegistrationProps {}

const Registration:FC<RegistrationProps> = React.memo(() => {
    const dispatch = useAppDispatch();

    let [registerIn, {
        data: requestRegister, error: errorRegister, isError: isErrorRegister,  isLoading: loadingRegister,
    }] = useRegisterUserMutation();

    const { changeStateCurrentPopupNumber } = stateAuthWindowSliceActions;
    const {addInfoForCommonError} = indicatorsNotifications

    const [isChecked, setIsChecked] = React.useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
    const [passwordHideButton, setPasswordHideButton] = React.useState<passwordHide>({
        enteredRegisterText: false, enteredRegisterCheckText:false, registerBtnShowOrHide: false, registerBtnCheckShowOrHide: false,
    });
    const [textFromForms, setTextFromForms] = React.useState<ForTextForms>({
        phoneRegister:'', passwordRegister: '', passwordRegisterCheck: '',
    });

    const params = new URLSearchParams(window.location.search);

    const { currentPopupNumber } = useAppSelector((state) => state.statePopup);

    const [comparePassword, setComparePassword] = React.useState<boolean | ' '>(' ');

    const passwordRegisterRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRegisterCheckRef = React.useRef<HTMLInputElement | null>(null);

    const onSubmit: SubmitHandler<loginForm> = (data) => {
        if(data.phoneNumberRegistration.length <= 6) {
            dispatch(addInfoForCommonError(textErrors.messageThird))
            return
        }
        if(!isChecked) dispatch(addInfoForCommonError(textErrors.messageSecond))
        if(!comparePassword) dispatch(addInfoForCommonError(textErrors.message))

        const partnerId = params.get('partnerId');

        if(comparePassword && isChecked) {
            const infoForRegistration:createUserType = {
                phoneNumber:data.phoneNumberRegistration,
                password:data.passwordRegistration,
                passwordCheck:data.passwordRegistrationCheck,
                refId: partnerId ? partnerId : null,
            }
            registerIn(infoForRegistration)
        }
    };

    React.useEffect(() => {
        if (requestRegister?.text ==`Регистрация завершена. Осталось подтвердить номер телефона` ) {
            dispatch(changeStateCurrentPopupNumber(4))
        }
    },[requestRegister])

    const {register, handleSubmit, setError,control, formState: { errors, isValid },} = useForm<loginForm>({
        mode: 'onChange',
    });

    const checkTextFormsRegistration:TypeForFunc<React.ChangeEvent<HTMLFormElement>, void> = (e: React.ChangeEvent<HTMLFormElement>) => {
        if (currentPopupNumber === 1) {
            const targetName:string = e.target.name;
            const value:string = e.target.value;

            if (targetName === 'passwordRegistration' || targetName === 'passwordRegistrationCheck') {
                const isPassword:boolean = targetName === 'passwordRegistration';
                const isPasswordCheck:boolean = targetName === 'passwordRegistrationCheck';
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

            if(targetName === 'phoneNumberRegistration') {
                const hasCountryCode = value.startsWith(selectedCountry?.value || '');
                if(!selectedCountry?.name || selectedCountry == null) {
                    setTextFromForms({...textFromForms, phoneRegister: 'Выберите страну из списка'})
                } else {
                    setTextFromForms({...textFromForms, phoneRegister: hasCountryCode ? value.replace(/[A-Za-zА-Яа-яЁё]/, ''): (selectedCountry?.value.replace(/[A-Za-zА-Яа-яЁё]/, '') || '')})
                }
            }
        }
    };

    React.useEffect(() => {
        if(textFromForms.passwordRegister !== textFromForms.passwordRegisterCheck) {
            setComparePassword(false)
        }
        if(textFromForms.passwordRegister === textFromForms.passwordRegisterCheck) {
            setComparePassword(true)
        }
    },[textFromForms.passwordRegister, textFromForms.passwordRegisterCheck])
    const showAndHideTextPassword:TypeForFunc<void, void> = () => {
        setPasswordHideButton({ ...passwordHideButton, registerBtnShowOrHide: !passwordHideButton.registerBtnShowOrHide });
    };
    const showAndHideTextTwoPassword:TypeForFunc<void, void> = () => {
        setPasswordHideButton({ ...passwordHideButton, registerBtnCheckShowOrHide: !passwordHideButton.registerBtnCheckShowOrHide });
    };
    const backToLoginIn:TypeForFunc<void, void> = () => {
        dispatch(changeStateCurrentPopupNumber(0));
    };
    const handleCheckboxChange:TypeForFunc<boolean, void> = (value) => {
        setIsChecked(value);
    };

    if (currentPopupNumber != 1 ) {
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
                    <div>
                        <div className={cls.text}>1. Выберите страну из выпадающего списка.</div>
                        <div className={cls.text}>2. В поле ввода отобразится флаг страны.</div>
                        <div className={cls.text}>3. Введите номер в международном формате.</div>
                    </div>
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
                            type={passwordHideButton.registerBtnShowOrHide ? 'text' : 'password'}
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
                            <div className={cls.error}>
                                {errors.passwordRegistration && errors.passwordRegistration.type === 'minLength' && <div>{errors.passwordRegistration.message}</div>}
                            </div>
                        </Input>
                        <Input
                            classForInput={cls.input}
                            type={passwordHideButton.registerBtnCheckShowOrHide ? 'text' : 'password'}
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
                                passwordHideButton.enteredRegisterCheckText
                            && (
                                <Button
                                    type="button"
                                    name='textRegistrationPassword'
                                    addNametoFunction={true}
                                    classname={cls.hideButton}
                                    onClick={showAndHideTextTwoPassword}
                                >
                                    {!passwordHideButton.registerBtnCheckShowOrHide ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
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
                    <span>Зарегистрироваться</span>
                </Button>
                <Button
                    classname={cls.back}
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