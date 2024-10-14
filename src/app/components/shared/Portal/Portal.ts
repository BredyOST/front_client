import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode;
    whereToAddInDom?: HTMLElement;
}

const Portal: FC<PortalProps> = (props) => {
    const {
        children,
        whereToAddInDom = document.body,
    } = props;

    return createPortal(children, whereToAddInDom);
};
export  default Portal;