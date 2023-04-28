import { Button, Drawer, DrawerProps } from "@mui/material";
import React, { useState } from "react";

interface Props extends Omit<DrawerProps, "onClose" | "onOpen"> {
  open: boolean;
  toggleDrawer: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

const anchor = "right";

export const ActionDrawer = (props: Props) => {
  const { open, toggleDrawer, ...drawerProps } = props;

  return (
    <>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          "& .MuiPaper-elevation": {
            width: "50%",
          },
        }}
        {...drawerProps}
      >
        {drawerProps.children}
      </Drawer>
    </>
  );
};
