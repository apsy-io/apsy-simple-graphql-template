import { useRedirectOnRole } from "@/components/auth/useRedirectOnRole";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { AuthUserIn } from "src/@types/auth.type";
import { useSetUser } from "src/providers/AuthorizationProvider";

import { fbRemoveUser } from "src/utils/http/firebase";
import { graphqlFetcher } from "src/utils/http/swr";
import { setAuthHeader } from "src/utils/http/swr.client";

import { mutate } from "swr";
import { user_SignInUser, user_SignInUserType } from ".";
import { useCommonLoading } from "../useCommonLoading";

const ID_TOKEN_KEY = "ON_ID_TOKEN";

export function useAuthMutation() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { isLoading, setLoading, finishLoadingState } = useCommonLoading();
  const setUser = useSetUser();

  const { redirectUserOnRole } = useRedirectOnRole();

  function signInUser() {
    return mutate(
      user_SignInUser.key,
      () => graphqlFetcher<user_SignInUserType>(user_SignInUser.gql),
      false
    );
  }

  const onIdTokenFailed = useCallback(() => {
    setUser("NO_USER");
  }, [router]);

  const onIdToken: AuthUserIn = useCallback(
    async (idToken: string, isFirstTime?: boolean) => {
      if (idToken) {
        setLoading(ID_TOKEN_KEY);

        setAuthHeader(idToken);
        try {
          const res: user_SignInUserType["res"] = await mutate(
            user_SignInUser.key,
            () => graphqlFetcher<user_SignInUserType>(user_SignInUser.gql),
            false
          );
          if (isUserFound(res)) {
            checkAndSetUser(res, isFirstTime);
          } else {
            removeNotInvitedUser();
          }
        } catch (err) {
          if (isFirstTimeSingin(err)) {
            return onIdToken(idToken, true);
          } else {
            onIdTokenFailed();
            console.error("onIdTokenFailed", err);
          }
        } finally {
          finishLoadingState(ID_TOKEN_KEY);
        }
      }
    },
    []
  );

  const setUserIfSuccess = useCallback((res: user_SignInUserType["res"]) => {
    if (res.user_SignInUser.status === "SUCCESS") {
      setUser(res.user_SignInUser.result);
    }
  }, []);

  const checkAndSetUser = useCallback(
    async (res: user_SignInUserType["res"], isFirstTime?: boolean) => {
      try {
        setUserIfSuccess(res);
        redirectUserOnRole(res.user_SignInUser.result, isFirstTime);
      } catch (err) {}
    },
    []
  );

  const removeNotInvitedUser = useCallback(async () => {
    try {
      enqueueSnackbar("You're not invited", { variant: "error" });
      await fbRemoveUser();
    } catch (err) {}
  }, []);

  return {
    onIdToken,
    onIdTokenFailed,
    loadingIdToken: isLoading[ID_TOKEN_KEY],
  };
}

export function isFirstTimeSingin(res: user_SignInUserType["res"]) {
  // TODO: this part should be tested on new user signed in (create new user to test)
  if (res?.user_SignInUser?.status === "SUCCESS") return false;
  if (res?.user_SignInUser?.status === "USER_HAS_NOT_JOINED") return true;
  return false;
}

export function isUserFound(res: user_SignInUserType["res"]) {
  if (res.user_SignInUser.status === "USER_NOT_FOUND") {
    return false;
  }
  return true;
}
