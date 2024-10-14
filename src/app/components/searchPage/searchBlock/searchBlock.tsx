'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './searchBlock.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import CancelSvg from "@/app/components/svgs/cancel.svg";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";
import {TypeForFunc} from "@/app/types/types";


const SearchBlock= React.memo(() => {
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
            const localWords:string | null = localStorage.getItem('key_words');
            if (localWords) {
                dispatch(addKeyWords(JSON.parse(localWords)))
            }
        },[]
    )

    const addInputText:TypeForFunc<React.ChangeEvent<HTMLInputElement>, void> = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputKeyWords(e.target.value)
    }

    const addWords:TypeForFunc<void, void> = () => {
        if (!inputKeyWords) return;

        if (!keyWords.includes(inputKeyWords)) {
            const updatedWords = [...keyWords, inputKeyWords];
            dispatch(addKeyWords(updatedWords));
            localStorage.setItem('key_words', JSON.stringify(updatedWords));

            setInputKeyWords('');
            if(inputRef.current) inputRef.current.value = '';
        }
    }

    const deleteKeyWord:TypeForFunc<string, void> = (word) => {
        const updatedWords:string[]= keyWords.filter((item: string) => item !== word);
        dispatch(addKeyWords(updatedWords));
        localStorage.setItem('key_words', JSON.stringify(updatedWords));
    }

    const cleanInput:TypeForFunc<void, void> = () => {
        if(inputRef.current) {
            inputRef.current.value = '';
        }
        setInputKeyWords('');
    }

    const handleKeyPress:TypeForFunc<React.KeyboardEvent<HTMLInputElement>, void> = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.currentTarget.classList.contains(cls.addBtn)) {
            addWords();
        }
    }

    return (
        <div className={classNames(cls.secondCover, mod, [])} >
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
