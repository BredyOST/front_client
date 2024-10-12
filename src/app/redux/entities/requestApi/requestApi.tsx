import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {authSliceActions} from "@/app/redux/entities/auth/authSlice";
import {indicatorsNotifications} from "@/app/redux/entities/notifications/notificationsSlice";

interface RefreshResultData {
    sessionToken:string
    refreshToken: string;
    accessToken: string;
}

const {addInfoForCommonRequest, addInfoForCommonError} = indicatorsNotifications;

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: `${process.env['NEXT_PUBLIC_API_URL']}`,
    prepareHeaders: async (headers:any) => {
        const cookies = parseCookies()
        if (cookies) headers.set('authorization', `Bearer ${cookies._z}`);
        const sessionToken = cookies._a;
        if (sessionToken) headers.set('session-token', cookies._a);

        headers.set('Accept', 'application/json')
        headers.set('Cache-Control', 'no-cache')
        headers.set('Pragma', 'no-cache')
        headers.set('Expires', '0')
        return headers;
    }
})

const {LogOutFromProfile, addMainAdminRole, addAdminRole, addAuthStatus} =  authSliceActions;

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {

    let result = await baseQueryWithAuth(args, api, extraOptions)

    // if your session has ended, maybe somebody has entered in other browser with your account, or session token's time is out.
    if (result && result.data && typeof result.data === 'object' && 'text' in result.data && result.data.text=== 'Ваша сессия истекла, выполните повторный вход') {
        api.dispatch(addInfoForCommonRequest({text: result.data.text}))
        destroyCookie(null, "_z", {path:'/'});
        destroyCookie(null, "_d", {path:'/'});
        destroyCookie(null, "_a", {path:'/'});
        api.dispatch(LogOutFromProfile(null));
        api.dispatch(addMainAdminRole(false));
        api.dispatch(addAdminRole(false));
        api.dispatch(addAuthStatus(false));
        // location.reload()
    }
    //Unauthorized - token insighnificant, update token.

    if (result.error && result.error.data && typeof result.error.data === 'object' && 'message' in result.error.data && typeof result.error.data.message === 'string' && result.error.data.message === 'Unauthorized') {

        const cookies = parseCookies()
        // request  to get new tokens (access and session), send refresh token
        const refreshResult = await baseQueryWithAuth(
            { url: `/auth/login/access-token`, method: 'POST', body:{refreshToken:cookies._d} },
            api,
            extraOptions
        ) as {data: RefreshResultData}
        // save new tokens in cookie
        if (refreshResult && refreshResult.data && refreshResult.data.refreshToken && refreshResult.data.accessToken) {
            const refeshTokenResult = refreshResult as any

            setCookie(null, '_d', refeshTokenResult.data.refreshToken, {
                path:'/'
            })
            setCookie(null, '_z', refeshTokenResult.data.accessToken, {
                path:'/'
            })
            setCookie(null, '_a', refeshTokenResult.data.sessionToken, {
                path:'/'
            })
            // repeat last request
            result = await baseQueryWithAuth(args, api, extraOptions)
        } else {
            //if no tokken or invalid, clean cookie
            destroyCookie(null, "_z", {path:'/'});
            destroyCookie(null, "_d", {path:'/'});
            destroyCookie(null, "_a", {path:'/'});
            api.dispatch(LogOutFromProfile(null));
            api.dispatch(addMainAdminRole(false));
            api.dispatch(addAdminRole(false));
            api.dispatch(addAuthStatus(false));
            location.reload()
        }
    }

    // error = show this in browser
    if (result && result.error && typeof result.error?.data === 'object' && result.error.data && 'message' in result.error.data && result.error.data.message !== 'Unauthorized') {

        api.dispatch(addInfoForCommonError({message: `${result.error.data.message}`}))
    }
    // message = show this in browser
    if (result && result.data && typeof result.data === 'object' && 'text' in result.data && result.data.text ) {
        api.dispatch(addInfoForCommonRequest({text: `${result.data.text}`}))
    }

    return result
}

export const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['request'],
    endpoints: (builder) => ({
        registerUser: builder.mutation<any, any>({
            query: (params) => ({
                url: '/auth/register',
                method: 'POST',
                body: params,
            }),
        }),
        loginIn: builder.mutation<any, any>({
            query: (params) => ({
                url: '/auth/login',
                method: 'POST',
                body: params,
            }),
        }),
        repeatActivation:builder.mutation({
            query:(params) => ({
                url: '/auth/activateRepeat',
                method:'POST',
                body:params,
            }),
        }),
        changePassword:builder.mutation({
            query:(params) => ({
                url: '/auth/forgetPassword',
                method:'POST',
                body:params,
            }),
        }),
        getNewToken: builder.mutation<any, any>({
            query: (params) => ({
                url: `/auth/login/access-token`,
                method: 'POST',
                body: params,
            }),
        }),
        getMe:builder.mutation({
            query:(token) => ({
                url: '/users/profile',
                method:'GET'
            }),
        }),
        sendMassage:builder.mutation({
            query: (params) => ({
                url: '/users/sendMessage',
                method: 'POST',
                body: params,
            }),
        }),
        changeNameAndCard: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/update/fullName',
                method: 'PATCH',
                body: params,
            }),
        }),
        codeForEmail: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/update/codeEmail',
                method: 'POST',
                body: params,
            }),
        }),
        changeEmail: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/update/email',
                method: 'PATCH',
                body: params,
            }),
        }),
        changePhone: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/update/phone',
                method: 'PATCH',
                body: params,
            }),
        }),
        getPhoneCodeTg: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/update/phoneCodeTg',
                method: 'PATCH',
                body: params,
            }),
        }),
        activateTgProfile: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/activateTgProfile',
                method: 'POST',
                body: params,
            }),
        }),
        changePasswordInProfile: builder.mutation<any, any>({
            query: (params) => ({
                url: '/users/update/password',
                method: 'PATCH',
                body: params,
            }),
        }),
        call: builder.mutation<any, any>({
            query: (params) => ({
                url: `/users/call`,
                method: 'POST',
                body: params,
            }),
        }),
        callCode: builder.mutation<any, any>({
            query: (params) => ({
                url: `/users/call/code`,
                method: 'POST',
                body: params,
            }),
        }),
        verifyTg: builder.mutation<any, any>({
            query: (params) => ({
                url: `/users/sendTg`,
                method: 'POST',
                body: params,
            }),
        }),
        activateTg: builder.mutation<any, any>({
            query: (params) => ({
                url: `/users/numberTgActivate`,
                method: 'POST',
                body: params,
            }),
        }),
        numberTgForgetPassword: builder.mutation<any, any>({
            query: (params) => ({
                url: `/users/numberTgForgetPassword`,
                method: 'POST',
                body: params,
            }),
        }),
        giveInfo: builder.mutation<any, any>({
            query: (params) => ({
                url: `/users/giveInfo`,
                method: 'POST',
                body: params,
            }),
        }),
        createCategory: builder.mutation<any, any>({
            query: (params) => ({
                url: '/categories/create',
                method: 'POST',
                body: params,
            }),
        }),
        updateCategory: builder.mutation<any, any>({
            query: (params) => ({
                url: '/categories/update',
                method: 'PATCH',
                body: params,
            }),
        }),
        deleteCategory: builder.mutation<any, any>({
            query: (params) => ({
                url: '/categories/delete',
                method: 'DELETE',
                body: params,
            }),
        }),
        getCategories: builder.mutation<any, any>({
            query: () => ({
                url: '/categories/getAll',
                method: 'GET',
            }),
        }),
        getCategory: builder.mutation<any, any>({
            query: (token) => ({
                url: '/categories/getOne',
                method: 'GET',
            }),
        }),
        payment: builder.mutation<any, any>({
            query: (params) => ({
                url: '/categories/payment',
                method: 'POST',
                body: params,
            }),
        }),
        getFreePeriod: builder.mutation<any, any>({
            query: (params) => ({
                url: '/categories/freePeriod',
                method: 'POST',
                body: params,
            }),
        }),
        getFreePeriodNotification: builder.mutation<any, any>({
            query: (params) => ({
                url: '/categories/freePeriodNotification',
                method: 'POST',
                body: params,
            }),
        }),
        addGroup: builder.mutation<any, any>({
            query: (params) => ({
                url: `/groups-from-vk/create`,
                method: 'POST',
                body: params,
            }),
        }),
        getGroups: builder.mutation<any, any>({
            query: (token) => ({
                url: `/groups-from-vk/getAll`,
                method: 'GET',
            }),
        }),
        updateGroup: builder.mutation<any, any>({
            query: (params) => ({
                url: `/groups-from-vk/update`,
                method: 'PATCH',
                body: params,
            }),
        }),
        deleteGroup: builder.mutation<any, any>({
            query: (params) => ({
                url: `/chats-from-telegram/delete`,
                method: 'DELETE',
                body: params,
            }),
        }),
        addChat: builder.mutation<any, any>({
            query: (params) => ({
                url: `/chats-from-telegram/create`,
                method: 'POST',
                body: params,
            }),
        }),
        getChat: builder.mutation<any, any>({
            query: (token) => ({
                url: `/chats-from-telegram/getAll`,
                method: 'GET',
            }),
        }),
        updateChat: builder.mutation<any, any>({
            query: (params) => ({
                url: `/chats-from-telegram/update`,
                method: 'PATCH',
                body: params,
            }),
        }),
        deleteChat: builder.mutation<any, any>({
            query: (params) => ({
                url: `/chats-from-telegram/delete`,
                method: 'DELETE',
                body: params,
            }),
        }),

        createAndCheckAllPosts: builder.mutation<any, any>({
            query: (token) => ({
                url: `/posts/createAndCheck`,
                method: 'GET',
            }),
        }),
        getAllPosts: builder.mutation<any, any>({
            query: (token) => ({
                url: `/posts/getAll`,
                method: 'GET',
            }),
        }),
        startAddTutorsPosts: builder.mutation<any, any>({
            query: (token) => ({
                url: `/posts/addPostsToTutors`,
                method: 'GET',
            }),
        }),
        deleteAllPostsFromMainRepository: builder.mutation<any, any>({
            query: (token) => ({
                url: `/posts/deleteAll`,
                method: 'DELETE',
            }),
        }),
        deleteGroupInMainRepository: builder.mutation<any, any>({
            query: (params) => ({
                url: `/posts/deleteGroup`,
                method: 'DELETE',
                body: params,
            }),
        }),

        getTutorsPosts:builder.mutation({
            query:(token) => ({
                url: '/tutors/all',
                method:'GET',
            }),
        }),
        getNanniesPosts:builder.mutation({
            query:(token) => ({
                url: '/nannies/all',
                method:'GET',
            }),
        }),
        addNewFile:builder.mutation({
            query:(params) => ({
                url: '/files',
                method:'POST',
                body: params,
                headers: {
                    'Custom-Header': 'multipart/form-data',
                },
            }),
        }),
        getFiles:builder.mutation({
            query:(token) => ({
                url: '/files/getAll',
                method:'GET',
            }),
        }),
        deleteFile: builder.mutation<any, any>({
            query: (params) => ({
                url: '/files/delete',
                method: 'DELETE',
                body: params,
            }),
        }),
        getLogs:builder.mutation({
            query:(token) => ({
                url: '/logs/info',
                method:'GET',
            }),
        }),
        getAuthorizations:builder.mutation({
            query:(token) => ({
                url: '/authorizations/getMyAuthorizations',
                method:'GET',
            }),
        }),
        addNewPriceBlock:builder.mutation({
            query:(params) => ({
                url: '/prices/create',
                method:'POST',
                body: params,
            }),
        }),
        getAllPrices:builder.mutation({
            query:() => ({
                url: '/prices/getAll',
                method:'GET',
            }),
        }),
        updatePrice: builder.mutation({
            query: (params) => ({
                url: `/prices/update`,
                method: 'PATCH',
                body: params,
            }),
        }),
        getALLTest:builder.mutation({
            query:(params) => ({
                url: '/posts/testAllPosts',
                method:'POST',
                body: params,
            }),
        }),
        getSortedPostsFromSearchPage:builder.mutation({
            query:(params) => ({
                url: '/getPostsFromAll/all',
                method:'POST',
                body: params,
            }),
        }),
        activateFreeNotification: builder.mutation({
            query: (params) => ({
                url: '/notifications/create',
                method: 'POST',
                body: params,
            }),
        }),
        payNotifications: builder.mutation({
            query: (params) => ({
                url: 'categories/notifications',
                method: 'POST',
                body: params,
            }),
        }),
        getAllKeysRedis:builder.mutation({
            query: (params) => ({
                url: '/posts-from-redis/redisKeys',
                method: 'POST',
                body: params,
            }),
        }),
        getPostsRedis:builder.mutation({
            query: (params) => ({
                url: '/posts-from-redis/getPostsRedis',
                method: 'POST',
                body: params,
            }),
        }),

    }),
});

export const {
    useLoginInMutation,
    useRegisterUserMutation,
    useGetMeMutation,
    useRepeatActivationMutation,
    useChangePasswordMutation,
    useChangeNameAndCardMutation,
    useCodeForEmailMutation,
    useChangeEmailMutation,
    useCallMutation,
    useChangePhoneMutation,
    useChangePasswordInProfileMutation,
    useCreateCategoryMutation,
    useGetCategoriesMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCallCodeMutation,
    useAddGroupMutation,
    useGetGroupsMutation,
    useDeleteGroupMutation,
    useUpdateGroupMutation,
    useCreateAndCheckAllPostsMutation,
    useGetAllPostsMutation,
    useStartAddTutorsPostsMutation,
    useDeleteAllPostsFromMainRepositoryMutation,
    useAddNewFileMutation,
    useGetFilesMutation,
    useDeleteFileMutation,
    useDeleteGroupInMainRepositoryMutation,
    useGetLogsMutation,
    useAddNewPriceBlockMutation,
    useGetAllPricesMutation,
    useGetFreePeriodMutation,
    useAddChatMutation,
    useGetChatMutation,
    useGetAllKeysRedisMutation,
    useGetPostsRedisMutation,
    useUpdatePriceMutation,
    useSendMassageMutation,
    usePaymentMutation,
    useVerifyTgMutation,
    useActivateTgMutation,
    useGetPhoneCodeTgMutation,
    useActivateTgProfileMutation,
    useGiveInfoMutation,
    useNumberTgForgetPasswordMutation
} = requestApi;