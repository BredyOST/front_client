import {all, call, put, takeLatest} from 'redux-saga/effects';
import {requestApi} from "@/app/redux/entities/requestApi/requestApi"; // Экшены для обработки

// Action types
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

// Action creators
export const sendMessageRequest = (messageInfo:any) => ({
    type: SEND_MESSAGE_REQUEST,
    payload: messageInfo,
});

export const sendMessageSuccess = (response:any) => ({
    type: SEND_MESSAGE_SUCCESS,
    payload: response,
});

export const sendMessageFailure = (error:any) => ({
    type: SEND_MESSAGE_FAILURE,
    payload: error,
});
