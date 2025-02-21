'use client';
import React, {ChangeEvent} from 'react';
import cls from './changeName.module.scss'
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import {useChangeNameAndCardMutation} from "@/app/redux/entities/requestApi/requestApi";
import {useAppSelector} from "@/app/redux/hooks/redux";
import Loader from "@/ui/Loader/Loader";


const ChangeName = () => {

    const [changeNameAndCard, {
        data: requestChangeNameAndCard, error: errorNameAndCard, isError: isErrorNameAndCard,  isLoading: loadingNameAndCard,
    }] = useChangeNameAndCardMutation()

    const {data:infoUser} = useAppSelector(state => state.auth)
    const [profileName, setProfileName] = React.useState<string>()

    const addName = (e:ChangeEvent<HTMLInputElement>) => {
        setProfileName(e.target.value);
    }
    const sendNewName = () => {
        changeNameAndCard({
            fullName: profileName
        })
    }

    React.useEffect(
        () => {
            if (infoUser && infoUser?.fullName) {
                setProfileName(infoUser.fullName)
            } else {
                setProfileName("данных нет")
            }
        }, [infoUser]
    )

    return (
        <div className={cls.block}>
            <div className={cls.blockInfo}>
                <div className={cls.text}>Имя</div>
            </div>
            <div className={cls.linkCover}>
                <Input
                    classForInput={cls.input}
                    classname={cls.inputRelative}
                    value={profileName}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => addName(e)}
                />
                <div className={cls.coverBtn}>
                    <Button
                        type='submit'
                        classname={cls.btn}
                        onClick={sendNewName}
                    >
                        Изменить имя</Button>
                </div>
            </div>
            { loadingNameAndCard
                    && (
                        <Loader
                            classname="color-dark"
                        />
                    )}
        </div>
    );
};

export default ChangeName;