'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './changePassword.module.scss'
import {Button} from "@/ui/Button/Button";
import {Input} from "@/ui/input/Input";
import ShowSvg from "@/assets/svgs/show.svg";
import HideSvg from "@/assets/svgs/hide.svg";
import {classNames, Mods} from "@/helpers/lib/classNames/className";
import Loader from "@/ui/Loader/Loader";
import {useChangePasswordInProfileMutation} from "@/app/redux/entities/requestApi/requestApi";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {useAppDispatch} from "@/app/redux/hooks/redux";
import {HidePassword} from "@/shared/types/types";

interface changePasswordProps {
    classname?:string
}

const ChangePassword:FC<changePasswordProps> = (props) => {
    const { classname } = props;
    const dispatch = useAppDispatch();

    const [changeRequestPassword, {
        data: requestChangePassword, error: errorPassword, isError: isErrorPassword,  isLoading: loadingPassword,
    }] = useChangePasswordInProfileMutation()

    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    const [openMenuChangePasswordState, setOpenMenuChangePasswordState] = React.useState<boolean>(false);
    const [currentPassword, setCurrentPassword] = React.useState<string>()
    const [inputNewPassword, setInputNewPassword] = React.useState<string>()
    const [passwordNewRepeat, setPasswordNewRepeat] = React.useState<string>()
    const [passwordHideButton, setPasswordHideButton] = React.useState<HidePassword>({
        current: false,
        new:false,
        newTwo:false
    });
    const [checkNewAndCurrentPassword, setCheckNewAndCurrentPassword] = React.useState<boolean | null>(null)

    const mod:Mods = {
        [cls.active]: openMenuChangePasswordState
    }

    const openMenuChangePassword = () => {
        setOpenMenuChangePasswordState(prev => !prev)
    }
    const showAndHideCurrentPassword = () => {
        setPasswordHideButton({...passwordHideButton, current: !passwordHideButton.current})
    }
    const showAndHideNewPassword = () => {
        setPasswordHideButton({...passwordHideButton, new: !passwordHideButton.new})
    }
    const showAndHideNewPasswordRepeat = () => {
        setPasswordHideButton({...passwordHideButton, newTwo: !passwordHideButton.newTwo})
    }

    const addPasswordCurrent = (e:ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    }
    const addPasswordNew = (e:ChangeEvent<HTMLInputElement>) => {
        setInputNewPassword(e.target.value);
    }
    const addPasswordNewRepeat = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordNewRepeat(e.target.value);
    }

    const sendNewPassword = () => {
        if(passwordNewRepeat !== inputNewPassword) {
            const textError = {
                message: 'Не совпадают введенные пароли'
            }

            dispatch(addInfoForCommonError(textError))
        }

        if (checkNewAndCurrentPassword) {
            changeRequestPassword({
                currentPassword: currentPassword,
                passwordNew: inputNewPassword,
                passwordNewTwo: passwordNewRepeat
            })
        }
    }

    React.useEffect(
        () => {
            if (passwordNewRepeat && passwordNewRepeat.length > 0 || inputNewPassword && inputNewPassword.length > 0) {
                if (passwordNewRepeat !== inputNewPassword) {
                    setCheckNewAndCurrentPassword(false)
                } else if (passwordNewRepeat == inputNewPassword) {
                    setCheckNewAndCurrentPassword(true)
                }
            } else {
                setCheckNewAndCurrentPassword(null)
            }

        },[passwordNewRepeat, inputNewPassword]
    )
    return (
        <div className={classNames(cls.changePassword, mod,[classname] )} >
            <div className={cls.block}>
                <div className={cls.blockInfo}>
                    <div className={cls.text}>Пароль</div>
                </div>
                <div className={cls.linkCover}>
                    <div>
                        <Button
                            classname={cls.btn}
                            onClick = {openMenuChangePassword}
                        >
                            {!openMenuChangePasswordState ? "Изменить пароль" : "Скрыть меню"}
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cls.coverChangePassword}>
                <div className={cls.block}>
                    <div className={cls.blockInfo}>
                        <div className={cls.text}></div>
                    </div>
                    <div className={cls.coverPassword}>
                        <Input
                            type={passwordHideButton.current ? "text" : 'password'}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder="Текущий пароль"
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPasswordCurrent(e)}
                        >
                            {
                                currentPassword &&  currentPassword?.length > 0
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        onClick={showAndHideCurrentPassword}
                                    >
                                        {!passwordHideButton.current ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                    </Button>
                                )
                            }
                        </Input>
                    </div>
                </div>
                <div className={cls.block}>
                    <div className={cls.blockInfo}>
                        <div className={cls.text}> </div>
                    </div>
                    <div className={cls.coverPassword}>
                        <Input
                            type={passwordHideButton.new ? "text" : 'password'}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder="Новый пароль"
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPasswordNew(e)}
                        >
                            {
                                inputNewPassword && inputNewPassword?.length > 0
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        onClick={showAndHideNewPassword}
                                    >
                                        {!passwordHideButton.new ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                    </Button>
                                )
                            }
                        </Input>
                    </div>
                </div>
                <div className={cls.block}>
                    <div className={cls.blockInfo}>
                        <div className={cls.text}></div>
                    </div>
                    <div className={cls.coverPassword}>
                        <Input
                            type={passwordHideButton.newTwo ? "text" : 'password'}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder="Повторите новый пароль"
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPasswordNewRepeat(e)}
                        >
                            {
                                passwordNewRepeat && passwordNewRepeat?.length > 0
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        onClick={showAndHideNewPasswordRepeat}
                                    >
                                        {!passwordHideButton.newTwo ? <ShowSvg className={cls.showSvg} /> : <HideSvg className={cls.hideSvg} />}
                                    </Button>
                                )
                            }
                        </Input>
                    </div>
                </div>
                <div className={cls.block}>
                    <div className={cls.blockInfo}>
                        <div className={cls.text}></div>
                    </div>
                    <div className={cls.coverPasswordBtn}>
                        <Button
                            type="submit"
                            classname={cls.btn}
                            onClick={sendNewPassword}
                        >
                            Изменить пароль
                        </Button>
                    </div>
                    {passwordNewRepeat !== inputNewPassword &&
                        <div className={cls.error}>Пароли не совпадают</div>
                    }
                </div>
            </div>
            { loadingPassword
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default ChangePassword;