import { apiSlice } from "../api/apiSlice"
import { setCredentials, logout } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        // Login
        login: builder.mutation({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials
            })
        }),

        // Register
        register: builder.mutation({
            query: (data) => ({
                url: "/users/register",
                method: "POST",
                body: data
            })
        }),

        // Logout
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST"
            })
        }),

    })
})

export const { 
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation
} = authApiSlice