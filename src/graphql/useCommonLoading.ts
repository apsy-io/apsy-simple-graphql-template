import { useCallback, useRef, useState } from "react";

export function useCommonLoading() {
  const isLoading = useRef<Record<string, boolean>>({});

  const [_, toggleLoading] = useState(false);

  const setLoading = useCallback(
    (key) => {
      isLoading.current[key] = true;
      toggleLoading((prevState) => !prevState);
    },
    [toggleLoading]
  );

  const finishLoading = useCallback((key) => {
    isLoading.current[key] = false;
  }, []);
  const finishLoadingState = useCallback(
    (key) => {
      isLoading.current[key] = false;
      toggleLoading((prevState) => !prevState);
    },
    [toggleLoading]
  );

  return {
    isLoading: isLoading.current,
    setLoading,
    finishLoading,
    finishLoadingState,
  };
}
