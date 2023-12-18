import './styles/index.scss'
import { Inter } from 'next/font/google'
import Header from "@/app/components/header/header";
import {classNames} from "@/app/components/shared/lib/classNames/className";
import Footer from "@/app/components/footer/footer";
import React from "react";
import ReduxProvider from "@/app/redux/provider/reduxProvider";
import {Metadata} from "next";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Клиенты.com',
    description: 'Cервис для поиска потенциальных клиентов в социальных сетях, блогах,чатах, форумах, досках объявлений, фриланс-биржах: ВКонтакте, Telegram, Facebook, Одноклассники, Instagram, Twitter, ЖЖ и др. Мы предлагаем готовый проект для поиска клиентов, поиска заказов',
    keywords: 'Клиенты, клиенты, Клиенты.com, клиенты.com, клиенты ком, клиенты.ком, Клиенты ком, Клиенты.ком,  ' +
        'поиск лидов, поиск клиентов, лидогенерация, найти клиента, мониторинг соцсетей, мониторинг телеграм, ' +
        'мониторинг вк, отслеживание групп в соцсетях, поиск учеников, реклама, таргетированная реклама, таргет' +
        'услуги по поиску клиентов, агентские услуги по поиску клиентов, сервис поиска клиентов, где взять клиентов' +
        'найду клиента, как найти клиентов, где найти клиентов, рекламное агентство, ищу заявки, клиенты для бизнеса, профи ру, авито' +
        'где искать учеников, ученики ищущие репетитора, где искать учеников на репетиторство, продвижение это, реклама в интернете заказать, рекламная компания это, заказать рекламу, заказать контекстную рекламу',
    metadataBase: new URL('https://клиенты'),
    openGraph: {
        locale:'ru',
        title: 'Acme',
        url:'https/sss',
        description: 'Acme is a...',
        image:'sss',
        siteName:'Клиенты.com'

    },
    verification: {
        google: 'google',
        yandex: 'yandex',
        yahoo: 'yahoo',
    }
}

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <ReduxProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Header/>
                    <div className={classNames('wrapper', {}, [])}>
                        {children}
                    </div>
                    <Footer/>
                </body>
            </html>
        </ReduxProvider>
    );
}
