import { LayoutStyled } from "@/modules/common/styles";
import {
  getAllParcels,
  useGetAllParcelsQuery,
} from "@/redux/services/parcel.service";
import { setParcels, userType } from "@/redux/slices/auth.slice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { io } from "socket.io-client";

interface Props {
  children: React.ReactNode;
}

export enum EVENTS_TYPES {
  PARCEL_CREATED = "parcelCreation",
  PARCEL_UPDATED = "parcelUpdate",
  ORDER_CREATED = "orderCreation",
  ORDER_UPDATED = "orderUpdate",
}

export const Layout = (props: Props) => {
  const { children } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [getAllParcelsQuery] = getAllParcels.useLazyQuery();
  const { accessToken, user } = useAppSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (!accessToken || user?.type !== userType.SENDER) {
      router.push("/");
    }
  }, [accessToken, user?.type]);

  useEffect(() => {
    const updateParcels = async () => {
      try {
        const { data: parcelsData, error } = await getAllParcelsQuery();
        if (error) throw error;
        dispatch(setParcels({ parcels: parcelsData || [] }));
      } catch (error: any) {
        enqueueSnackbar(
          error.message || error?.data?.message || "Something went wrong!",
          {
            variant: "error",
          }
        );
      }
    };
    const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
      withCredentials: true,
      transports: ["websocket", "polling"],
      autoConnect: true,
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    socket.connect();
    socket.on(EVENTS_TYPES.PARCEL_UPDATED, async ({ to, order }: any) => {
      if (to === user?.id) {
        enqueueSnackbar(`Your parcel ${order.parcelId} has been picked Up!`, {
          variant: "info",
        });

        updateParcels();
      }
    });

    socket.on(EVENTS_TYPES.ORDER_UPDATED, async ({ to, order }: any) => {
      if (to === user?.id) {
        enqueueSnackbar(`Your Parcel ${order.parcelId} has Delivered!`, {
          variant: "info",
        });

        updateParcels();
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return <LayoutStyled>{children}</LayoutStyled>;
};
