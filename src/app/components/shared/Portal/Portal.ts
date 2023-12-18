import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode; // что перемещаем
    whereToAddInDom?: HTMLElement; // куда перемещаем
}

const Portal: FC<PortalProps> = (props) => {
    const {
        children,
        whereToAddInDom = document.body, // если не указали то будет body
    } = props;

    return createPortal(children, whereToAddInDom);
};
export  default Portal;