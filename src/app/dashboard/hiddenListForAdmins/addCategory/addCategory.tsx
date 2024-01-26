'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './addCategory.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import {
    useCreateCategoryMutation,
    useGetCategoriesMutation,
} from "@/app/redux/entities/requestApi/requestApi";
import {parseCookies} from "nookies";
import InputCategory from "@/app/dashboard/hiddenListForAdmins/inputCategory/inputCategory";

interface addCategoryProps {
    classname?: string;
}
export interface CategoriesInputs {
    id_category:string,
    name: string;
    description:string;
    positiveWords:string[];
    negativeWords:string[];
}


const AddCategory:FC<addCategoryProps> = (props) => {

    const { classname } = props;
    const cookies = parseCookies();

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //RTK
    const [createCategory, {data: requestCategory, error:errorCategory, isLoading: isLoadingCategory, isError:isErrorCategory}] = useCreateCategoryMutation()
    const [getCategories, {data: requestCategories, error:errorCategories, isLoading: isLoadingCategories, isError:isErrorCategories}] = useGetCategoriesMutation()

    //USESTATE
    const [inputsCategory, setInputsCategory] = React.useState<CategoriesInputs>({id_category: '', name: '', description:'', positiveWords:[], negativeWords:[]})
    const [showCategory, setShowCategory] = React.useState<boolean>(false)

    //USEREF

    //FUNCTIONS
    const addIds = (e:ChangeEvent<HTMLInputElement>) => {
        setInputsCategory({...inputsCategory, id_category: e.target.value});
    }
    const addName = (e:ChangeEvent<HTMLInputElement>) => {
        setInputsCategory({...inputsCategory, name: e.target.value});
    }
    const addDescriptions = (e:ChangeEvent<HTMLInputElement>) => {
        setInputsCategory({...inputsCategory, description: e.target.value});
    }
    const addPositiveWords = (e:ChangeEvent<HTMLInputElement>) => {
        setInputsCategory({...inputsCategory, positiveWords: e.target.value.split(',').map(word => word.trim())});

    }
    const addNegativeWords = (e:ChangeEvent<HTMLInputElement>) => {
        setInputsCategory({...inputsCategory, negativeWords: e.target.value.split(',').map(word => word.trim())});
    }

    const sendToCreate = () => {
        const obj:CategoriesInputs = {
            id_category: inputsCategory.id_category,
            name: inputsCategory.name,
            description:inputsCategory.description,
            positiveWords: inputsCategory.positiveWords,
            negativeWords: inputsCategory.negativeWords,
        }

        if (inputsCategory.name && inputsCategory.description && inputsCategory.id_category) {
            createCategory(obj)
        }
    }
    const showAllCategories = () => {
        setShowCategory(prevState => !prevState)
        if(cookies  && cookies._z) {
            getCategories(cookies);
        }
    }



    return (
        <div className={classNames(cls.addCategory, {},[classname] )} >
            <div className={cls.section}>
                <h2 className={cls.mainTitle}>Создать категорию</h2>
                <form action="admin/addCategory" className={cls.form}>
                    <div className={cls.coverInput}>
                        <div className={cls.label}>id категории</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addIds(e)}
                            value={inputsCategory.id_category}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите id категории'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>название</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addName(e)}
                            value={inputsCategory.name}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите название'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>описание</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addDescriptions(e)}
                            value={inputsCategory.description}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите описание'
                        >
                        </Input>
                    </div>

                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>позитивные слова</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addPositiveWords(e)}
                            value={inputsCategory.positiveWords}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите позитивные слова'
                        >
                        </Input>
                    </div>
                    <div className={cls.coverInputTwo}>
                        <div className={cls.label}>негативные слова</div>
                        <Input
                            onChange={(e:ChangeEvent<HTMLInputElement>) => addNegativeWords(e)}
                            value={inputsCategory.negativeWords}
                            classForInput={cls.input}
                            classname={cls.inputRelative}
                            placeholder='введите негативные слова'
                        >
                        </Input>
                    </div>

                    <div className={cls.coverBtn}>
                        <Button
                            classname={cls.btn}
                            onClick={sendToCreate}
                        >
                            Cоздать категорию
                        </Button>
                        <Button
                            classname={cls.btn}
                            onClick={showAllCategories}
                        >
                            Показать категории
                        </Button>
                    </div>
                </form>
                {showCategory &&
                    <div className={cls.mainBlock}>
                        <div className={cls.titles}>
                            <div className={cls.head}>№</div>
                            <div className={cls.head}>id группы</div>
                            <div className={cls.head}>название</div>
                            <div className={cls.head}>описание</div>
                            <div className={cls.head}>позитив</div>
                            <div className={cls.head}>негатив</div>
                            <div className={cls.head}>изменить</div>
                            <div className={cls.head}>добавить</div>
                        </div>
                        <div className={cls.mainCover}>
                            {isLoadingCategories
                                && (
                                    <Loader
                                        classname="color-dark"
                                    />
                                )}
                            {requestCategories != undefined && requestCategories && requestCategories.length && requestCategories.map((item:any, index: string | number) => (
                                <div
                                    className={cls.listTwo}
                                    key={item.id}
                                >
                                    <InputCategory
                                        item = {item}
                                        index={index}
                                    />
                                </div>
                            ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default AddCategory;