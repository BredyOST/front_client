'use client';
import React, {ChangeEvent, FC} from 'react';
import cls from './cityBlock.module.scss'
import {Input} from "@/app/components/shared/ui/input/Input";
import {Button} from "@/app/components/shared/ui/Button/Button";
import CancelSvg from "@/app/components/svgs/cancel.svg";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import {SearchParamsActions} from "@/app/redux/entities/searchParams/searchParamsSlice";

interface cityBlockProps {
    classname?: string;
}

const CityBlock:FC<cityBlockProps> = (props) => {
    const {
        classname,
    } = props;

    const dispatch = useAppDispatch();

    const {addKeyCityWords} = SearchParamsActions;

    const {keyCityWords} = useAppSelector(state => state.searchParams)

    const [inputKeyWords, setInputKeyWords] = React.useState<string>('');

    const inputRef = React.useRef<HTMLInputElement>(null);

    const mod: Mods = {
        [cls.inputActive]: inputKeyWords.length
    }

    React.useEffect(
        () => {
            const localWords = localStorage.getItem('key_city');
            if (localWords) {
                dispatch(addKeyCityWords(JSON.parse(localWords)))
            }
        },[]
    )

    const addInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputKeyWords(e.target.value)
    }

    const addKeyWords = () => {
        if (!inputKeyWords) return;

        if (!keyCityWords.includes(inputKeyWords)) {
            const updatedWords = [...keyCityWords, inputKeyWords];
            dispatch(addKeyCityWords(updatedWords));
            localStorage.setItem('key_city', JSON.stringify(updatedWords));

            setInputKeyWords('');
            if(inputRef.current) inputRef.current.value = '';
        }
    }

    const deleteKeyWord = (word: string) => {
        const updatedWords = keyCityWords.filter((item: string) => item !== word);
        dispatch(addKeyCityWords(updatedWords));
        localStorage.setItem('key_city', JSON.stringify(updatedWords));
    }
    const cleanInput = () => {
        if(inputRef.current) {
            inputRef.current.value = '';
        }
        setInputKeyWords('');
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.currentTarget.classList.contains(cls.addBtn)) {
            addKeyWords();
        }
    }

    return (
        <div className={classNames(cls.cityBlock, {},[classname] )} >
            <div className={cls.header}>
                <div className={cls.first}>
                    {/*<label*/}
                    {/*    htmlFor='words'*/}
                    {/*    className={cls.title}*/}
                    {/*>*/}
                    {/*    Введите города*/}
                    {/*</label>*/}
                    <div className={cls.coverInput}>
                        <div className={cls.inputZone}>
                            <Input
                                onInput={(e:ChangeEvent<HTMLInputElement>) => addInputText(e)}
                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyPress(e)}
                                name="words"
                                value={inputKeyWords}
                                classForInput={cls.input}
                                placeholder='Введите город'
                                forRef={inputRef}
                                classname={cls.inputDiv}
                            />
                            {inputKeyWords &&
                            <Button
                                onClick={cleanInput}
                                classname={cls.delete}
                            >
                                <CancelSvg/>
                            </Button>
                            }
                        </div>
                    </div>
                </div>
                <div className={cls.coverAddBtn}>
                    <Button
                        onClick={addKeyWords}
                        classname={cls.addBtn}
                    >
                        +
                    </Button>
                </div>
                {keyCityWords && keyCityWords?.length> 0 && keyCityWords?.map((item: string) => (
                    <div
                        key={item}
                        className={cls.areaKey}>
                        <div
                            key={item}
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
                {keyCityWords?.length === 0 &&
                <div className={cls.coverKeyWords}>
                    <div className={cls.keyWords}>Фильтр отсутствует</div>
                </div>
                }
            </div>
        </div>
    );
};

export  default CityBlock;
