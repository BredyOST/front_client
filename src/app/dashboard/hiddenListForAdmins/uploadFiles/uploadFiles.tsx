'Use client';
import {
    useAddNewFileMutation, useDeleteFileMutation,
    useGetFilesMutation,
} from "@/app/redux/entities/requestApi/requestApi";
import React, {FC} from 'react';
import cls from './uploadFiles.module.scss'
import {classNames} from "@/app/components/shared/lib/classNames/className";
import {Button} from "@/app/components/shared/ui/Button/Button";
import {parseCookies} from "nookies";

interface uploadFilesProps {
    classname?: string;
}

const UploadFiles:FC<uploadFilesProps> = (props) => {

    const { classname } = props;
    const cookies = parseCookies();


    //RTK
    const [createFile, {data: requestFile, error:errorrFile, isLoading: isLoadingFile, isError:isErrorFile}] = useAddNewFileMutation()
    const [addFiles, {data: requestAddFiles, error:errorrAddFiles, isLoading: isLoadingAddFiles, isError:isErrorAddFiles}] = useGetFilesMutation()
    const [deleteFile, {data: requestDeleteFile, error:errorrDeleteFile, isLoading: isLoadingDeleteFile, isError:isErrorDeleteFile}] = useDeleteFileMutation()

    //ACTIONS FROM REDUX
    
    //STATES FROM REDUX
    const [fileList, setFileList] = React.useState<any>([])
    
    //USESTATE
    
    //USEREF
    
    //FUNCTIONS

    const handleFileChange = (e:any) => {
        const file = e.target.files[0];
        setFileList(file);
    };

    const handleSubmit = async () => {
        if (fileList) {
            const formData = new FormData();
            formData.append('file', fileList);
            createFile(formData)
        }
    };

    const deleteThisFile = (dto:any) => {
        deleteFile(dto)
    }

    React.useEffect(
        () => {
            if(cookies  && cookies._z) {
                addFiles(cookies)
            }

        },[]
    )

    return (
        <div className={classNames(cls.uploadFiles, {},[classname] )} >
            <h2 className={cls.mainTitle}>Загрузить файлы</h2>
            <div className={cls.section}>
                <div className={cls.cover}>
                    <input className={cls.input} type="file" onChange={handleFileChange} />
                    <div>
                        <button
                            className={cls.btn}
                            onClick={handleSubmit}>Загрузить
                        </button>
                    </div>
                    <div className={cls.coverImageMain}>
                        {requestAddFiles != undefined && requestAddFiles && requestAddFiles.map((item:any) => (
                            <div
                                key={item.id}
                                className={cls.coverImage}>
                                <img className={cls.image} src={`${process.env['NEXT_PUBLIC_API_URL']}/uploads/${item.filename}`} alt=""/>
                                <div>{item.filename}</div>
                                <Button
                                    onClick = {() => deleteThisFile(item)}
                                    classname={cls.btn}
                                >удалить</Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3>Файлы</h3>
                    
                </div>

            </div>
        </div>
    );
};

export default UploadFiles;