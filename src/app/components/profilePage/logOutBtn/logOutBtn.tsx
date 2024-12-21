'use client';
import React, {FC} from 'react';
import {Button} from "@/ui/Button/Button";
import {useLogOutFromProfile} from "@/shared/hooks/hooks";

interface LogOutBtnProps {
    classname?: any,
    children:any
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