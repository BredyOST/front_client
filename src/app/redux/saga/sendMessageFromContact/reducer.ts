import {SEND_MESSAGE_FAILURE, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS} from "@/app/redux/saga/sendMessageFromContact/sagaApi";

const initialState = {
    data: null,
    error: null,
    isLoading: false,
    isError: false,
};

export const messageReducer = (state = initialState, action:any) => {
    switch (action.type) {
    case SEND_MESSAGE_REQUEST:
        return { ...state, isLoading: true, isError: false, error: null };
    case SEND_MESSAGE_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };
    case SEND_MESSAGE_FAILURE:
        return { ...state, isLoading: false, isError: true, error: action.payload };
    default:
        return state;
    }
};

export default messageReducer;
