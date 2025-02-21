'use client';
import React, {FC} from 'react';
import cls from './cleanFilter.module.scss'
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";

interface cleanFilterProps {
}

const СleanFilter:FC<cleanFilterProps> = (props) => {

    const dispatch = useAppDispatch();

    const {addKeyCityWords} = SearchParamsActions;
    const {addKeyWords} = SearchParamsActions;

    const cleanFilter = () => {
        dispatch(addKeyCityWords([]));
        dispatch(addKeyWords([]));

        const id = setTimeout(() => {
            localStorage.setItem('key_words', JSON.stringify([]));
            localStorage.setItem('key_city', JSON.stringify([]));
        }, 0);
        clearTimeout(id)
    }
    
    return (
        <button
            className={cls.btn}
            onClick={cleanFilter}
        >
            Сбросить фильтры
        </button>
    );
};

export default СleanFilter;