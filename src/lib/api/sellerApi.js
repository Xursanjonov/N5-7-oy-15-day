import { api } from './index'

export const sellerApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSeller: build.query({
            query: (params) => ({
                url: '/get/sellers',
                params
            }),
            providesTags: ["Sellers"]
        }),
        getSellerById: build.query({
            query: (id) => ({
                url: `/seller/${id}`
            }),
            invalidatesTags: ["Sellers"]
        }),
        createSeller: build.mutation({
            query: (body) => ({
                url: "/create/seller",
                method: "POST",
                body
            }),
            invalidatesTags: ["Sellers"]
        }),
        updateSeller: build.mutation({
            query: ({ id, body }) => ({
                url: `/update/seller/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Sellers"]
        }),
        removeSeller: build.mutation({
            query: (id) => ({
                url: `/delete/seller/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Sellers"]
        })
    }),
})

export const {
    useGetSellerQuery,
    useCreateSellerMutation,
    useGetSellerByIdQuery,
    useUpdateSellerMutation,
    useRemoveSellerMutation
} = sellerApi