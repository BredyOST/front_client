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
    title: `${process.env['NEXT_PUBLIC_TITLE_WEBSITE']}`,
    description: 'Cервис для поиска клиентов в социальных сетях, блогах, чатах, форумах, досках объявлений, фриланс-биржах: ВКонтакте, Telegram, Facebook, Одноклассники, Instagram, Twitter, ЖЖ и др.',
    keywords: 'клиент, клиенты.com, клиенты ком, клиенты.ком,  ' +
        'поиск лидов, поиск клиентов, лидогенерация, найти клиента, мониторинг соцсетей, мониторинг телеграм, ' +
        'мониторинг вк, отслеживание групп в соцсетях, поиск учеников, реклама, таргетированная реклама, таргет' +
        'услуги по поиску клиентов, агентские услуги по поиску клиентов, сервис поиска клиентов, где взять клиентов' +
        'найду клиента, как найти клиентов, где найти клиентов, рекламное агентство, ищу заявки, клиенты для бизнеса, профи ру, авито' +
        'где искать учеников, ученики ищущие репетитора, где искать учеников на репетиторство, продвижение это, реклама в интернете заказать, рекламная компания это, заказать рекламу, заказать контекстную рекламу',
    metadataBase: new URL(`${process.env['NEXT_PUBLIC_CLIENT_URL']}`),
    openGraph: {
        locale:'ru',
        title: 'клиенты.com - сервис для поиска клиентов',
        url:'https://xn--e1affem4a4d.com/dashboard/price',
        description: 'Сервис для поиска клиентов',
        images:'',
        siteName:'клиенты.com'

    },
    verification: {
        google: '-KRwk54Zal4rSi8KZbKSo2TEbW6lGJoTEHk2j06d5Yg',
        yandex: "03b4f00fa69070a5",
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
