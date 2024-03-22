import React, { FC, ReactNode } from 'react';
import cls from './Modal.module.scss';
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import Portal from "@/app/components/shared/Portal/Portal";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
// import { Portal } from '../../Portal/Portal';
import CloseSvg from './../../../svgs/close.svg'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
interface ModalProps {
    classname?: string;
    children?:ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    classForContent?: string; // класс для того чтобы управлять окном контента для каждой модалки
    lazy?:boolean;
    indicatorForNotCloseWhenStateAuthTrue?:boolean
}
const ANIMATION_DELAY = 400;

export const Modal:FC<ModalProps> = React.memo((props) => {
    const {
        classname,
        children,
        isOpen,
        onClose,
        classForContent,
        lazy,
    } = props;

    const dispatch = useAppDispatch();

    // states from redux
    const { stateAuth, data: infoUser, isAdmin, isMainAdmin, } = useAppSelector((state) => state.auth);
    const { categoriesPopup, stateFreePeriodPopup, stateLoginFormPopup, goClosePopups } = useAppSelector((state) => state.loginPopup);

    //actions
    const { closeAllPopups, changeStateCategoriesPopup, changeStateLoginFormPopup, changeStateFreePeriod } = statePopupSliceActions;

    // indicators
    const [indicatorOpen, setIndicatorOpen] = React.useState<boolean>(false); // дополнительное состояние чтобы плавно появлялась модалка после передачи isOpen: true
    const [isMounted, setIsMounted] = React.useState<boolean>(false); // для определения когда modal вмонтировано
    const [isClosing, setIsClosing] = React.useState(false);
    const timerRef = React.useRef < ReturnType<typeof setTimeout> | null >(null);

    // mods для добавдения классов
    const mods: Mods = {
        [cls.opened]: indicatorOpen,
        [cls.isClosing]: isClosing,
    };

    // когда выполнен вход то закрываем окно, если true в авторизации
    React.useEffect(() => {
        if (goClosePopups) {
            setIsClosing(true);
            dispatch(closeAllPopups(false))
            dispatch(changeStateCategoriesPopup(false))
            dispatch(changeStateLoginFormPopup(false))
            dispatch(changeStateFreePeriod(false))
            timerRef.current = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
                setIsClosing(false); // после закрытия убрать scale 0.2
                setIndicatorOpen(false);
                setIsMounted(false); // чтобы убрать из DOM модальное окно
            }, ANIMATION_DELAY);
        }
    }, [goClosePopups]);


    // для открытия попапа
    React.useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            setTimeout(() => {
                setIndicatorOpen(true);
            }, 100);
            document.documentElement.classList.add("lock")
        } else if (!isOpen && indicatorOpen) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose && onClose();
                setIsClosing(false);
                setIndicatorOpen(false);
                setIsMounted(false);
            }, ANIMATION_DELAY);
        }
    }, [isOpen]);

    // функция для закрытия попапа
    const closePopup = React.useCallback(() => {
        setIsClosing(true);
        document.documentElement.classList.remove("lock")
        timerRef.current = setTimeout(() => {
            if (onClose) {
                onClose();
            }
            setIsClosing(false); // после закрытия убрать scale 0.2
            setIndicatorOpen(false);
            setIsMounted(false); // чтобы убрать из DOM модальное окно
        }, ANIMATION_DELAY);
    }, [setIsClosing, onClose]);

    // закрываем при нажатии на клавишу escape
    const onKeyDown = React.useCallback((e:KeyboardEvent) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    }, [closePopup]);

    React.useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', (e:KeyboardEvent) => {
                onKeyDown(e);
            });
        }
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        window.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onKeyDown]);

    // // останавливаем высплытие чтобы попам не закрылся
    const onContentClick = (e:React.MouseEvent) => {
        e.stopPropagation();
    };

    // в этом случае модалку в DOM дерево не монтируем
    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [classname])}>
                <div
                    className={cls.overlay}
                    onClick={closePopup}
                >
                    <div
                        className={`${cls.content} ${classForContent}`}
                        onClick={onContentClick}
                    >
                        <div className={cls.coverBtnClose}>
                            <Button
                                onClick={closePopup}
                                classname={cls.btn}
                            >
                                <CloseSvg
                                    className = {cls.close}
                                />
                            </Button>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
});

export default Modal;
