'use client';
import React from 'react';
import cls from './constactUs.module.scss';
import { Button } from '@/ui/Button/Button';
import Loader from '@/ui/Loader/Loader';
import {useAppSelector } from '@/app/redux/hooks/redux';
import { useShowMessageAfterRequest } from '@/shared/hooks/hooks';
import { infoForMassage, MessageForContactUs } from '@/shared/types/types';
import { useSendMassageMutation } from '@/app/redux/entities/requestApi/requestApi';

const ContactUs = () => {
    const [message, setMessage] = React.useState<MessageForContactUs>({
        name: '',
        email: '',
        message: '',
    });
    const addTextForForm = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>,
        title: string,
    ) => {
        setMessage((prevState) => ({ ...prevState, [title]: e.target.value }));
    };

    const { data, error, isLoading, isError } = useAppSelector(
        (state) => state.message,
    );

    let [ sendMessage, {
        data: requestsSendToSupport, error: errorSendToSupport, isError: isErrorSendToSupport, isLoading: loadingSendToSupport,
    }] = useSendMassageMutation();

    const sendInfoToSupport = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            message?.name?.length >= 1 &&
            message?.email?.length >= 1 &&
            message?.message?.length >= 1
        ) {
            const messageInfo: MessageForContactUs = {
                name: message.name,
                email: message.email,
                message: message.message,
            };
            sendMessage(messageInfo);
        }
    };

    useShowMessageAfterRequest(data?.text || data?.message, data);

    return (
        <div className={cls.contactUs}>
            <div className={cls.cover}>
                <div className={cls.section}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Форма обратной связи</h1>
                    </div>
                    <form
                        onSubmit={sendInfoToSupport}
                        className={cls.coverForm}
                    >
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваше имя:
                                <input
                                    className={cls.inp}
                                    type='text'
                                    value={message.name}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) => addTextForForm(e, infoForMassage.name)}
                                />
                            </label>
                        </div>
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваш Email:
                                <input
                                    className={cls.inp}
                                    type='email'
                                    value={message.email}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>,
                                    ) =>
                                        addTextForForm(e, infoForMassage.email)
                                    }
                                />
                            </label>
                        </div>
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваше сообщение:
                                <textarea
                                    className={cls.textArea}
                                    value={message.message}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>,
                                    ) =>
                                        addTextForForm(
                                            e,
                                            infoForMassage.message,
                                        )
                                    }
                                />
                            </label>
                        </div>
                        <div className={cls.coverBtn}>
                            <Button type='submit' classname={cls.button}>
                                Отправить
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <Loader classname='color-dark' />}
        </div>
    );
};

export default ContactUs;
