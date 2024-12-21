'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './inputCategory.module.scss'
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import {classNames} from "@/helpers/lib/classNames/className";
import {useDeleteCategoryMutation, useUpdateCategoryMutation} from "@/app/redux/entities/requestApi/requestApi.test";

interface inputCategoryProps {
    classname?: string;
    value?:string;
    index?: string | number
    item?:any
}

const InputCategory:FC<inputCategoryProps> = (props) => {
    const {
        classname,
        value,
        index,
        item
    } = props;

    //RTK
    const [updateCategory, {data: requestupdateCategory, error:errorupdateCategory, isLoading: isLoadingupdateCategory, isError:isErrorupdateCategory}] = useUpdateCategoryMutation()
    const [deleteCategory, {data: requesteleteCategoryCategory, error:erroreleteCategoryCategory, isLoading: isLoadingeleteCategoryCategory, isError:isErroreleteCategoryCategory}] = useDeleteCategoryMutation()


    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE
    const [idCategory, setIdCategory] = React.useState<string>(item.id_category ? item.id_category : '')
    const [nameCategory, setNameIdCategory] = React.useState<string>(item.name ? item.name : '')
    const [descriptionCategory, setDescriptionIdCategory] = React.useState<string>(item.description ? item.description : '')
    const [positiveCategory, setPositive] = React.useState<string[]>(item.positiveWords ? item.positiveWords : '')
    const [negativeCategory, setNegative] = React.useState<string[]>(item.negativeWords ? item.negativeWords : '')
    const [salary, setSalary] = React.useState<string>(item.salary ? item.salary : '')
    //USEREF

    //FUNCTIONS

    const changeId = (e:ChangeEvent<HTMLInputElement>) => {
        setIdCategory(e.target.value)
    }
    const changeName = (e:ChangeEvent<HTMLInputElement>) => {
        setNameIdCategory(e.target.value)
    }
    const changeDescription = (e:ChangeEvent<HTMLInputElement>) => {
        setDescriptionIdCategory(e.target.value)
    }
    const changePositive = (e:ChangeEvent<HTMLInputElement>) => {
        setPositive(e.target.value.split(',').map(word => word.trim()));
    }
    const changNegative = (e:ChangeEvent<HTMLInputElement>) => {
        setNegative(e.target.value.split(',').map(word => word.trim()));
    }
    const changeSalary = (e:ChangeEvent<HTMLInputElement>) => {
        setSalary(e.target.value)
    }
    const updateThisCategory = (id:number) => {
        updateCategory({
            id:item.id,
            id_category: idCategory ? idCategory : item.id_category,
            name: nameCategory ? nameCategory : item.name,
            description: descriptionCategory ? descriptionCategory : item.description,
            positiveWords: positiveCategory ? positiveCategory : item.positiveWords,
            negativeWords: negativeCategory ? negativeCategory : item.negativeWords,
            salary: salary ? salary : item.salary,
        })
    }
    const deleteThisCategory = (id:number) => {
        deleteCategory({
            id:item.id
        })
    }

    return (
        <div className={classNames(cls.inputCategory, {},[classname] )} >
            <div>{index ? +index+ 1 : ''}</div>
            <input
                value={idCategory ? idCategory : ''}
                onChange={(e) => changeId(e)}
                className={cls.inputNoPadding}
            />
            <input
                value={nameCategory ? nameCategory : ''}
                className={cls.inputNoPadding}
                onChange={(e) => changeName(e)}
            />
            <input
                value={descriptionCategory ? descriptionCategory : ''}
                className={cls.inputNoPadding}
                onChange={(e) => changeDescription(e)}
            />
            <input
                value={positiveCategory ? positiveCategory : ''}
                className={cls.inputNoPadding}
                onChange={(e) => changePositive(e)}
            />
            <input
                value={negativeCategory ? negativeCategory : ''}
                className={cls.inputNoPadding}
                onChange={(e) => changNegative(e)}
            />
            <input
                value={salary ? salary : ''}
                className={cls.inputNoPadding}
                onChange={(e) => changeSalary(e)}
            />
            <Button
                classname={cls.btn}
                onClick = {updateThisCategory}
            >
                сохранить
            </Button>
            <Button
                onClick={deleteThisCategory}
                classname={cls.btn}
            >
                удалить
            </Button>
        </div>
    );
};

export default InputCategory;