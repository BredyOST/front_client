'use client';
import React, {FC} from 'react';
import cls from './skeletonSearchPage.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";

interface skeletonSearchPageProps {
    classname?: string;
}

const SkeletonSearchPage:FC<skeletonSearchPageProps> = (props) => {
    const { classname } = props;
    
    return (
        <div className={classNames(cls.skeletonSearchPage, {},[classname] )} >

        </div>
    );
};

export default SkeletonSearchPage;