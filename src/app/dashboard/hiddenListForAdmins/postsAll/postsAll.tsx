'use client';
import React, {FC} from 'react';
import cls from './postsAll.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import {Button} from "@/ui/Button/Button";
import {
    useCreateAndCheckAllPostsMutation,
    useCreateCategoryMutation,
    useDeleteAllPostsFromMainRepositoryMutation,
    useDeleteGroupInMainRepositoryMutation,
    useGetAllPostsMutation,
    useGetCategoriesMutation, useGetLogsMutation,
    useStartAddTutorsPostsMutation
} from "@/app/redux/entities/requestApi/requestApi";
import {parseCookies} from "nookies";
import Loader from "@/ui/Loader/Loader";

interface postsAllProps {
    classname?: string;
}

const PostsAll:FC<postsAllProps> = (props) => {
    const { classname } = props;
    const cookies = parseCookies();

    const [createAllPosts, {data: requestAllPosts, error:errorAllPosts, isLoading: isLoadingAllPosts, isError:isErrorAllPosts}] = useCreateAndCheckAllPostsMutation()
    const [getAllPosts, {data: requestGetAllPosts, error:errorGetAllPosts, isLoading: isLoadingGetAllPosts, isError:isErrorGetAllPosts}] = useGetAllPostsMutation()
    const [addTutors, {data: requestTutors, error:errorTutors, isLoading: isLoadingTutors, isError:isErrorTutors}] = useStartAddTutorsPostsMutation()
    const [deleteAllPostsMainRepository, {data: requestDeleteMainRepository, error:errorDeleteMainRepositoryTutors, isLoading: isLoadingDeleteMainRepositoryTutors, isError:isErrorDeleteMainRepositoryTutors}] = useDeleteAllPostsFromMainRepositoryMutation()
    const [deleteGroupMainRepository, {data: requestDeleteGroupMainRepository, error:errorDeleteGroupMainRepositoryTutors, isLoading: isLoadingDeleteGroupMainRepositoryTutors, isError:isErrorDeleteGroupMainRepositoryTutors}] = useDeleteGroupInMainRepositoryMutation()
    const [logs, {data: requestLogs, error:errorLogs, isLoading: isLoadingLogs, isError:isErrorLogs}] =     useGetLogsMutation()

    const startCreateAndCheckAllPosts = () => {
        if(cookies  && cookies._z) {
            createAllPosts(cookies)
        }
    }
    const getAllThisPosts = () => {
        if(cookies  && cookies._z) {
            getAllPosts(cookies)
        }
    }
    const addThisTutors = () => {
        if(cookies  && cookies._z) {
            addTutors(cookies)
        }
    }
    const deleteAllPostsFromMainRepository = () => {
        if(cookies  && cookies._z) {
            deleteAllPostsMainRepository(cookies)
        }
    }

    const deleteOneGroupFromMainRepository = (id:string) => {
        deleteGroupMainRepository({
            id:`-83065143`
        })
    }

    React.useEffect(
        () => {
            if(cookies  && cookies._z) {
                logs(cookies)
            }
        },[]
    )

    return (
        <div className={classNames(cls.postsAll, {},[classname] )} >
            <Button>получить логи</Button>
            <h2 className={cls.mainTitle}>Информация о репозитории где хранятся все посты с VK</h2>
            <div>
                <div>id</div>
                <div>email</div>
                <div>Номер телефона</div>
                <div>админ</div>
                <div>Главный админ</div>
                <div>тел. акт.</div>
                <div>почт. акт.</div>
                <div>создан</div>
                <div>обновлен</div>
                <div>категории</div>
            </div>
            <div className={cls.section}>
                <h3 className={cls.title}>Главный репозиторий</h3>
                <div className={cls.cover}>
                    <div>Всего постов</div>
                    <div>128 215</div>
                </div>
                <div className={cls.cover}>
                    <div>Последняя дата процедуры начала опроса групп</div>
                    <div>128 215</div>
                </div>
                <div className={cls.cover}>
                    <div>Последняя дата процедуры окончания опроса групп</div>
                    <div>128 215</div>
                </div>
                <div className={cls.block}>
                    <Button
                        onClick = {startCreateAndCheckAllPosts}
                        classname={cls.btn}
                    >запустить обновление и проверку репозитория всех постов</Button>
                    <Button
                        onClick = {deleteAllPostsFromMainRepository}
                        classname={cls.btn}
                    >очистить репозиторий
                    </Button>
                    <Button
                        onClick = {deleteOneGroupFromMainRepository}
                        classname={cls.btn}
                    >Удаллить одну группу
                    </Button>
                </div>
            </div>
            <div className={cls.section}>
                <h3 className={cls.title}>Репозиторий категории для репетиторов</h3>
                <div className={cls.cover}>
                    <div>Всего постов в категории для репетиторов</div>
                    <div>128 215</div>
                </div>
                <div className={cls.cover}>
                    <div>Последняя дата процедуры начала опроса групп</div>
                    <div>128 215</div>
                </div>
                <div className={cls.cover}>
                    <div>Последняя дата процедуры окончания опроса групп</div>
                    <div>128 215</div>
                </div>
                <div className={cls.block}>
                    <Button>запустить обновление и проверку репозитория всех постов</Button>
                    <Button>очистить репозиторий</Button>
                </div>
            </div>
            {isLoadingAllPosts
                && (
                    <Loader
                        classname="color-dark"
                    />
                )}
        </div>
    );
};

export default PostsAll;