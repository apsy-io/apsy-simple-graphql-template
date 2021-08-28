import React from "react";
import { SnackbarProvider } from "notistack";

interface Props {
  children: React.ReactNode;
}

const SnackProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      //   maxSnack={1}

      classes={
        {
          // variantSuccess: classes.successSnack,
          // variantError: classes.errorSnack,
          // variantWarning: classes.warningSnack,
          // variantInfo: classes.infoSnack
          // containerAnchorOriginBottomLeft:
          //   classes.containerAnchorOriginBottomLeft,
        }
      }
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackProvider;
