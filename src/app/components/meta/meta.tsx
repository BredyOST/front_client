// 'use client';
// import React, {FC} from 'react';
// import Head from "next/head";
// import {siteName, titleMerge} from "@/app/components/config/seo.config";
// import {onlyText} from "@/app/components/shared/lib/clearText/clearText";
// import {usePathname} from "next/navigation";
//
//
// interface metaProps {
//     classname?: string;
//     title:string
//     description?:string
//     children:any
//     image?:any
// }
//
//
//
// export const Meta:FC<metaProps> = (props) => {
//     const {
//         classname,
//         title,
//         description,
//         children,
//         image,
//     } = props;
//
//     const asPath = usePathname()
//     console.log(asPath)
//     const currentUrl = `${process.env["API_URL"]}${asPath} `;
//
//     return (
//         <>
//             <Head>
//                 <title itemProp='headline'>{titleMerge(title)}</title>
//                 {description ? (
//                     <>
//                         <meta
//                             itemProp='description'
//                             name='description'
//                             content={onlyText(description, 152)}
//                         />
//                         <link rel='canonical' href={currentUrl} />
//                         <meta property='og:locale' content='ru'/>
//                         <meta property='og:title' content={titleMerge(title)}/>
//                         <meta property='og:url' content={currentUrl}/>
//                         <meta property='og:image' content={image}/>
//                         <meta property='og:site_name' content={siteName}/>
//                         <meta property='og:description' content={onlyText(description, 197)}/>
//                     </>
//                 ) : <meta name='robots' content='noindex, nofollow'/>
//                 }
//             </Head>
//             {children}
//         </>
//     );
// };
//
