'use client';
import React from 'react';
import cls from './cleanFilter.module.scss'
import {useAppDispatch} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";
import {TypeForFunc} from "@/app/types/types";
import {Button} from "@/app/components/shared/ui/Button/Button";

const СleanFilter= () => {
    const dispatch = useAppDispatch();

    const {addKeyCityWords} = SearchParamsActions;
    const {addKeyWords} = SearchParamsActions;
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

    const cleanFilter:TypeForFunc<void, void> = () => {
        dispatch(addKeyCityWords([]));
        dispatch(addKeyWords([]));
        if(timerRef.current) {
            clearTimeout(timerRef.current)
            timerRef.current = null
        }
        timerRef.current = setTimeout(() => {
            localStorage.setItem('key_words', JSON.stringify([]));
            localStorage.setItem('key_city', JSON.stringify([]));
        }, 0);
    }

    
    return (
        <Button
            className={cls.btn}
            onClick={cleanFilter}
        >
            Сбросить фильтры
        </Button>
    );
};

export default СleanFilter;