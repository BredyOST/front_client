// import React, { FC } from 'react';
// import { classNames } from 'shared/lib/classNames/classNames';
// import { useTranslation } from 'react-i18next';
// import cls from './Spoiler.module.scss';
// import { ButtonHome } from '../../../widgets/ButtonHome/ui/ButtonHome';
// import { useAppSelector } from '../../hooks/redux';
// import ArrowSvg from '../../assets/icons/arrow.svg';
//
// interface SpoilerProps {
//     classname?: string;
//     title?:any,
//     children?:any,
//     indicator?:number
//     element?:any,
// }
//
// const MOBILE_WIDTH = 767.98;
//
// export const Spoiler:FC<SpoilerProps> = (props) => {
//     const {
//         classname,
//         title,
//         children,
//         indicator,
//         element,
//     } = props;
//
//     const { t } = useTranslation();
//
//     // indicators
//     const [activeSpoiler, setActiveSpoiler] = React.useState<number>(0);
//
//     // states
//     const { windowWidth } = useAppSelector((state) => state.indicatorsWindow);
//
//     const changeActiveSpoiler = (number:number) => {
//         if (windowWidth > MOBILE_WIDTH) {
//             return;
//         }
//         if (activeSpoiler === 1 && number === 1
//             || activeSpoiler === 2 && number === 2
//             || activeSpoiler === 3 && number === 3
//         ) {
//             setActiveSpoiler(0);
//             return;
//         }
//
//         setActiveSpoiler(number);
//     };
//
//     const checkSpoiler = element.id === activeSpoiler;
//
//     const mod = {
//         [cls.active]: checkSpoiler,
//     };
//
//     return (
//         <div className={classNames(cls.Spoiler, mod, [classname, cls[activeSpoiler]])}>
//             <div
//                 className={cls.item}
//                 onClick={() => changeActiveSpoiler(element.id)}
//             >
//                 <ButtonHome
//                     type="button"
//                     className={cls.btn}
//                 >
//                     {title}
//                     {windowWidth < MOBILE_WIDTH && indicator === 1 && <ArrowSvg className={cls.arrowSvg} /> }
//                 </ButtonHome>
//                 <div className={cls.body}>{children}</div>
//             </div>
//         </div>
//     );
// };
