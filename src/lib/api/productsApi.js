import { api } from './index'

export const productsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: (params) => ({
                url: '/get/products',
                params
            }),
            providesTags: ["Products"]
        }),
        getProductsById: build.query({
            query: (id) => ({
                url: `/product/${id}`
            }),
            invalidatesTags: ["Products"]
        }),
        createProducts: build.mutation({
            query: ({ body }) => ({
                url: "/create/product",
                method: "POST",
                body
            }),
            invalidatesTags: ["Products"]
        }),
        updateProducts: build.mutation({
            query: ({ id, body }) => ({
                url: `/update/product/${id}`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ["Products"]
        }),
        removeProducts: build.mutation({
            query: (id) => ({
                url: `/delete/product/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"]
        })
    }),
})

export const {
    useGetProductsByIdQuery,
    useGetProductsQuery,
    useCreateProductsMutation,
    useUpdateProductsMutation,
    useRemoveProductsMutation
} = productsApi