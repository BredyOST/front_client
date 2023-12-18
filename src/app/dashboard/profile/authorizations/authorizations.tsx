'use client';
import React, {FC} from 'react';
import cls from './authorization.module.scss'
import { useGetAuthorizationsMutation} from "@/app/redux/entities/requestApi/requestApi";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {getThisCookie} from "@/app/components/shared/lib/cookie/cookie";
import Loader from "@/app/components/shared/ui/Loader/Loader";
import InputCategory from "@/app/dashboard/hiddenListForAdmins/inputCategory/inputCategory";

interface authorizationsProps {
    classname?: string;
}

const Authorizations:FC<authorizationsProps> = (props) => {
    const { classname } = props;
    const cookies = getThisCookie();

    //RTK
    const [changeRequestEmail, {
        data: requestAuthorizations, error: errorAuthorizations, isError: isErrorAuthorizations,  isLoading: isLoadingAuthorizations,
    }] =  useGetAuthorizationsMutation()


    //ACTIONS FROM REDUX
    
    //STATES FROM REDUX
    const [showHistory, setShowHistory] =React.useState<boolean>(false)
    //USESTATE
    
    //USEREF
    
    //FUNCTIONS
    // для отображения и скрытия истории входа пользователя
    const ChangeStateShowHistory = () => {
        setShowHistory(prevState => !prevState)

        if ( !showHistory && cookies && cookies._z) {
            changeRequestEmail(cookies)
        }
        // console.log(showHistory)
    }
    React.useEffect(
        () => {
            console.log(requestAuthorizations)
        }, [requestAuthorizations]
    )
    React.useEffect(
        () => {
            console.log(showHistory)
        }, [showHistory]
    )

    
    return (
           <>
               <h3 className={cls.subTitle}>История входа в учетную запись</h3>
               <div>
                   <Button
                       classname={cls.btn}
                       onClick = {ChangeStateShowHistory}
                   >
                       {showHistory ? `Скрыть историю` : `Показать историю`}
                   </Button>
               </div>
               {showHistory &&
                   <div className={cls.mainBlock}>
                       <div className={cls.titles}>
                           <div className={cls.head}>№</div>
                           <div className={cls.head}>дата</div>
                           <div className={cls.head}>email</div>
                           <div className={cls.head}>status</div>
                           <div className={cls.head}>ip</div>
                       </div>
                       <div className={cls.mainCover}>
                           {isLoadingAuthorizations
                               && (
                                   <Loader
                                       classname="color-dark"
                                   />
                               )}
                           {requestAuthorizations?.length  && requestAuthorizations.map((item:any, index:any) => (
                               <div key = {index} className={cls.listTwo}>
                                   <div className={cls.item}>{index}</div>
                                   <div className={cls.item}>{`${new Date(item.loginAt)}`}</div>
                                   <div className={cls.item}>{item.userMail}</div>
                                   <div className={cls.item}>{item.status ? 'вход' : 'выход'}</div>
                                   <div className={cls.item}>{item.clientIp}</div>
                               </div>
                           ))
                           }
                       </div>
                   </div>
               }

           </>
    );
};

export default Authorizations;
