import { LayoutStyled } from "@/modules/common/styles";
import { userType } from "@/redux/slices/auth.slice";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken || user?.type !== userType.SENDER) {
      router.push("/");
    }
  }, [accessToken, user?.type]);

  return <LayoutStyled>{children}</LayoutStyled>;
};
