import React, {FC} from 'react';
import cls from './notification.module.scss'
import {classNames, Mods} from "@/app/components/shared/lib/classNames/className";
import AttentionSvg from "@/app/components/svgs/attantion.svg";
import {useAppDispatch, useAppSelector} from "@/app/redux/hooks/redux";
import Portal from "@/app/components/shared/Portal/Portal";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";
import {Button} from "@/app/components/shared/ui/Button/Button";
import CloseSvg from './../../svgs/close.svg'

interface notificationProps {
    classname?: string;
}

const Notification:FC<notificationProps> = React.memo((props) => {
    const {
        classname,
    } = props;

    const dispatch = useAppDispatch();

    const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

    const {commonForRequest, commonForError} = useAppSelector(state => state.notifications)

    const mod:Mods = {
        [cls.commonForRequest]: commonForRequest,
        [cls.commonForError]:  commonForError,
    }
    const [indicator, setIndicator] = React.useState<boolean>(false);
    const timerRef = React.useRef < ReturnType<typeof setTimeout> | null >(null);

    const returnIndicatorFalse = () => {
        timerRef.current =  setTimeout(() => {
            if (commonForRequest) dispatch(addInfoForCommonRequest(''))
            if (commonForError) dispatch(addInfoForCommonError(''))
            setIndicator(false)
        }, 5000)
    }

    React.useEffect(
        () => {
            if (commonForError) {
                if (commonForRequest) dispatch(addInfoForCommonRequest(''))
                if(!indicator) {
                    setIndicator(true)
                    returnIndicatorFalse()
                } else if (indicator) {
                    if (timerRef && timerRef.current) {
                        clearTimeout(timerRef.current)
                    }
                    setIndicator(false)
                    setTimeout(() => setIndicator(true),20)
                    returnIndicatorFalse()
                }
            }
        }, [commonForError,]
    )

    React.useEffect(
        () => {
            if (commonForRequest) {
                if(!indicator) {
                    setIndicator(true)
                    returnIndicatorFalse()
                } else if (indicator) {
                    if (commonForRequest) dispatch(addInfoForCommonError(''))
                    if (timerRef && timerRef.current) {
                        clearTimeout(timerRef.current)
                    }
                    setIndicator(false)
                    setTimeout(() => setIndicator(true),20)
                    returnIndicatorFalse()
                }
            }
        }, [commonForRequest]
    )

    const closeNotifications = () => {
        if (commonForRequest) dispatch(addInfoForCommonRequest(''))
        if (commonForError) dispatch(addInfoForCommonError(''))
        if (timerRef && timerRef.current) {
            clearTimeout(timerRef.current)
        }
        setIndicator(false)
    }


    if (!indicator) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(`${cls.notification}`, mod,[classname] )} >
                <div className={cls.relative}>
                    <Button
                        onClick ={closeNotifications}
                        classname={cls.closeBtn}
                    >
                        <CloseSvg className={cls.close}/>
                    </Button>
                    <div className={cls.coverNotification}>
                        <AttentionSvg
                            className={cls.attentionSvg}
                        />
                        <div className={cls.textAttention}>
                            {commonForRequest &&
                            <span>{commonForRequest.text}</span>
                            }
                            {commonForError &&
                                <span>{commonForError.message}</span>
                            }
                        </div>
                    </div>
                    <div className={cls.timer}>
                        <div className={cls.line}></div>
                    </div>
                </div>
            </div>
        </Portal>
    );
});

export default Notification;


