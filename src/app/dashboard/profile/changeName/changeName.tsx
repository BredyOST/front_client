'use client';
import React, {FC} from 'react';
import cls from './changeName.module.scss'
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {useChangeNameAndCardMutation} from "@/app/redux/entities/requestApi/requestApi";
import {useAppSelector} from "@/app/redux/hooks/redux";
import Loader from "@/app/components/shared/ui/Loader/Loader";

interface changeNameProps {
    classname?: string;
}

const ChangeName:FC<changeNameProps> = (props) => {
    const { classname } = props;

    //RTK
    const [changeNameAndCard, {
        data: requestChangeNameAndCard, error: errorNameAndCard, isError: isErrorNameAndCard,  isLoading: loadingNameAndCard,
    }] = useChangeNameAndCardMutation()

    //ACTIONS FROM REDUX

    //STATES FROM REDUX
    const {data:infoUser} = useAppSelector(state => state.auth)
    //USESTATE
    const [inputInp, setInputInp] = React.useState<string>()
    //USEREF

    //FUNCTIONS
    const addFullNameText = (e:any) => {
        setInputInp(e.target.value);
    }
    const sendNewFullName = () => {
        changeNameAndCard({
            fullName: inputInp
        })
    }

    React.useEffect(
        () => {
            if (infoUser && infoUser?.fullName) {
                setInputInp(infoUser.fullName)
            } else {
                setInputInp("данных нет")
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
                    value={inputInp}
                    onChange={(e:any) => addFullNameText(e)}
                />
                <div className={cls.coverBtn}>
                    <Button
                        type='submit'
                        classname={cls.btn}
                        onClick={sendNewFullName}
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