'use client';
import React, {FC} from 'react';
import cls from './constactUs.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useSendMassageMutation} from "@/app/redux/entities/requestApi/requestApi";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";

interface constactUsProps {
    classname?: string;
}

export const ConstactUs:FC<constactUsProps> = (props) => {
    const { classname } = props;

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    //ACTIONS FROM REDUX
    let [sendMassage, {
        data: requestsSendMassage, error: errorSendMassage, isError: isErrorSendMassage,  isLoading: loadingSendMassage,
    }] = useSendMassageMutation();

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    const handleSubmit = (e:any) => {
        e.preventDefault();

        // отправляем данные на регистрацию пользователя и создаем объект для передачи
        if(name && email && message) {
            const sendMassageInfo = {
                name:name,
                email:email,
                message:message,
            }
            sendMassage(sendMassageInfo)
        }
    };
    return (
        <div className={classNames(cls.constactUs, {},[classname] )} >
            <div className={cls.cover}>
                <div className={cls.section}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Форма обратной связи</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className={cls.coverForm}
                    >
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваше имя:
                                <input
                                    className={cls.inp}
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваш Email:
                                <input
                                    className={cls.inp}
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваше сообщение:
                                <textarea
                                    className={cls.textArea}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </label>
                        </div>
                        <div className={cls.coverBtn}>
                            <Button
                                type="submit"
                                classname={cls.button}
                            >Отправить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {loadingSendMassage
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default ConstactUs;