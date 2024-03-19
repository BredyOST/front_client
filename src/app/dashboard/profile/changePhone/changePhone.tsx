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
    useChangePhoneMutation,
    useVerifyTgMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {parseCookies} from "nookies";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import SelectCountry from "@/app/dashboard/profile/selectCountry/selectCountry";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import { AppLink } from "@/app/components/shared/ui/appLink/appLink";
import Link from "next/link";
import {userInfo} from "os";

interface changePhoneProps {
    classname?: string;
}

const countries:Country[] = [
    {name:'Russia(Россия)', value: `+7`},
    {name:'Ukraine(Украина)', value: `+380`},
    {name:'Belarus (Беларусь)', value: `+375`},
    {name:'Armenia (Հայաստան)', value: `+374`},
    {name:'Azerbaijan (Azərbaycan)', value: `+994`},
    {name:'Bulgaria (България)', value: `+359`},
    {name:'Czech Republic (Česká republika)', value: `+420`},
    {name:'Estonia (Eesti)', value: `+372`},
    {name:'Georgia (საქართველო)', value: `+995`},
    {name:'Germany (Deutschland)', value: `+49`},
    {name:'Israel (‫ישראל‬‎)', value: `+972`},
    {name:'Kazakhstan (Казахстан)', value: `+7`},
    {name:'Kyrgyzstan (Кыргызстан)', value: `+996`},
    {name:'Latvia (Latvija)', value: `+371`},
    {name:'Lithuania (Lietuva)', value: `+370`},
    {name:'Moldova (Republica Moldova)', value: `+373`},
    {name:'Poland (Polska)', value: `+48`},
    {name:'Uzbekistan (Oʻzbekiston)', value: `+998`},
    {name:'Tajikistan', value: `+992`},
    {name:'Romania (România)', value: `+40`},
]

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
        data: requestChangePhone, error: errorPhone, isError: isErrorPhone,  isLoading: loadingPhone,
    }] =   useChangePhoneMutation()
    const [reqCallCode, {data:requestCallCode, error:errorrequestCallCode, isError: isErrorCallCode, isLoading: loadingCall}] =  useCallCodeMutation()
    const [reqCall, {data:requestCall, error:errorrequestCall, isError: isErrorCall, isLoading: loadingReqCall}] =  useCallMutation()
    const [reqVerify, {data:requestVerify, error:errorrequestVerify, isError: isErrorVerify, isLoading: loadingVerify,}] = useVerifyTgMutation()
    const [reqActivateTg, {data:requestActivateTg, error:errorrequestActivateTg, isError: isErrorActivateTg, isLoading: loadingActivateTg,}] = useActivateTgMutation();

    //ACTIONS FROM REDUX
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    //STATES FROM REDUX
    const {data:infoUser} = useAppSelector(state => state.auth)
    const [codeVerify, setCodeVerify] = React.useState<boolean>(false); // отследить когда сделан запрос и отобразить
    const [codeVerifyTg, setCodeVerifyTg] = React.useState<boolean>(false); // отследить когда сделан запрос и отобразить
    const [inputCode, setInputCode] =  React.useState<string>('')
    const [inputCodeTg, setInputCodeTg] =  React.useState<string>('')
    const [inputPhone, setInputPhone] = React.useState<string>('')
    const [selectedCountry, setSelectedCountry] = React.useState<Country | null>(null);
    const [error, setError] = React.useState<boolean>(false);
    const [showBtnNumber, setShowBtnNumber] = React.useState<boolean>(false)

    //USEREF

    //FUNCTIONS

    const countryOptions: Country[] = countries.map((country) => ({
        name: country.name,
        value: country.value, // Используйте нужное значение для значения
    }));
    const addPhone = (e: any) => {
        const input = e.target.value;
        const hasCountryCode = input.startsWith(selectedCountry?.value || '');
        if (e.target.value.length) {
            setError(false)
        }
        if(!selectedCountry?.name || selectedCountry == null) {
            setInputPhone('Выберите страну из списка');
        } else {
            setInputPhone(hasCountryCode ? input.replace(/[A-Za-zА-Яа-яЁё]/, ''): (selectedCountry?.value.replace(/[A-Za-zА-Яа-яЁё]/, '') || ''));
        }
    };
    const sendNewPhone = () => {
        if (inputPhone && inputPhone.length > 6 && inputPhone != "Не введен номер телефона") {
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

    const checkPhone = () => {
        if (inputPhone.length <= 0) {
            dispatch(addInfoForCommonError({message: 'Не введен номер телефона'}))
        }
        if (inputPhone && inputPhone.length > 6 && inputPhone != "Не введен номер телефона") {
            reqCall({
                phone: inputPhone
            })
        } else {
            setError(true)
            setCodeVerify(true)
        }
    }

    const addCode = (e:any) => {
        setInputCode(e.target.value);
    }
    const addCodeTg = (e:any) => {
        setInputCodeTg(e.target.value);
    }

    // отправояем изменения
    const showInputCode = () => {
        setCodeVerify(prevState => !prevState)
    }
    const showInputCodeTg = () => {
        setCodeVerifyTg(prevState => !prevState)
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

    const activateTgNumber = () => {
        if(inputCodeTg.length <= 0) {
            dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
            return
        }
        if (inputCodeTg) {
            reqActivateTg({
                number: inputCodeTg
            })
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
                    <Input
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        placeholder={selectedCountry?.value}
                        value={ inputPhone}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e:ChangeEvent<HTMLInputElement>) => addPhone(e)}
                    />
                    <div className={cls.coverBtn}>
                        <SelectCountry
                            setSelectedCountry={setSelectedCountry}
                            options={countryOptions}
                            setInputPhone={setInputPhone}
                        />
                        <Button
                            classname={cls.btn}
                            onClick={sendNewPhone}
                        >
                            Изменить номер</Button>
                    </div>
                    {error && <div className={cls.error}>введите номер телефона</div>}
                </div>
            </div>
            {showBtnNumber &&
            <div className={cls.coverNumBtn}>
                <Button
                    classname={cls.btn}
                    onClick = {showInputCode}
                >
                    {!codeVerify ? `Подтвердить телефон` : `Скрыть поле` }
                </Button>
                {codeVerify &&
                <div className={cls.linkCoverCode}>
                    <Input
                        classForInput={cls.input}
                        classname={cls.inputRelativeCode}
                        value={ inputCode}
                        placeholder='Введите 4 последние цифры номера'
                        onChange={(e:ChangeEvent<HTMLInputElement>) => addCode(e)}
                    />
                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick = {checkPhone}
                        >
                            Запрос вызова
                        </Button>
                    </div>
                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick={sendCodeVerify}
                        >
                            Отправить код
                        </Button>
                    </div>
                </div>
                }
            </div>
            }
            {showBtnNumber &&
            <div className={cls.coverNumBtn}>
                <Button
                    classname={cls.btn}
                    onClick = {showInputCodeTg}
                >
                    {!codeVerifyTg ? `Подтвердить телефон в телеграмме` : `Скрыть поле` }
                </Button>
                {codeVerifyTg &&
                <div className={cls.linkCoverCodes}>
                    <div className={cls.linkCoverCode}>
                        <Input
                            classForInput={cls.input}
                            classname={cls.inputRelativeCode}
                            value={ inputCodeTg}
                            placeholder='Введите код'
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addCodeTg(e)}
                        />
                        <div className={cls.coverBtn}>
                            <Link
                                href={'https://t.me/com_check_bot'}
                                className={cls.btn}
                                target="_blank" rel="noopener noreferrer"
                            >
                                Перейти в тг
                            </Link>
                        </div>
                        <div className={cls.coverBtn}>
                            <Button
                                classname={cls.btn}
                                onClick={activateTgNumber}
                            >
                                Отправить код
                            </Button>
                        </div>
                    </div>
                </div>}
                <div className={cls.textTwo}>В чате бота нажмите кнопку передать контакт</div>
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