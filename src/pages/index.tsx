import Head from "next/head";
import { Button, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "@/assets/lottie-banner.json";
import {
  HomeActionButtonsContainerStyled,
  HomeContainerStyled,
  HomeHeaderTextContainerStyled,
} from "@/modules/home";
import { ActionModal } from "@/modules/common";
import { useEffect, useLayoutEffect, useState } from "react";
import { LoginForm, Register } from "@/modules/auth";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux/store";
import { userType } from "@/redux/slices/auth.slice";

enum ModalTypes {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export default function Home() {
  const [modalType, selectModalType] = useState<ModalTypes | null>(null);
  const router = useRouter();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  const handleTrySaloForFree = () => {
    selectModalType(ModalTypes.REGISTER);
  };

  const handleLogin = () => {
    selectModalType(ModalTypes.LOGIN);
  };

  const handleModalClose = () => {
    selectModalType(null);
  };

  useEffect(() => {
    if (accessToken && user?.type === userType.SENDER) {
      router.push("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, user?.type]);

  return (
    <>
      <Head>
        <title>Salo, For Delivery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeContainerStyled>
        <HomeHeaderTextContainerStyled>
          <Typography variant="h3">
            Salo, Fast & Safe Parcels Delivery
          </Typography>
          <Typography variant="subtitle1">
            We care about your parcels, we deliver them fast and safe.
          </Typography>
        </HomeHeaderTextContainerStyled>

        <Lottie animationData={animationData} loop={true} />

        <HomeActionButtonsContainerStyled>
          <ActionModal
            actionButton={
              <Button
                variant="contained"
                color="primary"
                onClick={handleTrySaloForFree}
              >
                Try Salo for free
              </Button>
            }
            modalProps={{
              open: modalType === ModalTypes.REGISTER,
              onClose: handleModalClose,
              children: <Register handleLoginNavigation={handleLogin} />,
            }}
          />

          <ActionModal
            actionButton={
              <Button variant="text" color="primary" onClick={handleLogin}>
                Have an account? Login
              </Button>
            }
            modalProps={{
              open: modalType === ModalTypes.LOGIN ? true : false,
              onClose: handleModalClose,
              children: <LoginForm />,
            }}
          />
        </HomeActionButtonsContainerStyled>
      </HomeContainerStyled>
    </>
  );
}
