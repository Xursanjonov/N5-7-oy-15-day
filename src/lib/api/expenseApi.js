import { api } from "./index"

export const expenseApi = api.injectEndpoints({
    endpoints: (build) => ({
        getExpense: build.query({
            query: (params) => ({
                url: '/get/expense',
                params
            }),
            providesTags: ["Expenses"]
        }),
        postExpense: build.mutation({
            query: (body) => ({
                url: '/create/expense',
                method: "POST",
                body
            }),
            invalidatesTags: ["Expenses"]
        }),
        patchExpense: build.mutation({
            query: (params) => ({
                url: '/get/expense',
                method: "PATCH",
                params
            }),
            invalidatesTags: ["Expenses"]
        }),
        removeExpense: build.mutation({
            query: (params) => ({
                url: '/delete/expense',
                method: "DELETE",
                params
            }),
            invalidatesTags: ["Expenses"]
        }),
    })
})

export const { usePostExpenseMutation, useGetExpenseQuery, usePatchExpenseMutation, useRemoveExpenseMutation } = expenseApi