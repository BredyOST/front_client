'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './changeEmail.module.scss'
import VerifySvg from "@/app/components/svgs/checkmarkc.svg";
import NotVerifySvg from "@/app/components/svgs/notVefify.svg";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useChangeEmailMutation, useCodeForEmailMutation} from "@/app/redux/entities/requestApi/requestApi";
import {useAppSelector} from "@/app/redux/hooks/redux";
import Loader from "@/app/components/shared/ui/Loader/Loader";

interface changeEmailProps {
    classname?: string;
}
export type codeType = { code: string };
const ChangeEmail:FC<changeEmailProps> = (props) => {
    const { classname } = props;

    //RTK
    const [changeRequestCodeEmail, {
        data: requestCodeEmail, error: errorCodeEmail, isError: isErrorCodeEmail,  isLoading: loadingCodeEmail,
    }] =  useCodeForEmailMutation()

    const [changeRequestEmail, {
        data: requestEmail, error: errorEmail, isError: isErrorEmail,  isLoading: loadingEmail,
    }] = useChangeEmailMutation()
    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    const {data:infoUser} = useAppSelector(state => state.auth)
    //USESTATE
    const [inputEmail, setInputEmail] = React.useState<string>('')
    const [codeForNewMail, setCodeForNewMail] = React.useState<string>('')
    const [validate, setvalidate] = React.useState<boolean | string>('')
    const [showInputCode, setShoInputForCode] =React.useState<boolean>(false)
    const emailRegex = /^(?:[a-zA-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

    codeForNewMail

    //USEREF

    //FUNCTIONS

    const addEmail = (e:any) => {
        setInputEmail(e.target.value);

        const isValid = validateEmail(e.target.value);
        if (isValid) {
            setvalidate(false)
        } else {
            setvalidate(true)
        }
    }
    const sendNewEmail = (text:'sendAgain' | 'change') => {
        // setShoInputForCode(true)
        changeRequestCodeEmail({
            email: inputEmail,
            indicator: text
        }).then((result) => {
            if (result?.data?.text === `Код подтверждения направен на указанную почту` || result?.error?.data?.message === `Email уже добавлен во временное хранилище, проверьте ваш Email`) {
                setShoInputForCode(true)
            }
        })
    }

    const addCodeToInput = (e:ChangeEvent<HTMLInputElement>) => {
        setCodeForNewMail(e.target.value)
    }


    const changeStateShowVerifyEmail = () => {
        setShoInputForCode(false)
    }

    function validateEmail(email:string) {
        return emailRegex.test(email);
    }

    const sendCodeVerify = () => {
        const code:codeType = {code: codeForNewMail};
        changeRequestEmail(code)
    }


    React.useEffect(
        () => {
            if (infoUser && infoUser?.email) {
                setInputEmail(infoUser.email)
            } else {
                setInputEmail(`Данных нет`)
            }
        }, [infoUser]
    )

    return (
        <div className={cls.mainBlock}>
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Email</div>
                    {infoUser != null && infoUser != undefined && infoUser && infoUser.isActivatedEmail
                        ? <div className={cls.textVerify}> подтвержден<VerifySvg className={cls.verifySvg}/></div>
                        : <div className={cls.textVerify}>не подтвержден<NotVerifySvg className={cls.notVerifySvg}/></div>
                    }
                </div>
                <div className={cls.linkCover}>
                    <Input
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        value={inputEmail}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => addEmail(e)}
                    />
                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick={() => sendNewEmail('change')}
                        >
                            Изменить email
                        </Button>
                    </div>
                    {validate && <div className={cls.error}>введите корректный email</div>}
                </div>
            </div>
            {showInputCode &&
                <div className={cls.linkCoverCode}>
                    <div className={cls.coverBtn}>
                    <Button
                        classname={cls.btn}
                        onClick={changeStateShowVerifyEmail}
                    >
                        Скрыть поле
                    </Button>
                    </div>
                    <Input
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        value={codeForNewMail}
                        placeholder='Введите код подтверждения'
                        onChange={(e:ChangeEvent<HTMLInputElement>) => addCodeToInput(e)}
                    />
                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick={() => sendNewEmail('sendAgain')}
                        >
                            Направить код повторно
                        </Button>
                    </div>
                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick={sendCodeVerify}
                        >
                            Подтвердить email
                        </Button>
                    </div>
                </div>
            }
            { loadingCodeEmail
                && (
                    <Loader
                        classname="color-dark"
                    />
            )}
            { loadingEmail
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default ChangeEmail;