import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import ConstactUs from "./../../constactUs/constactUs";
import React from 'react';
import {Provider} from "react-redux";
import {store} from "@/app/redux/config/store";

jest.mock('./../../../../redux/entities/requestApi/requestApi', () => ({
    requestApi: {
        reducerPath: 'requestApi',
        reducer: () => ({}),
        middleware: jest.fn(),
        useSendMassageMutation: jest.fn(() => [
            jest.fn(),
            {
                data: null,
                error: null,
                isError: false,
                isLoading: false,
            },
        ]),
    },
}));


describe('renders contacts', () => {

    test('render components', () => {
        render(
            <Provider store={store}>
                <ConstactUs />
                </Provider>
        );
        expect(screen.getByText(/Форма обратной связи/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Ваше имя:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Ваш email:/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Ваше сообщение:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Отправить/i })).toBeInTheDocument();
        screen.debug()
    })

    test('forms check', () => {
        render(
            <Provider store={store}>
            <ConstactUs classname="test-classname" />
                </Provider>
        );
        // получаем поля
        const nameInp = screen.getByLabelText(/Ваше имя:/i)
        const emailInp = screen.getByLabelText(/Ваш email:/i)
        const messageInp = screen.getByLabelText(/Ваше сообщение:/i)

        // меняем данные
        fireEvent.change(nameInp, { target: { value: 'Test name' } });
        fireEvent.change(emailInp, {target:{value:'email'}})
        fireEvent.change(messageInp, {target:{value:'message'}})
        // проверяем изменения
        expect(nameInp).toHaveValue('Test name')
        expect(emailInp).toHaveValue('email');
        expect(messageInp).toHaveValue('message')
        screen.debug(); // Отладка DOM-дерева, если потребуется
    })

    test('send form', () => {
        render(
            <Provider store={store}>
            <ConstactUs classname="test-classname" />
                </Provider>
        );

        const nameInp = screen.getByLabelText(/Ваше имя:/i)
        const emailInp = screen.getByLabelText(/Ваш email:/i)
        const messageInp = screen.getByLabelText(/Ваше сообщение:/i)
        const sendBtn = screen.getByText(/Отправить/i)

        fireEvent.change(nameInp, { target: { value: 'Test name' } });
        fireEvent.change(emailInp, {target:{value:'email'}})
        fireEvent.change(messageInp, {target:{value:'message'}})


        fireEvent.click(sendBtn)


    })
})