import React from 'react';
import cls from './contacts.module.scss';
import ConstactUs from '@/app/components/contactPage/constactUs/constactUs';

export const metadata = {
    title: 'Контакты - клиенты.com',
    description: 'Контакты',
};

const array = [
    { id: 1, name: 'ИП', text: 'Калашникова Елена Валентиновна' },
    { id: 2, name: 'ИНН', text: '320303460946' },
    { id: 3, name: 'ОГРН', text: '323320000024743' },
    { id: 4, name: 'Р/с', text: '40802.810.2.40000440327' },
    { id: 5, name: 'Банк', text: 'ПАО Сбербанк ' },
    { id: 6, name: 'БИК', text: '044525225' },
    { id: 7, name: 'К/с', text: '30101810400000000225' },
    { id: 8, name: 'Email', text: 'infoclient.com@gmail.com' },
];

function Contacts() {
    return (
        <div className={cls.contacts}>
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Контакты</h1>
                    </div>
                    <div className={cls.title}>Наши реквизиты</div>
                    <div className={cls.infoPack}>
                        <div className={cls.coverList}>
                            {array?.length &&
                                array.map((item) => (
                                    <div
                                        className={cls.contactsBlock}
                                        key={item.id}
                                    >
                                        <div className={cls.first}>
                                            {item.name}
                                        </div>
                                        <div className={cls.second}>
                                            {item.text}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <ConstactUs />
                </div>
            </div>
        </div>
    );
}

export default Contacts;
