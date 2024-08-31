'use client';
import React, {FC} from 'react';
import cls from './pictures.module.scss'

interface picturesProps {
    classname?: string;
    pictures:any
}

export const Pictures:FC<picturesProps> = (props) => {
    const {
        classname,
        pictures
    } = props;

    const [expandedImage, setExpandedImage] = React.useState<string | null>(null);
    const handleClick = (src: string) => {
        setExpandedImage(src);
    };

    const handleClose = () => {
        setExpandedImage(null);
    };

    return (
        <div className={pictures ? `${classname} ${cls.coverFeedback}` : cls.coverFeedback}>
            {pictures?.length > 0 && pictures.map((item: any) => (
                <div
                    key={item.id}
                    className={cls.ibg}
                    onClick={() => handleClick(`${process.env['NEXT_PUBLIC_API_URL']}/uploads/${item.originalName}`)}
                >
                    <img
                        src={`${process.env['NEXT_PUBLIC_API_URL']}/uploads/${item.originalName}`}
                        alt="картинка"
                    />
                </div>
            ))}
            {expandedImage && (
                <div className={cls.expandedImageOverlay} onClick={handleClose}>
                    <img src={expandedImage} alt="expanded" className={cls.expandedImage} />
                </div>
            )}
        </div>
    );
};

export default Pictures;