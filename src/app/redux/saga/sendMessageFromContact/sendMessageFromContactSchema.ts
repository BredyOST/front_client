import {UserAuthorization} from "@/app/redux/entities/auth/authSchema";

export interface SendMessageFromContactReducerType {
    data: UserAuthorization | null,
    error: null,
    isLoading: false,
    isError: false,
}