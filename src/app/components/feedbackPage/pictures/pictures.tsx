'use client';
import React from 'react';
import cls from './pictures.module.scss'
import {TypeForFunc} from "@/app/types/types";
import {PicturesType} from "@/app/types/pageTypes/feedBackTypes";

export interface PicturesProps {
    pictures:any
}

export const Pictures= ({pictures}:PicturesProps) => {

    const [expandedImage, setExpandedImage] = React.useState<string | null>(null);
    const openPictures:TypeForFunc<string, void> = (src) => {
        setExpandedImage(src);
    };

    const closePictures:TypeForFunc<void, void> = () => {
        setExpandedImage(null);
    };

    return (
        <div className={cls.coverFeedback}>
            {pictures?.length > 0 && pictures.map((item: PicturesType) => (
                <div
                    key={item.id}
                    className={cls.ibg}
                    onClick={() => openPictures(`${process.env['NEXT_PUBLIC_API_URL']}/uploads/${item.originalName}`)}
                >
                    <img
                        src={`${process.env['NEXT_PUBLIC_API_URL']}/uploads/${item.originalName}`}
                        alt="картинка"
                    />
                </div>
            ))}
            {expandedImage && (
                <div
                    className={cls.expandedImageOverlay}
                    onClick={closePictures}
                >
                    <img src={expandedImage} alt="expanded" className={cls.expandedImage} />
                </div>
            )}
        </div>
    );
};

export default Pictures;