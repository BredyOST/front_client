'use client';
import React from 'react';
import cls from './checkLogin.module.scss'

interface CheckLoginProps {
    checked:boolean,
    onChange:(checked:boolean) => void,
    children?:React.ReactNode,
}

export const CheckLogin = ({checked, onChange, children}:CheckLoginProps ) => {

    const [isChecked, setIsChecked] = React.useState<boolean>(checked);

    const handleChange = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    };

    return (
        <label className={cls.checkCover}>
            <input
                className={cls.check}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
            />
            <span className={cls.checkCustom}></span>
            {children}
        </label>
    );
};
export default CheckLogin;
