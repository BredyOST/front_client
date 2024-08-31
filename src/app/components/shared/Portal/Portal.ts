import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: ReactNode; // что перемещаем
    targetNode?: HTMLElement; // куда перемещаем
}

const Portal = ({ children, targetNode = document.body }: PortalProps) => {
    return createPortal(children, targetNode);
};
export default Portal;
