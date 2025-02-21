import cls from './notFoundPage.module.scss';
import {classNames} from "@/helpers/lib/classNames/className";
import {FC} from "react";
import {AppLink} from "@/ui/appLink/appLink";

interface NotFoundPageProps {
    classname?: string;
}

const NotFound:FC<NotFoundPageProps> = ({ classname }) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [classname])}>
            <div className={cls.cover}>
                страница не найдена
            </div>
            <div>
            </div>
            <AppLink
                href='/'
                classname={cls.link}
            >
                нажми здесь для возврата на главную
            </AppLink>
        </div>
    );
};

export default NotFound;