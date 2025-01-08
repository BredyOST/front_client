'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './addChat.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import Loader from "@/ui/Loader/Loader";
import {parseCookies} from "nookies";
import {
    useAddChatMutation,
    useAddGroupMutation, useGetChatMutation,
    useGetGroupsMutation
} from "@/app/redux/entities/requestApi/requestApi";
import InputChange from "@/app/dashboard/hiddenListForAdmins/inputChange/inputChange";


interface addChatProps {
    classname?: string;
}

const AddChat:FC<addChatProps> = (props) => {
    const { classname } = props;
    const cookies = parseCookies();

    const [getChats, {data: requestChats, error:errorChats, isLoading: isLoadingChats, isError:isErrorChats}] = useGetChatMutation()
    const [createAddChat, {data: requestAddChat, error:errorAddChat, isLoading: isLoadingAddChat, isError:isErrorAddChat}] = useAddChatMutation()

    const [inputName, setInputId] = React.useState<string>('')
    const [inputNameMany, setInputIdMany] = React.useState<string>('')
    const [show, setShow] = React.useState<boolean>(false)

    const addTextInputId = (e:ChangeEvent<HTMLInputElement>) => {
        setInputId(e.target.value)
    }
    const addTextInputIds = (e:ChangeEvent<HTMLInputElement>) => {
        setInputIdMany(e.target.value)
    }
    const showGroups = () => {
        setShow(prevState => !prevState)
        if(cookies  && cookies._z) {
            getChats(cookies)
        }
    }
    const addGroup = () => {
        if (inputName.length) {
            createAddChat({
                identificator:1,
                chatName:inputName
            })
        }
    }

    const addGroups = () => {
        if (inputNameMany.length) {
            createAddChat({
                identificator:2,
                chatName:inputNameMany.split(' ')
            })
        }
    }

    return (
        <div className={classNames(cls.addGroup, {},[classname] )} >
            <h2 className={cls.mainTitle}>Добавить чаты телеграмма</h2>
            <div className={cls.section}>
                <form className={cls.form}>
                    <div className={cls.label}>имя чата</div>
                    <Input
                        classForLabel = {cls.label}
                        onChange = {(e:ChangeEvent<HTMLInputElement>) => addTextInputId(e)}
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        placeholder='DNK_wiki'
                    >
                    </Input>
                    <Button
                        onClick={addGroup}
                        classname={`${cls.btn} ${cls.btdAdditional}`}
                    >
                        Создать
                    </Button>
                </form>
                <form className={cls.form}>
                    <div className={cls.label}>имя чатов</div>
                    <Input
                        classForLabel = {cls.label}
                        onChange = {(e:ChangeEvent<HTMLInputElement>) => addTextInputIds(e)}
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        placeholder='DNK_wiki DNK_wiki DNK_wiki'
                    >
                    </Input>
                    <Button
                        onClick={addGroups}
                        classname={`${cls.btn} ${cls.btdAdditional}`}
                    >
                        Создать
                    </Button>
                </form>
                <div>
                    <Button
                        onClick={showGroups}
                        classname={`${cls.btn} ${cls.btdAdditional}`}
                    >
                        Показать все группы
                    </Button>
                    {show &&
                        <div className={cls.mainBlock}>
                            <div className={cls.titles}>
                                <div className={cls.head}>№</div>
                                <div className={cls.head}>id группы</div>
                                <div className={cls.head}>индикатор</div>
                                <div className={cls.head}>дата добавления</div>
                                <div className={cls.head}>дата обнвовления</div>
                                <div className={cls.head}>изменить</div>
                                <div className={cls.head}>добавить</div>
                            </div>
                            {isLoadingChats
                                && (
                                    <Loader
                                        classname="color-dark"
                                    />
                                )}
                            <div className={cls.cover}>
                                {requestChats != undefined && requestChats && requestChats.length && requestChats.map((item:any, index: string | number) => (
                                    <div
                                        className={cls.list}
                                        key={item.id}

                                    >
                                        <InputChange
                                            index={index}
                                            item={item}
                                        />
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            {isLoadingAddChat
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default AddChat;