'use client'
import React, {
    FC, InputHTMLAttributes, memo, useEffect,
} from 'react';

import cls from './Input.module.scss';
import {classNames} from "@/app/components/shared/lib/classNames/className";

// Omit позволят изменить типы. мы все типы забираем но исклбючаем 'value' | 'onChange' и сам их прописываем
type HTMLINputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>
// и наследуем ниже HTMLINputProps
interface InputProps extends HTMLINputProps {
    classname?: string;
    value?:string;
    onChange?:any;
    classForInput?:string;
    classForLabel?:string,
    placeholder?:string;
    autofocus?:boolean;
    register?:any;
    autoComplete?: string,
    disabled?:boolean,
    forRef?:any,
    onInput?:any
    children?:any
    defaultValue?: any
    name?:string
    textlabel?:string,
    valueForIdGroup?:string,
    setValueState?:any,
    inputMode?:string;
    pattern?:any;
}

export const Input:FC<InputProps> =React.memo(React.forwardRef((props, ref) => {
    const {
        classname,
        value,
        onChange,
        type = 'text',
        classForInput,
        placeholder,
        register,
        autoComplete,
        disabled,
        onInput,
        children,
        defaultValue,
        forRef,
        name,
        classForLabel,
        textlabel,
        valueForIdGroup,
        setValueState,
        inputMode,
        pattern
    } = props;

    return (
        <div className={classNames(cls.Input, {}, [classname])}>
            {textlabel && <label className={classForLabel}>{textlabel}</label>}
            <input
                type={type}
                className={classForInput}
                placeholder={placeholder}
                onInput={onInput}
                onChange={onChange}
                value={valueForIdGroup ? valueForIdGroup : value}
                autoFocus
                pattern={pattern}
                ref={forRef}
                autoComplete={autoComplete}
                disabled={disabled}
                defaultValue={defaultValue}
                name={name}
                inputMode={inputMode}
                {...register}
            />
            {children}
        </div>
    );
}));
