import React, { FC, ReactNode } from 'react';
import cls from './Modal.module.scss';
import {classNames, Mods} from "@/helpers/lib/classNames/className";
import Portal from "@/shared/Portal/Portal";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
// import { Portal } from '../../Portal/Portal';
import CloseSvg from '@/assets/svgs/close.svg'
import {Button} from "@/ui/Button/Button";
import {statePopupSliceActions} from "@/app/redux/entities/popups/stateLoginPopupSlice/stateLoginPopupSlice";
interface ModalProps {
    classname?: string;
    children?:ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    classForContent?: string;
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

    const { stateAuth, data: infoUser, isAdmin, isMainAdmin, } = useAppSelector((state) => state.auth);
    const { categoriesPopup, stateFreePeriodPopup, stateLoginFormPopup, goClosePopups } = useAppSelector((state) => state.loginPopup);

    const { closeAllPopups, changeStateCategoriesPopup, changeStateLoginFormPopup, changeStateFreePeriod } = statePopupSliceActions;

    const [indicatorOpen, setIndicatorOpen] = React.useState<boolean>(false);
    const [isMounted, setIsMounted] = React.useState<boolean>(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const timerRef = React.useRef < ReturnType<typeof setTimeout> | null >(null);

    const mods: Mods = {
        [cls.opened]: indicatorOpen,
        [cls.isClosing]: isClosing,
    };

    React.useEffect(() => {
        if (goClosePopups) {
            setIsClosing(true);
            dispatch(closeAllPopups(false))
            dispatch(changeStateCategoriesPopup(false))
            dispatch(changeStateLoginFormPopup(false))
            dispatch(changeStateFreePeriod(false))
            document.documentElement.classList.remove("lock")
            timerRef.current = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
                setIsClosing(false);
                setIndicatorOpen(false);
                setIsMounted(false);
            }, ANIMATION_DELAY);
        }
    }, [goClosePopups]);


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

    const closePopup = React.useCallback(() => {
        setIsClosing(true);
        document.documentElement.classList.remove("lock")
        timerRef.current = setTimeout(() => {
            if (onClose) {
                onClose();
            }
            setIsClosing(false);
            setIndicatorOpen(false);
            setIsMounted(false);
        }, ANIMATION_DELAY);
    }, [setIsClosing, onClose]);

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

    const onContentClick = (e:React.MouseEvent) => {
        e.stopPropagation();
    };

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
