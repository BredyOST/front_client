'use client'
import React, {FC} from 'react';
import cls from './slider.module.scss'
import {classNames} from "@/helpers/lib/classNames/className";
import {Input} from "@/ui/input/Input";


interface sliderProps {
    classname?: string;
    value?:string;
    classnameInput?:string;
    min?:string;
    max?:string;
    onInput?:any;
    classnameForTicks:string;
    step?:string
}

export const Slider:FC<sliderProps> = React.memo((props) => {
    const {
        classname,
        classnameInput,
        value,
        min,
        max,
        onInput,
        step,
        classnameForTicks
    } = props;


    return (
        <div className={classNames(cls.slider, {},[classname] )} >
            <input
                className={classnameInput}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onInput={(e:any) => onInput(e.target.value)}
            />
        </div>
    );
});

export  default  Slider;
