'use client';
import React, {FC} from 'react';
import cls from './pictures.module.scss'
import {PicturesType, TypeForFunc} from "@/shared/types/types";
import {PicturesProps} from "@/shared/types/types";
import {Button} from "@/ui/Button/Button";

export const Pictures= ({pictures}:PicturesProps) => {

    const [expandedImage, setExpandedImage] = React.useState<string | null>(null);
    const openPictures:TypeForFunc<string, void> = (src: string) => {
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