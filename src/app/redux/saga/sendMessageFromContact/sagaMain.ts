import {all, call, put, takeLatest} from 'redux-saga/effects';
import {SEND_MESSAGE_REQUEST, sendMessageFailure, sendMessageSuccess} from "@/app/redux/saga/sendMessageFromContact/sagaApi";
import axios, {AxiosResponse} from "axios";
import {parseCookies} from "nookies";

// Интерфейс экшена
interface SendMessageAction {
    type: typeof SEND_MESSAGE_REQUEST;
    payload: {
        message: string;
        userId: number;
    };
}

// Сага для отправки сообщения
function* sendMessageSaga(action: SendMessageAction): Generator<any, void, AxiosResponse<any>> {
    try {
        const cookies = parseCookies();
        const sessionToken = cookies._a;

        const data: AxiosResponse<any> = yield call(
            axios.post,
            `${process.env['NEXT_PUBLIC_API_URL']}/users/sendMessage`,
            action.payload,
            {
                headers: {
                    Authorization: `Bearer ${cookies._z}`,
                    'session-token': `${cookies._a}`,
                    'Accept': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache',
                    'Expires': '0',
                }
            }
        );

        console.log(data);

        if (data) {
            yield put(sendMessageSuccess(data.data.text)); // Сохраняем только сериализуемые данные
        } else {
            throw new Error("No data received");
        }
    } catch (error: any) {
        console.log(error);
        yield put(sendMessageFailure(error.message)); // В случае ошибки диспатчим FAILURE экшен
    }
}

// Watcher saga
function* watchSendMessage() {
    yield takeLatest(SEND_MESSAGE_REQUEST, sendMessageSaga); // Слушаем SEND_MESSAGE_REQUEST экшен
}

// Root saga
export default function* rootSaga() {
    yield all([watchSendMessage()]);
}
