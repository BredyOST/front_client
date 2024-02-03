import React from 'react';
import cls from './feedback.module.scss'
import Pictures from "@/app/dashboard/feedback/pictures/pictures";


export const metadata = {
    title: 'Price',
    description: 'Отзывы клиентов',
}


interface feedBackProps {

}

async function getData() {

    let feedback;

    try {
        const feedbackRes = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/files/getAllStart`, { next: { revalidate: 500 } })
        if (feedbackRes.ok) {
            feedback = await feedbackRes.json();
        } else {
            console.error('feedbackRes feed API request failed with status:', feedbackRes.status);
        }
    } catch (err) {
        console.error('save error Redis:', err);
    }
    return {feedback};
}

async function Feedback (props:feedBackProps) {
    const {  } = props;

    const { feedback} = await getData();

    //ACTIONS FROM REDUX

    //STATES FROM REDUX

    //USESTATE

    //USEREF

    //FUNCTIONS
    // const nextImages = feedback?.filter((item) => item.originalName.includes('2.'))
    const nextImages = feedback?.filter((item:any) => /\b2\.\d/.test(item.originalName));

    return (
        <div className={cls.feedback}>
            <div className={'page__container'}>
                <div className={cls.cover}>
                    <div className={cls.section}>
                        <h1 className={cls.mainTitle}>Отзывы</h1>
                    </div>
                    <Pictures pictures={nextImages}></Pictures>
                </div>
            </div>
        </div>
    );
};

export default Feedback;
