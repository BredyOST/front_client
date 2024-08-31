import { Dispatch, SetStateAction } from 'react';

const useToggleState = (setEvent: Dispatch<SetStateAction<boolean>>) => {
    return () => setEvent((prevState) => !prevState);
};

export { useToggleState };
