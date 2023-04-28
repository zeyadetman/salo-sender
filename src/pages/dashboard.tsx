import { ActionDrawer } from "@/modules/common";
import {
  DashboardContainerStyled,
  EmptyParcelsContainerStyled,
  NewParcel,
  ParcelsListContainerStyled,
} from "@/modules/dashboard";
import { logout } from "@/redux/slices/auth.slice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { Button, Typography, Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

function User() {
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const [parcels, setParcels] = useState([1]); // TODO: Replace it with real data from the server & Redux
  const isParcelsEmpty = !parcels || parcels.length === 0;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(open);
    };

  const renderParcels = () => {
    if (isParcelsEmpty) {
      return (
        <EmptyParcelsContainerStyled>
          <Image
            src="/assets/empty-parcels.svg"
            alt="Empty"
            width="600"
            height="300"
          />
          <Box className="emptyStateText">
            <Typography variant="body1">
              You don&apos;t have any parcels yet.
            </Typography>
            <Button onClick={toggleDrawer(true)}>Create a new Parcel</Button>
          </Box>
        </EmptyParcelsContainerStyled>
      );
    }

    return (
      <Box component="ul">
        <Box component="li">Your Orders</Box>
        <Box component="li">Your Orders</Box>
        <Box component="li">Your Orders</Box>
        <Box component="li">Your Orders</Box>
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title>Parcels Managment</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <DashboardContainerStyled>
          <Typography variant="h3">Hi {user?.name},</Typography>

          <Box>
            <ParcelsListContainerStyled>
              <Typography variant="h4">Your Parcels</Typography>
              {!isParcelsEmpty ? (
                <Typography
                  variant="overline"
                  sx={{
                    textDecoration: "underline",
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={toggleDrawer(true)}
                >
                  Create a new Parcel
                </Typography>
              ) : null}
            </ParcelsListContainerStyled>

            {renderParcels()}
          </Box>
        </DashboardContainerStyled>
      </Box>
      <ActionDrawer open={isDrawerOpen} toggleDrawer={toggleDrawer}>
        <NewParcel />
      </ActionDrawer>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}

export default User;
