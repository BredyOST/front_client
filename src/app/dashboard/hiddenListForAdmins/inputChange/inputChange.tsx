'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './inputChange.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {
    useAddGroupMutation,
    useDeleteGroupMutation,
    useGetGroupsMutation, useUpdateGroupMutation
} from "@/app/redux/entities/requestApi/requestApi";

interface inputChangeProps {
    classname?: string;
    value?:string;
    index?: string | number
    item?:any
}

export const InputChange:FC<inputChangeProps> = (props) => {
    const {
        classname,
        value,
        index,
        item
    } = props;


    //RTK
    const [deleteGroup, {data: requestdeleteGroups, error:errordeleteGroups, isLoading: isLoadingdeleteGroups, isError:isErrordeleteGroups}] = useDeleteGroupMutation()
    const [updateGroup, {data: requesupdatetGroup, error:errorupdateGroup, isLoading: isLoadingupdateGroup, isError:isErrorupdateGroup}] =  useUpdateGroupMutation()



    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE
    const [idGroup, setIdGroup] = React.useState<string>(item.idVk ? item.idVk : '')
    const [deleted, setDeleted] = React.useState<boolean>(false)

    const mod:Mods = {
        [cls.deleted]: deleted
    }

    //USEREF

    //FUNCTIONS

    const changeNewId = () => {
        updateGroup({
            newIdVk:idGroup,
            id:item.id
        })
    }

    const changeValue = (e:ChangeEvent<HTMLInputElement>) => {
        setIdGroup(e.target.value)
    }

    const deleteThisGroup = (e:ChangeEvent<HTMLInputElement>) => {
        deleteGroup({id:item.id})
        setDeleted(true)
    }


    return (
        <div className={classNames(cls.inputChange, mod,[classname] )} >
            <div>{index ? +index + 1 : ''}</div>
            <input
                value={idGroup ? idGroup : ''}
                onChange={(e) => changeValue(e)}
                className={cls.input}

            />
            <div>{item.identification}</div>
            <div>{new Date(item.createdAt).toDateString()}</div>
            <div>{new Date(item.updateAt).toDateString()}</div>
            <Button
                classname={cls.btn}
                onClick={changeNewId}
            >
                обновить
            </Button>
            <Button
                classname={cls.btn}
                onClick={deleteThisGroup}
            >
                удалить
            </Button>
        </div>
    );
};

export default InputChange;