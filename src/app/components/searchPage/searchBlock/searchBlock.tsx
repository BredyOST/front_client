'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './searchBlock.module.scss'
import {classNames, Mods} from "@/helpers/lib/classNames/className";
import {Input} from "@/ui/input/Input";
import {Button} from "@/ui/Button/Button";
import CancelSvg from "@/assets/svgs/cancel.svg";
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

    const {addKeyWords} = SearchParamsActions;

    const {keyWords} = useAppSelector(state => state.searchParams)

    const [inputKeyWords, setInputKeyWords] = React.useState<string>('');

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

    const addInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputKeyWords(e.target.value)
    }

    const addWords = () => {
        if (!inputKeyWords) return;

        if (!keyWords.includes(inputKeyWords)) {
            const updatedWords = [...keyWords, inputKeyWords];
            dispatch(addKeyWords(updatedWords));
            localStorage.setItem('key_words', JSON.stringify(updatedWords));

            setInputKeyWords('');
            if(inputRef.current) inputRef.current.value = '';
        }
    }

    const deleteKeyWord = (word: string) => {
        const updatedWords = keyWords.filter((item: string) => item !== word);
        dispatch(addKeyWords(updatedWords));
        localStorage.setItem('key_words', JSON.stringify(updatedWords));
    }

    const cleanInput = () => {
        if(inputRef.current) {
            inputRef.current.value = '';
        }
        setInputKeyWords('');
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.currentTarget.classList.contains(cls.addBtn)) {
            addWords();
        }
    }

    return (
        <div className={classNames(cls.secondCover, mod,[classname] )} >
            <div className={cls.header}>
                <div className={cls.first}>
                    <div className={cls.coverInput}>
                        <div className={cls.inputZone}>
                            <Input
                                onInput={(e:ChangeEvent<HTMLInputElement>) => addInputText(e)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
                                name="words"
                                value={inputKeyWords}
                                classForInput={cls.input}
                                placeholder='Введите слово'
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
                    </div>
                </div>
                <div className={cls.coverAddBtn}>
                    <Button
                        onClick={addWords}
                        classname={cls.addBtn}
                    >
                        +
                    </Button>
                </div>
                {keyWords && keyWords?.length> 0 && keyWords?.map((item:string) => (
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
                    <div className={cls.keyWords}>Фильтр отсутствует</div>
                </div>
                }
            </div>
        </div>
    );
});
export default SearchBlock;
