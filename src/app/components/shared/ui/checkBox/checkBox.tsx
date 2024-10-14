'use client';
import React, {FC} from 'react';
import cls from './checkBox.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";

interface checkBoxProps {
    classname?: string,
    title?: string,
}

const lists = [
    {id:1, text:'ВКонтакте'},
    {id:1, text:'Одноклассники'},
    {id:1, text:'FaceBook'},
    {id:1, text:'Twitter'},
    {id:1, text:'Instagram'},
    {id:1, text:'Телеграмм'},
]

const CheckBox:FC<checkBoxProps> = (props) => {
    const {
        classname,
        title,
    } = props;

    const [isChecked, setIsChecked] = React.useState(false);

    const mod:Mods = {
        [cls.active]:isChecked
    }

    return (
        <div className={classNames(cls.checkbox, mod,[classname] )} >
            {title &&
                <h3 className={cls.title}>
                    {title}
                </h3>
            }
            <div className={cls.body}>
                {lists && lists.length && lists.map((item) => (
                    <Button
                        key={item.id}
                        classname={cls.btn}
                    >
                        {item.text}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default CheckBox;