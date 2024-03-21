'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './changePhone.module.scss'
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useActivateTgMutation,
    useCallCodeMutation,
    useCallMutation,
    useChangePhoneMutation, useGetPhoneCodeTgMutation,
    useVerifyTgMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {parseCookies} from "nookies";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import Link from "next/link";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface changePhoneProps {
    classname?: string;
}

export interface Country {
    name: string;
    value: string;
}

const ChangePhone:FC<changePhoneProps> = (props) => {
    const { classname } = props;
    const cookies = parseCookies();
    const dispatch = useAppDispatch();

    //RTK
    const [changeRequestPhone, {
        data: requestChangePhone, error: errorPhone, isError: isErrorPhone,  isLoading: loadingPhone,}] =   useChangePhoneMutation()
    const [reqCallCode, {data:requestCallCode, error:errorrequestCallCode, isError: isErrorCallCode, isLoading: loadingCall}] =  useCallCodeMutation()
    const [reqCall, {data:requestCall, error:errorrequestCall, isError: isErrorCall, isLoading: loadingReqCall}] =  useCallMutation()
    const [reqVerify, {data:requestVerify, error:errorrequestVerify, isError: isErrorVerify, isLoading: loadingVerify,}] = useVerifyTgMutation()
    const [reqActivateTg, {data:requestActivateTg, error:errorrequestActivateTg, isError: isErrorActivateTg, isLoading: loadingActivateTg,}] = useActivateTgMutation();
    const [reqGetCode, {data:requestGetCode, error:errorrequestGetCode, isError: isErrorGetCode, isLoading: loadingGetCode}] =  useGetPhoneCodeTgMutation()



    //ACTIONS FROM REDUX
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    //STATES FROM REDUX
    const {data:infoUser} = useAppSelector(state => state.auth)
    const [inputCode, setInputCode] =  React.useState<string>('')
    const [inputCodeTg, setInputCodeTg] =  React.useState<string>('')
    const [inputPhone, setInputPhone] = React.useState<string>('')
    const [error, setError] = React.useState<boolean>(false);
    const [showBtnNumber, setShowBtnNumber] = React.useState<boolean>(false)

    //USEREF

    //FUNCTIONS

    const sendNewPhone = () => {

        if (infoUser?.forChangePhoneNumber.replace('+','') == inputPhone.replace('+','')) {
            dispatch(addInfoForCommonError({message: 'Вы уже используете этот номер телефона, нажмите на кнопку "Подтвердить телефон"'}))
            if (!showBtnNumber) setShowBtnNumber(true)
            return
        } else if (inputPhone && inputPhone.length > 5 && inputPhone != "Не введен номер телефона") {
            if (inputPhone.replace('+','') == infoUser?.phoneNumber.replace('+','')) {
                dispatch(addInfoForCommonError({message: 'Вы уже используете этот номер телефона'}))
                return
            }
            if (!showBtnNumber) setShowBtnNumber(true)
            changeRequestPhone({
                phoneNumber: inputPhone
            })
        } else {
            const textError = {
                message: 'Не введен номер телефона'
            }
            setInputPhone('Не введен номер телефона');
            dispatch(addInfoForCommonError(textError))
        }
    }
    const addCodeTg = (e:any) => {
        setInputCodeTg(e.target.value);
    }

    const sendCodeVerify = () => {
        if(inputCode.length <= 0) {
            dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
            return
        }
        if (inputCode) {
            reqCallCode({
                actovatedCode: inputCode
            })
        }
    }

    const getAccessCode = () => {
        if(infoUser && infoUser?.phoneNumber) {
            reqGetCode({phoneNumber: infoUser.phoneNumber, phoneToChange: inputPhone} )
        } else {
            dispatch(addInfoForCommonError({message: 'Обновите страницу и попробуйте еще раз'}))
        }
    }

    const activateTgNumber = () => {
        if(inputCodeTg.length <= 0) {
            dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
            return
        }
        if (inputCodeTg && infoUser?.phoneNumber) {
            reqActivateTg({
                phoneNumber: infoUser.phoneNumber,
                phoneToChange: inputPhone,
                number: inputCodeTg
            })
        } else {
            dispatch(addInfoForCommonError({message: 'Обновите страницу и попробуйте еще раз'}))
        }
    }

    React.useEffect(
        () => {
            if( infoUser && infoUser?.phoneNumber) {
                setInputPhone(infoUser.phoneNumber)
            } else {
                setInputPhone(` `)
            }
        }, [infoUser]
    )

    return (
        <>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Телефон</div>
                    {infoUser != null && infoUser != undefined && infoUser && infoUser.isActivatedPhone
                        ? <div className={cls.textVerify}> подтвержден<VerifySvg className={cls.verifySvg}/></div>
                        : <div className={cls.textVerify}>не подтвержден<NotVerifySvg className={cls.notVerifySvg}/></div>
                    }
                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        <PhoneInput
                            className={cls.input}
                            international
                            placeholder="Введите номер телефона"
                            value={inputPhone}
                            defaultCountry="RU"
                            onChange={(e:any) => setInputPhone(e?.target?.value)}
                        />
                    </div>
                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick={sendNewPhone}
                        >
                            Изменить номер</Button>
                    </div>
                </div>
            </div>
            {showBtnNumber &&
            <div className={cls.coverNumBtn}>
                <div className={cls.linkCoverCodes}>
                    <div className={cls.linkCoverCode}>
                        <div className={cls.textTwo}>1. Нажмите на кнопку ниже “Получить код подтверждения“. После чего Официальный бот - @com_check_bot, отправит вам сообщение с кодом на указанный номер.</div>
                        <div className={cls.coverBtn}>
                            <Button
                                classname={cls.btn}
                                onClick={getAccessCode}
                            >
                                Получить код подтверждения
                            </Button>
                        </div>
                        <div className={cls.textTwo}>2. После того как получен код, введите его в поле ниже. </div>
                        <Input
                            classForInput={cls.input}
                            classname={cls.inputRelativeCode}
                            value={ inputCodeTg}
                            placeholder='Введите код'
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addCodeTg(e)}
                        />
                        <div className={cls.textTwo}>3. Теперь можно отправить код для подтверждения номера телефона. </div>
                        <div className={cls.coverBtn}>
                            <Button
                                classname={cls.btn}
                                onClick={activateTgNumber}
                            >
                                Отправить код
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
            }
            { loadingPhone
                && (
                    <Loader
                        classname="color-dark"
                    />
                )
            }
            { loadingVerify
              && (
                  <Loader
                      classname="color-dark"
                  />
              )
            }
            { loadingActivateTg
              && (
                  <Loader
                      classname="color-dark"
                  />
              )
            }
            { loadingCall
              && (
                  <Loader
                      classname="color-dark"
                  />
              )
            }
            { loadingReqCall
              && (
                  <Loader
                      classname="color-dark"
                  />
              )
            }
        </>
    );
};

export default ChangePhone;