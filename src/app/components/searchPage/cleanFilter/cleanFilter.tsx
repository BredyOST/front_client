'use client';
import React, { FC } from 'react';
import cls from './cleanFilter.module.scss';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks/redux';
import { SearchParamsActions } from '@/app/redux/entities/searchParams/searchParamsSlice';

interface cleanFilterProps {}

const СleanFilter: FC<cleanFilterProps> = (props) => {
    const dispatch = useAppDispatch();

    //ACTIONS FROM REDUX
    const { keyCityWords } = useAppSelector((state) => state.searchParams);
    const { keyWords } = useAppSelector((state) => state.searchParams);
    //ACTIONS FROM REDUX
    const { addKeyCityWords } = SearchParamsActions;
    const { addKeyWords } = SearchParamsActions;
    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    const cleanFilter = () => {
        dispatch(addKeyCityWords([]));
        dispatch(addKeyWords([]));
        // Ждем завершения диспетча экшена и обновляем localStorage
        const id = setTimeout(() => {
            localStorage.setItem('key_words', JSON.stringify([]));
            localStorage.setItem('key_city', JSON.stringify([]));
        }, 0);
    };

    return (
        <button className={cls.btn} onClick={cleanFilter}>
            Сбросить фильтры
        </button>
    );
};

export default СleanFilter;
