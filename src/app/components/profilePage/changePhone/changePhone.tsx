'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './changePhone.module.scss'
import VerifySvg from "@/assets/svgs/checkmarkc.svg";
import NotVerifySvg from "@/assets/svgs/notVefify.svg";
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {
    useActivateTgProfileMutation,
    useChangePhoneMutation, useGetPhoneCodeTgMutation, useGiveInfoMutation,
    useVerifyTgMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {parseCookies} from "nookies";
import Loader from "@/ui/Loader/Loader";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import 'react-phone-number-input/style.css'

interface changePhoneProps {}

export interface Country {
    name: string;
    value: string;
}

const ChangePhone:FC<changePhoneProps> = (props) => {
    const {  } = props;

    // constants dispatch = useAppDispatch();

    // constants [changeRequestPhone, {
    // data: requestChangePhone, error: errorPhone, isError: isErrorPhone,  isLoading: loadingPhone,}] =   useChangePhoneMutation()
    // constants [reqVerify, {data:requestVerify, error:errorrequestVerify, isError: isErrorVerify, isLoading: loadingVerify,}] = useVerifyTgMutation()
    // constants [reqActivateTg, {data:requestActivateTg, error:errorrequestActivateTg, isError: isErrorActivateTg, isLoading: loadingActivateTg,}] = useActivateTgProfileMutation();
    // constants [reqGetCode, {data:requestGetCode, error:errorrequestGetCode, isError: isErrorGetCode, isLoading: loadingGetCode}] =  useGetPhoneCodeTgMutation()
    // if people has registered before 21.03.2024
    // constants [reqGiveInfo, {data:requestGiveInfo, error:errorrequestGiveInfo, isError: isErrorGiveInfo, isLoading: loadingGiveInfo}] =  useGiveInfoMutation()

    // constants {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    const {data:infoUser} = useAppSelector(state => state.auth)

    // constants [inputCode, setInputCode] =  React.useState<string>('')
    // constants [inputCodeTg, setInputCodeTg] =  React.useState<string>('')
    const [inputPhone, setInputPhone] = React.useState<string>('')
    // constants [error, setError] = React.useState<boolean>(false);
    // constants [showBtnNumber, setShowBtnNumber] = React.useState<boolean>(false)

    // constants sendNewPhone = () => {
    //
    //     if (infoUser?.forChangePhoneNumber?.replace('+','') == inputPhone?.replace('+','')) {
    //         dispatch(addInfoForCommonError({message: 'Номер уже внесен во временное хранилище, нажмите на кнопку "Получить код подтверждения"'}))
    //         if (!showBtnNumber) setShowBtnNumber(true)
    //         return
    //     } else if (inputPhone && inputPhone?.length > 5 && inputPhone != "Не введен номер телефона") {
    //         if (inputPhone?.replace('+','') == infoUser?.phoneNumber.replace('+','')) {
    //             dispatch(addInfoForCommonError({message: 'Вы уже используете этот номер телефона'}))
    //             return
    //         }
    //         if (!showBtnNumber) setShowBtnNumber(true)
    //         changeRequestPhone({
    //             phoneNumber: inputPhone
    //         })
    //     } else {
    //         constants textError = {
    //             message: 'Не введен номер телефона'
    //         }
    //         setInputPhone('Не введен номер телефона');
    //         dispatch(addInfoForCommonError(textError))
    //     }
    // }
    // constants addCodeTg = (e:any) => {
    //     setInputCodeTg(e.target.value);
    // }

    // constants getAccessCode = () => {
    // if(infoUser && infoUser?.phoneNumber) {
    // reqGetCode({phoneNumber: infoUser?.phoneNumber, phoneToChange: inputPhone} )
    // } else {
    //     dispatch(addInfoForCommonError({message: 'Обновите страницу и попробуйте еще раз'}))
    // }
    // }

    // constants activateTgNumber = () => {
    //     if(inputCodeTg.length <= 0) {
    //         dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
    //         return
    //     }
    //     if (inputCodeTg && infoUser?.phoneNumber) {
    //         reqActivateTg({
    //             phoneNumber: infoUser.phoneNumber,
    //             phoneToChange: inputPhone,
    //             number: inputCodeTg
    //         })
    //     } else {
    //         dispatch(addInfoForCommonError({message: 'Обновите страницу и попробуйте еще раз'}))
    //     }
    // }

    React.useEffect(
        () => {
            if( infoUser && infoUser?.phoneNumber) {
                setInputPhone(infoUser.phoneNumber)
            } else {
                setInputPhone(` `)
            }
        }, [infoUser]
    )


    // СТАРЫЙ КОД
    // constants senOldInfo = () => {
    //     reqGiveInfo({
    //         mail: infoUser?.email,
    //         phoneToChange: inputPhone,
    //     })
    // }


    return (
        <>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Телефон</div>
                    {infoUser && infoUser.isActivatedPhone
                        ? <div className={cls.textVerify}> подтвержден<VerifySvg className={cls.verifySvg}/></div>
                        : <div className={cls.textVerify}>не подтвержден<NotVerifySvg className={cls.notVerifySvg}/></div>
                    }
                </div>
                <div className={cls.linkCover}>
                    <div className={cls.inputAdd}>
                        {infoUser?.phoneNumber ? infoUser?.phoneNumber : 'номер отсутствует'}
                        {/*<PhoneInput*/}
                        {/*    className={cls.input}*/}
                        {/*    international*/}
                        {/*    placeholder="Введите номер телефона"*/}
                        {/*    value={inputPhone}*/}
                        {/*    defaultCountry="RU"*/}
                        {/*    // onChange={(e:any) => setInputPhone(e?.target?.value)}*/}
                        {/*    onChange={(value:any) => {*/}
                        {/*        if (value) {*/}
                        {/*            setInputPhone(value.toString());*/}
                        {/*        } else {*/}
                        {/*            setInputPhone(""); // Обработка случая, когда значение undefined*/}
                        {/*        }*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </div>
                    {/*<div className={cls.coverBtn}>*/}
                    {/*    <Button*/}
                    {/*        classname={cls.btn}*/}
                    {/*        onClick={sendNewPhone}*/}
                    {/*    >*/}
                    {/*        Изменить номер*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    {/*</div>*/}
                </div>
                {/*{(showBtnNumber && !infoUser?.userIdTg && !infoUser?.chatIdTg ) &&*/}
                {/*    <div>*/}
                {/*        <div>21/03/2024г. были внесены изменения,поэтому для полноценного пользования сайтом, вам необходимо привязать аккаунт телеграмма.</div>*/}
                {/*        <div>Если вы видите этот текст, то номер который вы указали помещен во временное хранилище</div>*/}
                {/*        <div>Теперь нажмите на кнопку ниже для того чтобы привязать номер</div>*/}
                {/*        <Button*/}
                {/*            classname={cls.btn}*/}
                {/*            onClick={senOldInfo}*/}
                {/*        >отправить данные в тг*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*}*/}
                {/*{(showBtnNumber && infoUser?.userIdTg && infoUser?.chatIdTg) &&*/}
                {/*<div className={cls.coverNumBtn}>*/}
                {/*    <div className={cls.linkCoverCodes}>*/}
                {/*        <div className={cls.linkCoverCode}>*/}
                {/*            <div className={cls.textTwo}>1. После того как вы ввели номер в соответствующее поле выше и нажали кнопку “изменить номер“, номер был помещен во временное хранилище.</div>*/}
                {/*            <div className={cls.textTwo}>2. Нажмите на кнопку ниже “Получить код подтверждения“. После чего Официальный бот - @com_check_bot, отправит вам сообщение с кодом на указанный номер.</div>*/}
                {/*            <div className={cls.coverBtn}>*/}
                {/*                <Button*/}
                {/*                    classname={cls.btn}*/}
                {/*                    onClick={getAccessCode}*/}
                {/*                >*/}
                {/*                    Получить код подтверждения*/}
                {/*                </Button>*/}
                {/*            </div>*/}
                {/*            <div className={cls.textTwo}>3. После того как получен код, введите его в поле ниже. </div>*/}
                {/*            <Input*/}
                {/*                classForInput={cls.input}*/}
                {/*                classname={cls.inputRelativeCode}*/}
                {/*                value={ inputCodeTg}*/}
                {/*                placeholder='Введите код'*/}
                {/*                onChange={(e:ChangeEvent<HTMLInputElement>) => addCodeTg(e)}*/}
                {/*            />*/}
                {/*            <div className={cls.textTwo}>4. Теперь можно отправить код для подтверждения номера телефона. </div>*/}
                {/*            <div className={cls.coverBtn}>*/}
                {/*                <Button*/}
                {/*                    classname={cls.btn}*/}
                {/*                    onClick={activateTgNumber}*/}
                {/*                >*/}
                {/*                    Отправить код*/}
                {/*                </Button>*/}
                {/*            </div>*/}

            </div>
            {/*    </div>*/}
            {/*</div>*/}
            {/*}*/}
            {/*{ loadingPhone*/}
            {/*    && (*/}
            {/*        <Loader*/}
            {/*            classname="color-dark"*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}
            {/*{ loadingVerify*/}
            {/*  && (*/}
            {/*      <Loader*/}
            {/*          classname="color-dark"*/}
            {/*      />*/}
            {/*  )*/}
            {/*}*/}
            {/*{ loadingActivateTg*/}
            {/*  && (*/}
            {/*      <Loader*/}
            {/*          classname="color-dark"*/}
            {/*      />*/}
            {/*  )*/}
            {/*}*/}
            {/*{ loadingGetCode*/}
            {/*    && (*/}
            {/*        <Loader*/}
            {/*            classname="color-dark"*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}
        </>
    );
};

export default ChangePhone;