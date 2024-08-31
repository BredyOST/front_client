'use client';
import React, { FC} from 'react';
import cls from './selectCountry.module.scss'
import {Country} from "@/app/components/profilePage/changePhone/changePhone";

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
}

const SelectCountry:FC<selectCountryProps> = (props) => {
    const {
        setSelectedCountry,
        options,
        classname,
        profileIndicator,
        onChange,
        title,
        value,
        setInputPhone
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
        setInputPhone(selectedCountry?.value);
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

export default SelectCountry;