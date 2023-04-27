import { LayoutStyled } from "@/modules/common/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props;

  return <LayoutStyled>{children}</LayoutStyled>;
};
