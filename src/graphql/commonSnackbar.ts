import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { ResStatusType } from "src/@types/graphql.type";

export function useCommonSnack() {
  const { enqueueSnackbar } = useSnackbar();

  function createSnack(status?: ResStatusType, message = "") {
    if (status === "SUCCESS") {
      enqueueSnackbar("success created", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${"error createFaild"} ${message}`, {
        variant: "error",
      });
    }
  }
  function deleteSnack(status?: ResStatusType, message = "") {
    if (status === "SUCCESS") {
      enqueueSnackbar("success deleted", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${"error deleteFaild"} ${message}`, {
        variant: "error",
      });
    }
  }
  function updateSnack(status?: ResStatusType, message = "") {
    if (status === "SUCCESS") {
      enqueueSnackbar("success update", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(`${"error updateFaild"} ${message}`, {
        variant: "error",
      });
    }
  }

  return {
    createSnack,
    deleteSnack,
    updateSnack,
  };
}
