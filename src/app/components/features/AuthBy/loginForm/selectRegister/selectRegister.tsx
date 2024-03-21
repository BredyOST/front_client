'use client';
import React, { FC} from 'react';
import cls from './selectRegister.module.scss'
import {Country} from "@/app/dashboard/profile/changePhone/changePhone";

interface selectCountryProps {
    label?:string,
    profileIndicator?:boolean,
    onChange?:any,
    title?:string,
    value?:any,
    setSelectedCountry: any
    options: Country[];
    classname?:string,
    setInputPhone?:any
    textFromForms:any,
    setTextFromForms:any,
}

const SelectRegister:FC<selectCountryProps> = (props) => {
    const {
        setSelectedCountry,
        options,
        classname,
        profileIndicator,
        onChange,
        title,
        value,
        textFromForms,
        setTextFromForms
    } = props;

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedCountry = options.find((country) => country.value === selectedValue);
        setSelectedCountry(selectedCountry);
        setTextFromForms({...textFromForms, phoneRegister:  selectedCountry?.value});
    }

    return (
        <select onChange={handleCountryChange} className={cls.Select}>
            <option className={cls.mainOptions} value="">Выберите страну</option>
            {options.map((country) => (
                <option
                    className={cls.option}
                    key={country.name}
                    value={country.value}
                >
                    {country.name}
                </option>
            ))}
        </select>
    );
};

export default SelectRegister;