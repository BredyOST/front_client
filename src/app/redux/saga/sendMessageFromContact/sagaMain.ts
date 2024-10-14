import {all, call, put, takeLatest} from 'redux-saga/effects';
import {SEND_MESSAGE_REQUEST, sendMessageFailure, sendMessageSuccess} from "@/app/redux/saga/sendMessageFromContact/sagaApi";
import {requestApi} from "@/app/redux/entities/requestApi/requestApi";
import axios from "axios";
import {parseCookies} from "nookies";

// Сага для отправки сообщения через RTK Query
function* sendMessageSaga(action: any) {
    try {
        const cookies = parseCookies()
        const sessionToken = cookies._a

        // Используем RTK Query endpoint для отправки сообщения
        // const { data } = yield call(requestApi.endpoints.sendMassage.initiate, action.payload);
        const data = yield call (axios.post,`${process.env['NEXT_PUBLIC_API_URL']}/users/sendMessage`,  action.payload, {
            headers: {
                Authorization: `Bearer ${cookies._z}`,
                'session-token': `${cookies._a}`,
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            }
        })
        console.log(data)

        if (data) {
            yield put(sendMessageSuccess(data.text)); // Сохраняем только сериализуемые данные
        } else {
            throw new Error("No data received");
        }
    } catch (error) {
        console.log(error)
        yield put(sendMessageFailure(error)); // В случае ошибки диспатчим FAILURE экшен
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
