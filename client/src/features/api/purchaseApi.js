import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://127.0.0.1:3001/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // ✅ Purchase a Course (Without Stripe)
    purchaseCourse: builder.mutation({
      query: (courseId) => ({
        url: "/purchase",
        method: "POST",
        body: { courseId },
      }),
    }),
    
    // ✅ Get Course Details & Check if Purchased
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // ✅ Get All Purchased Courses
    getPurchasedCourses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePurchaseCourseMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
} = purchaseApi;
