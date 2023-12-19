'use client';
import React, {FC} from 'react';
import cls from './tabs.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";

interface tsbsProps {
    classname?: string;
    title?:string;
}

interface ForCounterItem {
    id: number;
    text: string;
}

const forCounter:ForCounterItem[] = [
    {id:1, text:'10'},
    {id:2, text:'30'},
    {id:3, text:'50'},
]

const Tabs:FC<tsbsProps> = React.memo((props) => {
    const {
        classname,
        title,
    } = props;
    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    const {addPostsCount} = SearchParamsActions;
    //STATES FROM REDUX
    const {postsCount} = useAppSelector(state => state.searchParams)
    //USESTATE

    //USEREF


    React.useEffect(
        () => {
            let locaCounter;
            locaCounter = localStorage.getItem('_tabs_count');
            if(locaCounter) {
                dispatch(addPostsCount(+locaCounter))
            }
        },[]
    )

    //FUNCTIONS
    const changeActiveTabs = React.useCallback(
        (text:string) => {
            localStorage.setItem('_tabs_count', `${text}`);
            dispatch(addPostsCount(+text))
        },[]
    )

    // @ts-ignore
    return (
        <div className={classNames(cls.selectTabs, {},[classname] )} >
            {title &&
                <h3 className={cls.title}>
                    {title}
                </h3>
            }
            <div className={cls.coverBtn}>
                {forCounter?.length && forCounter.map((item:ForCounterItem)=> (
                    <Button
                        key={item.id}
                        onClick={() => changeActiveTabs(item.text)}
                        indicatorActiveTab={+item.text == postsCount}
                        classname={
                            item.id === 1 ? `${cls.tabBtn} ${cls.left}`
                                : forCounter?.length && item.id > 1 && forCounter.length > 0 && item.id < forCounter[forCounter.length - 1].id ? `${cls.tabBtn}`
                                    : forCounter?.length && item.id == forCounter?.at(-1)?.id ? `${cls.tabBtn} ${cls.right}`
                                        :`${cls.tabBtn}`
                        }
                    >
                        {item.text}
                    </Button>
                ) )}
            </div>
        </div>
    );
});

export default Tabs;