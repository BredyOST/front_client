'use client';
import React from 'react';
import cls from './constactUs.module.scss';
import {Button} from "@/app/components/shared/ui/Button/Button";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {sendMessageRequest} from "@/app/redux/saga/sendMessageFromContact/sagaApi";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {useShowMessageAfterRequest} from "@/app/hooks/hooks";
import {infoForMassage, MessageInfo} from "@/app/types/types";

const ContactUs = () => {

    const [messageForForm, setMessageForForm] = React.useState<MessageInfo>({name:'',email:'', message:''});
    const addTextForForm = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, title:string) => {
        setMessageForForm(prevState => ({...prevState, [title]:e.target.value}))
    }

    const dispatch = useAppDispatch()
    const {addInfoForCommonRequest} = indicatorsNotifications;
    const {data, error, isLoading, isError} = useAppSelector(state => state.message)

    // let [sendMessage, {
    //     data: requestsSendToSupport,
    //     error: errorSendToSupport,
    //     isError: isErrorSendToSupport,
    //     isLoading: loadingSendToSupport,
    // }] = useSendMassageMutation();

    const sendInfoToSupport = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(messageForForm?.name?.length >= 1 && messageForForm?.email?.length >= 1 && messageForForm?.message?.length >= 1) {
            const messageInfo:MessageInfo = {
                name:messageForForm.name,
                email:messageForForm.email,
                message:messageForForm.message,
            }
            // sendMessage(messageInfo)
            dispatch(sendMessageRequest(messageInfo))
        }
    };

    useShowMessageAfterRequest(data?.text || data?.message, data)

    return (
        <div className={cls.contactUs} >
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
                                    type="text"
                                    value={messageForForm.name}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => addTextForForm(e, infoForMassage.name)}
                                />
                            </label>
                        </div>
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваш Email:
                                <input
                                    className={cls.inp}
                                    type="email"
                                    value={messageForForm.email}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => addTextForForm(e, infoForMassage.email)}
                                />
                            </label>
                        </div>
                        <div className={cls.block}>
                            <label className={cls.label}>
                                Ваше сообщение:
                                <textarea
                                    className={cls.textArea}
                                    value={messageForForm.message}
                                    onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => addTextForForm(e, infoForMassage.message)}
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
            {isLoading
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
}

export default ContactUs;