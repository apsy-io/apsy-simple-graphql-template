import { useRouter } from "next/router";
import { useCallback } from "react";
import { AuthWithPassword, AuthWithProvider } from "src/@types/auth.type";

import { useCommonLoading } from "src/graphql/useCommonLoading";

import { useSetUser } from "src/providers/AuthorizationProvider";

import {
  fbSignInGoogleToken,
  fbSignInToken,
  fbGetToken,
  fbRefreshToken,
  fbPasswordReset,
  fbSignOut,
  fbSignUpToken,
} from "src/utils/http/firebase";
import { clearCookie } from "src/utils/storage";
import { ACCESS_TOKEN_KEY } from "src/utils/http/constant";

import { onErrorMessage } from "../useHandleCommonError";
import { useAuthMutation } from "./authGraphql";
import { useCommonSnack } from "../commonSnackbar";

export const authFormInitialValues = {
  email: "",
  password: "",
};

const SIGNUP_KEY = "FB_SIGN_UP";
const SIGNIN_KEY = "FB_SIGN_IN";
const SIGNOUT_KEY = "FB_SIGN_OUT";
const REFERESH_KEY = "FB_REFERESH_TOKEN";

export function useFirebaseAuth() {
  const { onIdToken, loadingIdToken, onIdTokenFailed } = useAuthMutation();
  const setUser = useSetUser();
  const router = useRouter();
  const lang = "";
  const { isLoading, setLoading, finishLoadingState } = useCommonLoading();
  const { createSnack } = useCommonSnack();

  const signUp: AuthWithPassword = async (email, password) => {
    try {
      setLoading(SIGNUP_KEY);
      const idToken = await fbSignUpToken(email, password);

      if (typeof idToken === "string") {
        onIdToken(idToken);
      }
    } catch (err) {
      createSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
      onIdTokenFailed();
      console.error(err);
    } finally {
      finishLoadingState(SIGNUP_KEY);
    }
  };

  const signUpGoogle: AuthWithProvider = async () => {
    try {
      setLoading(SIGNIN_KEY);
      const idToken = await fbSignInGoogleToken();
      if (typeof idToken === "string") {
        onIdToken(idToken);
      }
    } catch (err) {
      createSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
      console.error(err);
    } finally {
      finishLoadingState(SIGNIN_KEY);
    }
  };

  const signIn: AuthWithPassword = async (email, password) => {
    try {
      setLoading(SIGNIN_KEY);

      const idToken = await fbSignInToken(email, password);
      if (typeof idToken === "string") {
        onIdToken(idToken);
      }
    } catch (err) {
      createSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
      console.error(err);
    } finally {
      finishLoadingState(SIGNIN_KEY);
    }
  };

  const refreshToken = useCallback(async () => {
    try {
      setLoading(REFERESH_KEY);
      await fbRefreshToken();
      const idToken = await fbGetToken();

      if (typeof idToken === "string") {
        onIdToken(idToken);
      }
    } catch (err) {
      onIdTokenFailed();
      // createSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
      console.error(err);
    } finally {
      finishLoadingState(REFERESH_KEY);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(SIGNOUT_KEY);
      await fbSignOut();
      clearCookie(ACCESS_TOKEN_KEY);
      setUser && setUser("NO_USER");
      router.push(`/login`);
    } catch (err) {
      createSnack("AUTHENTICATION_FAILED", onErrorMessage(err));
      console.error(err);
    } finally {
      finishLoadingState(SIGNOUT_KEY);
    }
  }, []);

  return {
    signUp,
    signUpGoogle,
    signIn,
    signOut,
    refreshToken,
    signUpLoading: isLoading[SIGNUP_KEY] || loadingIdToken,
    signInLoading: isLoading[SIGNIN_KEY] || loadingIdToken,
    refreshLoadin: isLoading[REFERESH_KEY] || loadingIdToken,
    signoutLoadin: isLoading[SIGNOUT_KEY] || loadingIdToken,
  };
}

export function useFirebaseResetPassword() {
  const { isLoading, setLoading, finishLoadingState } = useCommonLoading();
  const resetPassword = useCallback(
    async (email: string, onSuccess: () => void) => {
      try {
        setLoading("resetpassword");
        const res = await fbPasswordReset(email);

        onSuccess();
      } catch (err) {
      } finally {
        finishLoadingState("resetpassword");
      }
    },
    []
  );

  return { resetPassword, loading: isLoading["resetpassword"] };
}
