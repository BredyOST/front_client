"use client";
import {store} from '../config/store';
import {Provider} from "react-redux";
import {FC} from "react";

export interface IReduxProvider {
    children:React.ReactNode;
}

const ReduxProvider:FC<IReduxProvider> = (props) => {
    const {children} = props

    return <Provider store={store}>
        {children}
    </Provider>
}

export default ReduxProvider;