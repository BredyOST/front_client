import React, {FC} from 'react';
import {Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
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


interface IAccessNumberProps {
    classname?: string;
}

export type accessNumber = {
    phoneNumber:string
    numberActivation:string,
}

const loginText: any = [
    { id: 1, text: 'Звонок' },
    { id: 2, text: 'Телеграмм-бот' },
]


const AccessNumber:FC<IAccessNumberProps>= React.memo((props) => {
    const {} = props;

    const dispatch = useAppDispatch();

    //RTK
    const [reqActivateTg, {data:requestActivateTg, error:errorrequestActivateTg, isError: isErrorActivateTg, isLoading: loadingActivateTg,}] = useActivateTgMutation();
    const [reqCallCode, {data:requestCallCode, error:errorrequestCallCode, isError: isErrorCallCode, isLoading: loadingCall}] =  useCallCodeMutation()
    const [reqCall, {data:requestCall, error:errorrequestCall, isError: isErrorCall, isLoading: loadingReqCall}] =  useCallMutation()

    //ACTIONS FROM REDUX
    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    //USESTATE
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);
    // что выбрано - email или phone при авторизации
    // 1 звонок, 2 телега
    const [activeTab, setActiveTab] = React.useState<number>(1);
    const [inputNumber, setInputNumber] = React.useState<string>('');
    const [activeWindow, setActiveWindow] = React.useState<string>('');

    const onSubmit: SubmitHandler<accessNumber> = (data,e) => {
  
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
                        indicator: `1`
                    })
                }
            }
            //если нажали на кнопку отправки формы
            if(activeWindow == `2`) {
                if(data?.phoneNumber?.length <= 6 || data?.numberActivation?.length <= 0) {
                    dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона и код подтверждения'}))
                    return;
                }
                reqCallCode({
                    phoneNumber: data?.phoneNumber,
                    numberActivation: data?.numberActivation
                })
            }
        }
        // второе окно и нажата кнопка номер 2 - отправка формы с кодом
        if(activeTab == 2 && activeWindow == `2`) {
            if(data?.phoneNumber?.length <= 6 || data?.numberActivation?.length <= 0) {
                dispatch(addInfoForCommonError({message: 'Проверьте обязательные поля, номер телефона и код подтверждения'}))
                return;
            }

            if(data?.numberActivation?.length <= 0 && data?.phoneNumber?.length) {
                dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
                return
            }
            reqActivateTg({
                phoneNumber: data?.phoneNumber,
                numberActivation: data?.numberActivation
            })
        }
    };
    
    const {register, handleSubmit, control, setError, formState: { errors, isValid },} = useForm<accessNumber>({
        mode: 'onChange',
    });

    React.useEffect(() => {
        if (requestActivateTg?.text ==`Телефон успешно подтвержден, можете войти в учетную запись` ) {
            dispatch(changeStateClickOnEnter(0))
        }
        if (requestCallCode?.text ==`Телефон успешно подтвержден, можете войти в учетную запись` ) {
            dispatch(changeStateClickOnEnter(0))
        }

    },[requestActivateTg, requestCallCode, requestCall])

    const backToLoginIn = () => {
        dispatch(changeStateClickOnEnter(0));
    };

    const changeActiveTab = (id: number) => {
        setActiveTab(id)
    }

    const changeInputNumber = (e:any) => {
        setInputNumber(e.target.value)
    }

    const changeClickWindow = (num:string) => {
        setActiveWindow(num)
    }
    
    if (clickOnEnter != 4 ) {
        return null
    }

    return (
        <form
            className={cls.form}
            onSubmit={handleSubmit(onSubmit)}
            onChange={changeInputNumber}
        >
            <h2
                className={cls.title}
            >
                Выберите способ подтверждения номера
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
                            {item.text === 'Телеграмм-бот'&& <EmailSvg className={cls.emailSvg} />}
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
                            classname={cls.btn}
                            type={'submit'}
                            onClick={() => changeClickWindow(`1`)}
                        >Запрос вызова</Button>
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
                    Отправить
                </Button>
                <Button
                    classname={cls.btnEnter}
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