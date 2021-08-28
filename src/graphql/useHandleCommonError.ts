import { useCallback } from "react";

export function useHandleServerError() {
  const handleUnknowError = useCallback((err) => {
    if (err?.graphQLErrors && err?.graphQLErrors[0]?.message) {
      //   enqueueSnackbar(err.graphQLErrors[0].message, { variant: "error" });
    } else {
      //   enqueueSnackbar(t("error.serverError"), { variant: "error" });
    }
  }, []);
  return handleUnknowError;
}

export function onErrorMessage(err: any, key?: string) {
  return err?.message || (key && err[key]?.status) || "ERROR OCCURRED";
}
