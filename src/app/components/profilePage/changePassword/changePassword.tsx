'use client';
import React, {FC} from 'react';
import cls from './changePassword.module.scss'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {Input} from "@/app/components/shared/ui/input/Input";
import ShowSvg from "@/app/components/svgs/show.svg";
import HideSvg from "@/app/components/svgs/hide.svg";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {HidePassword} from "@/app/dashboard/profile/page";
import {useChangePasswordInProfileMutation} from "@/app/redux/entities/requestApi/requestApi";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {useAppDispatch} from "@/app/redux/hooks/redux";

interface changePasswordProps {
    classname?: string;
}

const ChangePassword:FC<changePasswordProps> = (props) => {
    const { classname } = props;
    const dispatch = useAppDispatch();
    //RTK
    const [changeRequestPassword, {
        data: requestChangePassword, error: errorPassword, isError: isErrorPassword,  isLoading: loadingPassword,
    }] = useChangePasswordInProfileMutation()

    //ACTIONS FROM REDUX
    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    //STATES FROM REDUX

    //USESTATE
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);     // для открытия меню изменения пароля
    const [inputNewTwoPassword, setInputNewTwoPassword] = React.useState<string>()
    const [inputCurrentPassword, setInputCurrentPassword] = React.useState<string>()
    const [passwordHideButton, setPasswordHideButton] = React.useState<HidePassword>({
        current: false,
        new:false,
        newTwo:false
    });
    const [sameNewPassword, setSameNewPassword] = React.useState<boolean | null>(null)
    const [inputNewPassword, setInputNewPassword] = React.useState<string>()

    //USEREF

    const mod:Mods = {
        [cls.active]: openMenu
    }

    //FUNCTIONS
    const changeStateForMenu = () => {
        setOpenMenu(prev => !prev)
    }
    const showAndHideCurrentPassword = () => {
        setPasswordHideButton({...passwordHideButton, current: !passwordHideButton.current})
    }
    const showAndHideNewPassword = () => {
        setPasswordHideButton({...passwordHideButton, new: !passwordHideButton.new})
    }
    const showAndHideNewTwoPassword = () => {
        setPasswordHideButton({...passwordHideButton, newTwo: !passwordHideButton.newTwo})
    }

    const addPasswordCurrent = (e:any) => {
        setInputCurrentPassword(e.target.value);
    }
    const addPasswordNew = (e:any) => {
        setInputNewPassword(e.target.value);
    }
    const addPasswordNewTwo = (e:any) => {
        setInputNewTwoPassword(e.target.value);
    }

    const sendNewPassword = () => {
        if(inputNewTwoPassword !== inputNewPassword) {
            const textError = {
                message: 'Не совпадают введенные пароли'
            }

            dispatch(addInfoForCommonError(textError))
        }

        if (sameNewPassword) {
            changeRequestPassword({
                currentPassword: inputCurrentPassword,
                passwordNew: inputNewPassword,
                passwordNewTwo: inputNewTwoPassword
            })
        }
    }

    React.useEffect(
        () => {
            if (inputNewTwoPassword && inputNewTwoPassword.length > 0 || inputNewPassword && inputNewPassword.length > 0) {
                if (inputNewTwoPassword !== inputNewPassword) {
                    setSameNewPassword(false)
                } else if (inputNewTwoPassword == inputNewPassword) {
                    setSameNewPassword(true)
                }
            } else {
                setSameNewPassword(null)
            }

        },[inputNewTwoPassword, inputNewPassword]
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
                            onClick = {changeStateForMenu}
                        >
                            {!openMenu ? "Изменить пароль" : "Скрыть меню"}
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
                            onChange={(e:any) => addPasswordCurrent(e)}
                        >
                            {
                                inputCurrentPassword &&  inputCurrentPassword?.length > 0
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
                            onChange={(e:any) => addPasswordNew(e)}
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
                            onChange={(e:any) => addPasswordNewTwo(e)}
                        >
                            {
                                inputNewTwoPassword && inputNewTwoPassword?.length > 0
                                && (
                                    <Button
                                        type="button"
                                        classname={cls.hideButton}
                                        onClick={showAndHideNewTwoPassword}
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
                    {inputNewTwoPassword !== inputNewPassword &&
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