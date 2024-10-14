'use client';
import React, {ReactNode} from 'react';
import {Button} from "@/app/components/shared/ui/Button/Button";
import {useLogOutFromProfile} from "@/app/hooks/hooks";

interface LogOutBtnProps {
    classname: string,
    children:ReactNode
}

export const LogOutBtn = ({   classname, children}:LogOutBtnProps) => {

    let {logoutProfile} = useLogOutFromProfile()

    return (

        <Button
            classname={classname}
            onClick = {logoutProfile}
        >
            {children}
        </Button>
    );
};

export default LogOutBtn;