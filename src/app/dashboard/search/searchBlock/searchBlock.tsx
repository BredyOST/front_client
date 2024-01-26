'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './searchBlock.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import CancelSvg from "@/app/components/svgs/cancel.svg";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";

interface searchBlockProps {
    classname?: string;
}

const SearchBlock:FC<searchBlockProps> = React.memo((props) => {
    const {
        classname,
    } = props;
    const dispatch = useAppDispatch();


    //ACTIONS FROM REDUX
    const {addKeyWords} = SearchParamsActions;
    //STATES FROM REDUX
    const {stateAuth, data:infoUser} = useAppSelector(state => state.auth)
    const {keyWords} = useAppSelector(state => state.searchParams)

    //RTK

    //USESTATE
    const [inputKeyWords, setInputKeyWords] = React.useState<string>(''); // для отображения что введено в инпут

    //USEREF

    const inputRef = React.useRef<HTMLInputElement>(null);

    const mod: Mods = {
        [cls.inputActive]: inputKeyWords.length
    }

    React.useEffect(
        () => {
            const localWords = localStorage.getItem('key_words');
            if (localWords) {
                dispatch(addKeyWords(JSON.parse(localWords)))
            }
        },[]
    )

    //FUNCTIONS
    //что введено в инпут
    const addInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputKeyWords(e.target.value)
    }

    // добавить ключевое слова в массив
    const addWords = () => {
        if (!inputKeyWords) return;
        if (!keyWords.includes(inputKeyWords)) {
            const updatedWords = [...keyWords, inputKeyWords];
            dispatch(addKeyWords(updatedWords));
            localStorage.setItem('key_words', JSON.stringify(updatedWords)); // Обн
            // Очистка инпута и состояния
            setInputKeyWords('');
            if(inputRef.current) inputRef.current.value = '';
        }
    }

    const deleteKeyWord = (word: string) => {
        const updatedWords = keyWords.filter((item: string) => item !== word);
        dispatch(addKeyWords(updatedWords));
        localStorage.setItem('key_words', JSON.stringify(updatedWords)); // Обн
    }

    const cleanInput = () => {
        if(inputRef.current) {
            inputRef.current.value = ''; // Очищаем поле ввода
        }
        setInputKeyWords(''); // Очищаем состояние, чтобы React перерендерил компонент
    }

    return (
        <div className={classNames(cls.secondCover, mod,[classname] )} >
            <div className={cls.header}>
                <div className={cls.first}>
                    <label
                        htmlFor='words'
                        className={cls.title}
                    >
                        Ключевые слова
                    </label>
                    <div className={cls.coverInput}>
                        <div className={cls.inputZone}>
                            <Input
                                onInput={(e:ChangeEvent<HTMLInputElement>) => addInputText(e)}
                                name="words"
                                value={inputKeyWords}
                                classForInput={cls.input}
                                placeholder='Введите слова'
                                forRef={inputRef}
                                classname={cls.inputDiv}
                            />
                            {inputKeyWords &&
                            <Button
                                onClick={cleanInput}
                                classname={cls.delete}
                            >
                                <CancelSvg
                                />
                            </Button>
                            }
                        </div>
                        <div className={cls.coverAddBtn}>
                            <Button
                                onClick={addWords}
                                classname={cls.addBtn}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
                {keyWords && keyWords?.length> 0 && keyWords?.map((item: any) => (
                    <div
                        key={item}
                        className={cls.areaKey}>
                        <div
                            key={item}
                            className={cls.word}
                        >
                            {item}
                        </div>
                        <Button
                            classname={cls.deleteKey}
                            onClick = {() => deleteKeyWord(item)}
                        >
                            <CancelSvg
                                className={cls.deleteWords}
                            />
                        </Button>
                    </div>
                ))}
                {keyWords?.length === 0 &&
                <div className={cls.coverKeyWords}>
                    <div className={cls.keyWords}>Ключевые слова не выбраны</div>
                </div>
                }
            </div>
        </div>
    );
});
export default SearchBlock;
