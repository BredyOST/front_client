import React from 'react';
import cls from './feedback.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";

interface feedBackProps {

}

async function Feedback (props:feedBackProps) {
    const {  } = props;

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS

    return (
        <div className={cls.feedback}>
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Отзывы</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
