import { apiSlice } from "../api/apiSlice";
import { useRegistration, userLoggedIn, userLoggedOut } from "./authSlice";



type RegistrationResponse = {
    data: any;
    message: string;
    activationToken: string
}

type RegistrationData = {};


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registration: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data,
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result?.data?.data?.activationToken);
                    dispatch(
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useRegistration({
                            token: result?.data?.data?.activationToken
                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: "/users/active-user",
                method: "POST",
                body: {
                    activation_token, activation_code
                }
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: "/users/login",
                method: "POST",
                body: {
                    email,
                    password
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        userLoggedIn({
                            accessToken: result.data.data.accessToken,
                            user: result.data.data.user
                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }

        }),
        logoutUser: builder.mutation({
            query: ({ }) => ({
                url: "/users/logout",
                method: "POST",
                body: {},
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // console.log(result);
                    dispatch(
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        userLoggedOut()
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        }),
        userUpdate: builder.mutation({
            query: ({ discordUsername, address }) => ({
                url: "/users/update-user",
                method: "PATCH",
                body: { discordUsername, address },
                credentials: "include" as const
            })
        }),
        changePassword: builder.mutation({
            query: ({ oldPassword, newPassword }) => ({
                url: "/users/change-password",
                method: "POST",
                body: {
                    oldPassword,
                    newPassword
                },
                credentials: "include" as const
            }),
        }),
        updateAvatar: builder.mutation({
            query: (data) => ({
                url: "/users/update-avatar",
                method: "PATCH",
                body: data,
                credentials: "include" as const
            })
        })

    })
})


export const { useRegistrationMutation, useActivationMutation, useLoginMutation, useLogoutUserMutation, useUserUpdateMutation, useChangePasswordMutation, useUpdateAvatarMutation } = authApi


