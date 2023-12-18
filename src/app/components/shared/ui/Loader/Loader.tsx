import { FC } from 'react';
import {classNames} from "@/app/components/shared/lib/classNames/className";
import './Loader.scss';

interface LoaderProps {
    classname?: string;
}

const Loader:FC<LoaderProps> = ({ classname }) => (
    <div className={classNames('lds-spinner fixed', {}, [classname])}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
    </div>
);
export default Loader;