import React from 'react';
import cls from './contacts.module.scss';
import ContactUs from '@/app/components/contactPage/constactUs/constactUs';
import {CONTACT_PAGE_TITLE} from "@/app/utils/index.constants";
import {InfoType} from "@/app/types/types";
import {Info} from "@/app/dashboard/contacts/constants/contactPageConst";

export const metadata = {
    title: 'Контакты - клиенты.com',
    description: 'Контакты',
};

function Contacts () {
    return (
        <div className={cls.contacts}>
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>{CONTACT_PAGE_TITLE}</h1>
                    </div>
                    <div className={cls.title}>Наши реквизиты</div>
                    <div className={cls.infoPack}>
                        <div className={cls.coverList}>
                            {Info?.length && 
                                Info?.map((item:InfoType) => (
                                    <div
                                        className={cls.contactsBlock}
                                        key={item.id}
                                    >
                                        <div className={cls.first}>{item?.name ?? 'информация отсутствует'}</div>
                                        <div className={cls.second}>{item?.text ?? 'информация отсутствует'}</div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <ContactUs />
                </div>
            </div>
        </div>
    );
}

export default Contacts;