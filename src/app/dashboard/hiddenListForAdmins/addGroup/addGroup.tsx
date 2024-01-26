'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './addGroup.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {parseCookies} from "nookies";
import {useAddGroupMutation, useGetGroupsMutation} from "@/app/redux/entities/requestApi/requestApi";
import {InputChange} from "@/app/dashboard/hiddenListForAdmins/inputChange/inputChange";

interface addGroupProps {
    classname?: string;
}

const AddGroup:FC<addGroupProps> = (props) => {

    const { classname } = props;
    const cookies = parseCookies();

    //RTK
    const [getGroups, {data: requestGroups, error:errorGroups, isLoading: isLoadingGroups, isError:isErrorGroups}] = useGetGroupsMutation()
    const [createGroup, {data: requestGroup, error:errorGroup, isLoading: isLoadingGroup, isError:isErrorGroup}] = useAddGroupMutation()
    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE
    const [inputId, setInputId] = React.useState<string>('') // для отправки одной группы
    const [inputIdMany, setInputIdMany] = React.useState<string>('') // для отправки множества параметров
    const [showGroup, setShowGroup] = React.useState<boolean>(false)

    //USEREF

    //FUNCTIONS
    const addTextInputId = (e:ChangeEvent<HTMLInputElement>) => {
        setInputId(e.target.value)
    }
    const addTextInputIds = (e:ChangeEvent<HTMLInputElement>) => {
        setInputIdMany(e.target.value)
    }
    const showGroups = () => {
        setShowGroup(prevState => !prevState)
        if(cookies  && cookies._z) {
            getGroups(cookies)
        }
    }
    const addGroup = () => {
        if (inputId.length) {
            createGroup({
                identificator:1,
                id_group:inputId
            })
        }
    }

    const addGroups = () => {
        if (inputIdMany.length) {
            createGroup({
                identificator:2,
                id_group:inputIdMany.split(' ')
            })
        }
    }

    return (
        <div className={classNames(cls.addGroup, {},[classname] )} >
            <h2 className={cls.mainTitle}>Добавить группы с вк</h2>
            <div className={cls.section}>
                <form className={cls.form}>
                    <div className={cls.label}>id группы</div>
                    <Input
                        classForLabel = {cls.label}
                        onChange = {(e:ChangeEvent<HTMLInputElement>) => addTextInputId(e)}
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        placeholder='-150051906'
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
                    <div className={cls.label}>id групп</div>
                    <Input
                        classForLabel = {cls.label}
                        onChange = {(e:ChangeEvent<HTMLInputElement>) => addTextInputIds(e)}
                        classForInput={cls.input}
                        classname={cls.inputRelative}
                        placeholder='-150051906 -125151944 -62873868 -114905525'
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
                    {showGroup &&
                        <div className={cls.mainBlock}>
                            <div className={cls.titles}>
                                <div className={cls.head}>№</div>
                                <div className={cls.head}>id группы</div>
                                <div className={cls.head}>дата последн.</div>
                                <div className={cls.head}>дата добавления</div>
                                <div className={cls.head}>открыта</div>
                                <div className={cls.head}>изменить</div>
                                <div className={cls.head}>добавить</div>
                            </div>
                            {isLoadingGroups
                                && (
                                    <Loader
                                        classname="color-dark"
                                    />
                                )}
                            <div className={cls.cover}>
                                {requestGroups != undefined && requestGroups && requestGroups.length && requestGroups.map((item:any, index: string | number) => (
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
            {isLoadingGroup
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default AddGroup;
