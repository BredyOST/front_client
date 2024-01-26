import cls from './faq.module.scss';
import {classNames} from "@/app/components/shared/lib/classNames/className";
import ArraySvg from '../../components/svgs/arrow.svg'
import {Button} from "@/app/components/shared/ui/Button/Button";
import {FC} from "react";

interface faqProps {
}


const Faq:FC<faqProps> = (props) => {
    const {} = props;

    return (
        <div className={classNames(cls.faq, {},[] )} >
            <div className='page__container'>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>FAQ</h1>
                    </div>
                    <div className={cls.body}>
                        <div className={cls.question}>
                            <div className={cls.coverBtn}>
                                <Button
                                    classname={cls.btnOpen}
                                >
                                    <div className={cls.questionText}>Вопрос №1</div>
                                    <div className={cls.text}>Как воспользоваться бесплатным пробным периодом?</div>
                                    <ArraySvg className={cls.arrowSvg}/>
                                </Button>
                            </div>
                            <div className={cls.wrapper}>
                            </div>
                        </div>
                        <div className={cls.question}>
                            <div className={cls.coverBtn}>
                                <Button
                                    classname={cls.btnOpen}
                                >
                                    <div className={cls.questionText}>Вопрос №1</div>
                                    <div className={cls.text}>Как воспользоваться бесплатным пробным периодом?</div>
                                    <ArraySvg className={cls.arrowSvg}/>
                                </Button>
                            </div>
                            <div className={cls.wrapper}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Faq;