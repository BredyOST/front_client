import React, {FC} from 'react';
import {Control, Controller, FieldValues, SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {stateAuthWindowSliceActions} from "@/app/redux/entities/stateAuthWindowSlice/stateAuthWindowSlice";
import cls from './accessNumber.module.scss'
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import Link from "next/link";
import {useActivateTgMutation} from "@/app/redux/entities/requestApi/requestApi";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import SelectRegister from "@/app/components/features/AuthBy/loginForm/selectRegister/selectRegister";
import PhoneInput from "react-phone-number-input";


interface IAccessNumberProps {
    classname?: string;
}

export type accessNumber = {
    phoneNumber:string
    numberActivation:string,
}


const AccessNumber:FC<IAccessNumberProps>= React.memo((props) => {
    const {} = props;

    const dispatch = useAppDispatch();

    //RTK
    const [reqActivateTg, {data:requestActivateTg, error:errorrequestActivateTg, isError: isErrorActivateTg, isLoading: loadingActivateTg,}] = useActivateTgMutation();

    //ACTIONS FROM REDUX
    // для изменения текущего состояния попапа (от 1 до 3)
    const { changeStateClickOnEnter } = stateAuthWindowSliceActions;
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    //USESTATE
    // для определения текущего состояния попапа, окно входа, ргистрация, забыл пароль. при первом открытии открывается окно входа
    const { clickOnEnter } = useAppSelector((state) => state.statePopup);

    const onSubmit: SubmitHandler<accessNumber> = (data) => {

        if(data?.numberActivation?.length <= 0 && data?.phoneNumber?.length) {
            dispatch(addInfoForCommonError({message: 'Вы не ввели код'}))
            return
        }
        reqActivateTg({
            phoneNumber: data.phoneNumber,
            numberActivation: data.numberActivation
        })
    };
    
    const {register, handleSubmit, control, setError, formState: { errors, isValid },} = useForm<accessNumber>({
        mode: 'onChange',
    });

    React.useEffect(() => {
        console.log(requestActivateTg)
        if (requestActivateTg?.text ==`Телефон успешно подтвержден, можете войти в учетную запись` ) {
            dispatch(changeStateClickOnEnter(0))
        }
    },[requestActivateTg])

    const backToLoginIn = () => {
        dispatch(changeStateClickOnEnter(0));
    };


    if (clickOnEnter != 4 ) {
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
                Подтверждение номера телефона через Telegram-бота.
            </h2>
            <div className={cls.textCover}>
                <div className={cls.text}>
                    Официальный бот - @com_check_bot.
                </div>
                <div className={cls.text}>
                    Кликните на <Link className={cls.linkBot} target='_blank' href={`https://t.me/com_check_bot`}>ссылку</Link> для
                    перехода к боту.
                </div>
                <div className={cls.text}>
                    Перейдя в чат бота, нужно запустить его по кнопке ”Start” в самом низу чата.
                </div>
                <div className={cls.text}>
                    После запуска бот пришлёт вам сообщение, а внизу появится кнопка “Отправить
                    контакт”.
                </div>
                <div className={cls.text}>
                    После того как нажмёте на кнопку, бот запросит подтверждение.
                </div>
                <div className={cls.text}>
                    Нажав на кнопку “Поделиться”, вы получите сообщение от бота c кодом подтверждения.
                </div>
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
                                inputStyle={{ width: '100%' }} // Настройте стили ввода
                                register={{
                                    ...register('phoneNumber', {}),
                                }}
                                {...field}
                            />
                        )
                        }
                    />
                </div>
                <Input
                    type="text"
                    classForInput={cls.input}
                    placeholder="Введите код"
                    classname={cls.inputRelative}
                    autofocus
                    defaultValue=""
                    register={{...(register('numberActivation'))}}/>
            </div>
            <div className={cls.btnCoverTwo}>
                <Button
                    classname={cls.btnEnter}
                    type={'submit'}
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
        </form>
    );
});

export default AccessNumber;