import { ILoginForm, IRegisterationForm } from "@/modules/auth";
import { IParcel } from "@/modules/dashboard";
import { userType } from "@/redux/slices/auth.slice";
import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parcelApi = createApi({
  reducerPath: "parcelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json",
    },
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllParcels: builder.query<void, void>({
      query: () => "parcels",
    }),
    createParcel: builder.mutation({
      query: (parcelForm: IParcel) => ({
        url: `parcels`,
        method: "POST",
        body: JSON.stringify(parcelForm),
      }),
    }),
  }),
});

export const { useCreateParcelMutation } = parcelApi;
export const {} = parcelApi.endpoints;
