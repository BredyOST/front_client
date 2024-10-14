'use client';
import React, {FC} from 'react';
import cls from './social.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import CheckmarkSvg from '../../svgs/checkmarkc.svg'
import ArrowSvg from "@/app/components/svgs/arrow-right.svg";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";
interface socialProps {
    classname?: string;
    title?:string
}

const lists = [
    {id:1, text:'ВКонтакте', index:'vk'},
    {id:2, text:'fl.ru', index:'FL'},
    {id:3, text:'freelance.ru', index:'FR'},
]

//COMPOMEMT HAS'T FINISHED!!!!

const Social:FC<socialProps> = (props) => {
    const {
        classname,
        title,
    } = props;
    const dispatch = useAppDispatch();

    const {addSocial} = SearchParamsActions;

    const {social} = useAppSelector(state => state.searchParams)

    const [allCategories, setAllCategories] = React.useState<boolean>(true)
    const [showMenu, setShowMenu] = React.useState<boolean>(false)

    const mod:Mods = {
        [cls.all]:allCategories,
    }

    const checkIfAllSelected = () => lists.length === social.length;

    React.useEffect(() => {
        let savedSocial = localStorage.getItem('_social');
        if (savedSocial) {
            const parsedSocial = JSON.parse(savedSocial);
            dispatch(addSocial(parsedSocial));
        } else {
            const allIds = lists.map(item => item.id);
            dispatch(addSocial(allIds));
            localStorage.setItem('_social', JSON.stringify(allIds));
        }
    }, []);

    const toggleShowMenu  = () => {
        setShowMenu(prevState => !prevState)
    }

    const toggleAllCategories = () => {
        if (social.length === lists.length) {
            const firstCategory = [lists[0].id]; // Выбираем только одну категорию
            dispatch(addSocial(firstCategory));
            localStorage.setItem('_social', JSON.stringify(firstCategory));
        } else {
            const allIds = lists.map(item => item.id);
            dispatch(addSocial(allIds));
            localStorage.setItem('_social', JSON.stringify(allIds));
        }
    };

    const toggleCategory = (id: number) => {
        // Если это последняя категория, не делаем ничего
        if (social.length === 1 && social.includes(id)) {
            return;
        }

        let updatedSocial;
        if (social.includes(id)) {
            updatedSocial = social.filter(item => item !== id);
        } else {
            updatedSocial = [...social, id];
        }

        dispatch(addSocial(updatedSocial));
        localStorage.setItem('_social', JSON.stringify(updatedSocial));
    };

    return (
        <div className={classNames(cls.social, mod,[classname] )} >
            {title &&
                <h3 className={cls.title}>
                    {title}
                </h3>
            }
            <div className={cls.cover}>
                <div className={cls.body}>
                    <Button
                        classname={cls.indicator}
                        onClick={toggleShowMenu}
                    >
                        {allCategories ? 'Выбраны все' : `Выбрано ${social.length}`}
                        <ArrowSvg
                            className={`${cls.arrow} ${showMenu && cls.active}`}
                        />
                    </Button>
                    <div className={ `${cls.show} ${showMenu && cls.active}`}>
                        <Button
                            onClick={toggleAllCategories}
                            classname={cls.btnAll}
                            tabIndex={0}
                        >
                            Выбрать все
                        </Button>
                        {lists && lists.length && lists .map((item) => (
                            <Button
                                key={item.id}
                                classname={`${cls.btn} ${social && social.length && social.includes(item.id) && cls.active}`}
                                onClick={() => toggleCategory(item.id)}
                                tabIndex={0}
                            >
                                {item.text}
                                {social.includes(item.id) && <CheckmarkSvg className={cls.mark}/>}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social;