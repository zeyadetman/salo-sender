import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useState } from "react";

interface Props {}

function User(props: Props) {
  const {} = props;
  const [parcels, setParcels] = useState([1]); // TODO: Replace it with real data from the server & Redux
  const isParcelsEmpty = !parcels || parcels.length === 0;

  const renderParcels = () => {
    if (isParcelsEmpty) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "2rem",
            width: "100%",
            marginTop: "3rem",
          }}
        >
          <Image
            src="/assets/empty-parcels.svg"
            alt="Empty"
            width="600"
            height="300"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "gray",
              }}
            >
              You don&apos;t have any parcels yet.
            </Typography>
            <Button>
              <Typography variant="button">Create a new Parcel</Typography>
            </Button>
          </Box>
        </Box>
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
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "2rem",
        }}
      >
        <Typography variant="h3">Hi Folan,</Typography>

        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-start",
              gap: "1rem",
            }}
          >
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
              >
                Create a new Parcel
              </Typography>
            ) : null}
          </Box>

          {renderParcels()}
        </Box>
      </Box>
    </Container>
  );
}

export default User;
