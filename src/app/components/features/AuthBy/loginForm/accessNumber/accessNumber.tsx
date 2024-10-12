import React from 'react';
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import cls from './accessNumber.module.scss'
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import Link from "next/link";
import {useActivateTgMutation, useCallCodeMutation, useCallMutation} from "@/app/redux/entities/requestApi/requestApi";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import PhoneInput from "react-phone-number-input";
import PhoneSvg from "@/app/components/svgs/phone.svg";
import EmailSvg from "@/app/components/svgs/email.svg";
import {accessNumber, loginTextAccess} from "@/app/components/features/helpersAuth/helpersAccess";
import {
    ActiveTabIdType,
    ActiveWindowType,
    ObjForReqCallType,
    ReqCallCodeType,
    TypeForFunc
} from "@/app/types/types";
import {IndicatorsLogInAction} from "@/app/redux/entities/indicatorsLogInWindow/indicatorsLogInSlice";

const AccessNumber = React.memo(() => {

    const dispatch = useAppDispatch();

    const [reqActivateTg, {data:requestActivateTg, error:errorrequestActivateTg, isError: isErrorActivateTg, isLoading: loadingActivateTg,}] = useActivateTgMutation();
    const [reqCallCode, {data:requestCallCode, error:errorrequestCallCode, isError: isErrorCallCode, isLoading: loadingCall}] =  useCallCodeMutation()
    const [reqCall, {data:requestCall, error:errorrequestCall, isError: isErrorCall, isLoading: loadingReqCall}] =  useCallMutation()

    const { changeStateCurrentPopupNumber } = stateAuthWindowSliceActions;
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    const { currentPopupNumber } = useAppSelector((state) => state.statePopup);

    const [activeTab, setActiveTab] = React.useState<ActiveTabIdType>(1);
    const {activeWindow} = useAppSelector(state => state.IndicatorsLogIn)
    const {changeActiveWindow} = IndicatorsLogInAction

    const onSubmit: SubmitHandler<accessNumber> = (data,e) => {
        /**
         * activeTab == 1 && activeWindow == 1 - запрос вызова
         * activeTab == 1 && activeWindow == 2 - отправка формы активации
         * activeTab == 2 && activeWindow == `2` - отправка кода в тг
         **/
        if(activeTab == 1) {
            if(activeWindow == `1`) {
                if(data?.phoneNumber?.length <= 6) {
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
            if(activeWindow == `2`) {
                if(data?.phoneNumber?.length <= 6 || data?.numberActivation?.length <= 0) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона и код подтверждения'}))
                    return;
                }
                const objForReqCode: ReqCallCodeType = {
                    phoneNumber: data?.phoneNumber,
                    numberActivation: data?.numberActivation
                }
                reqCallCode(objForReqCode)
            }
        }
        if(activeTab == 2 && activeWindow == `2`) {
            if(data?.phoneNumber?.length <= 6 || data?.numberActivation?.length <= 0) {
                dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона и код подтверждения'}))
                return;
            }
            if(data?.numberActivation?.length <= 0 && data?.phoneNumber?.length) {
                dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
                return
            }
            let objForReqCode:ReqCallCodeType = {
                phoneNumber: data?.phoneNumber,
                numberActivation: data?.numberActivation
            }
            reqActivateTg(objForReqCode)
        }
    };
    
    const {register, handleSubmit, control, setError, formState: { errors, isValid },} = useForm<accessNumber>({
        mode: 'onChange',
    });

    React.useEffect(() => {
        if (requestActivateTg?.text ==`Телефон успешно подтвержден, можете войти в учетную запись` ) {
            dispatch(changeStateCurrentPopupNumber(0))
        }
        if (requestCallCode?.text ==`Телефон успешно подтвержден, можете войти в учетную запись` ) {
            dispatch(changeStateCurrentPopupNumber(0))
        }
    },[requestActivateTg, requestCallCode, requestCall])

    const backToLoginIn:TypeForFunc<void, void> = () => {
        dispatch(changeStateCurrentPopupNumber(0));
    };

    const changeActiveTab:TypeForFunc<ActiveTabIdType, void> = (id: ActiveTabIdType) => {
        setActiveTab(id)
    }
    const changeClickWindow:TypeForFunc<ActiveWindowType, void> = (num) => {
        dispatch(changeActiveWindow(num))
    }
    
    if (currentPopupNumber != 4 ) {
        return null
    }

    return (
        <form
            className={cls.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2
                className={cls.title}
            >
                Выберите способ подтверждения номера
            </h2>
            <div className={cls.coverBtn}>
                <div className={cls.coverPhoneAndMail}>
                    {loginTextAccess && loginTextAccess.map((item: any) => (
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
                {activeTab == 1 &&
                <div className={cls.text}>
                    Подтверждение номера телефона звонком доступно для России, Казахстана, Беларуси, Украины.
                </div>
                }
                {activeTab == 2 &&
                    <div className={cls.textCover}>
                        <ul className={cls.text}>
                            <li>Официальный бот, ссылка на него - <Link className={cls.linkBot} target='_blank' href={`https://t.me/com_check_bot`}>@com_check_bot.</Link>  </li>
                            <li><span>Важно:</span> заходить в чат с ботом с того номера который вы указали при регистрации.</li>
                            <li>В чате бота, нажмите на кнопку ”Start” или напишите боту /start и бот ответным сообщением направит все необходимые инструкции о дальнеших действиях.</li>
                        </ul>
                    </div>
                }
            </div>

            <div className={cls.inputsForm}>
                <div className={cls.coverInp}>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        render={({ field }: { field: any}) => (
                            <PhoneInput
                                className={cls.input}
                                international
                                placeholder="Введите номер телефона"
                                value=""
                                defaultCountry="RU"
                                countries={['RU', 'KZ', 'BY', 'UA']}
                                register={{
                                    ...register('phoneNumber', {}),
                                }}
                                {...field}
                            />
                        )
                        }
                    />
                </div>
                {activeTab == 1 &&
                <>
                    <div className={cls.coverCallBtn}>
                        <Button
                            classname={cls.btnGet}
                            type={'submit'}
                            onClick={() => changeClickWindow(`1`)}
                        >Запрос вызова
                        </Button>
                    </div>
                    <div className={cls.textCover}>
                        <ul className={cls.text}>
                            <li>Вам поступит звонок, отвечать не нужно.</li>
                            <li>В поле ниже введите 4 последние цифры номера.</li>
                        </ul>
                    </div>
                </>
                }
                <Input
                    type="text"
                    classForInput={cls.input}
                    placeholder={ activeTab == 1 ? "Последние 4 цифры номера" : "Введите код"}
                    classname={cls.inputRelative}
                    autofocus
                    defaultValue=""
                    register={{...(register('numberActivation'))}}/>
            </div>
            <div className={cls.btnCoverTwo}>
                <Button
                    classname={cls.btnEnter}
                    type={'submit'}
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
            { loadingActivateTg
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
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
        </form>
    );
});

export default AccessNumber;