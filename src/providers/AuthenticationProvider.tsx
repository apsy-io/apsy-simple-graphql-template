import { useEffect } from "react";
import { ACCESS_TOKEN_KEY } from "src/utils/http/constant";

import { isTokenExpired } from "src/utils/http/token";

import { getCookieStorage } from "src/utils/storage";

import { useAuthMutation } from "src/graphql/auth/authGraphql";
import { useFirebaseAuth } from "src/graphql/auth/firebaseAuth";
import { useGetMaybeUser } from "./AuthorizationProvider";

import { useRouter } from "next/router";

function AuthenticationProvider({ children }: any) {
  const user = useGetMaybeUser();
  const { onIdToken } = useAuthMutation();
  const { refreshToken } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    const idToken = getCookieStorage(ACCESS_TOKEN_KEY);
    if (isTokenExpired(idToken)) {
      refreshToken();
    }
  }, [refreshToken]);

  useEffect(() => {
    if (user === "NO_USER") {
      router.push(`/login`);
    } else if (user === "LOADING" || !user?.role) {
      const idToken = getCookieStorage(ACCESS_TOKEN_KEY);

      if (idToken && !isTokenExpired(idToken)) onIdToken(idToken);
    }
  }, [user]);

  // useEffect(() => {
  //   onIdToken(
  //     "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFlMDVlZmMyNTM2YjJjZTdjNTExZjRiMTcyN2I4NTkyYTc5ZWJiN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBzLXZvbHludCIsImF1ZCI6ImFwcy12b2x5bnQiLCJhdXRoX3RpbWUiOjE2MjgyNzQzODAsInVzZXJfaWQiOiIzSnhmUk9wcE9JYWx5ZktQSGc5bHJGMEhxRHIxIiwic3ViIjoiM0p4ZlJPcHBPSWFseWZLUEhnOWxyRjBIcURyMSIsImlhdCI6MTYyODMxNjIzOCwiZXhwIjoxNjI4MzE5ODM4LCJlbWFpbCI6InN1cGVyYWRtaW5Adm9seW50LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzdXBlcmFkbWluQHZvbHludC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lIn-lKd9gBJ8JPT8TUZw1O7k20FwZOrTk445aVNE1FAh5R0E0eNkvk6LFTcG5WyNt-Av-y1QJgE86c-OIHy6YCfTSzCrGKBK_DpQDSxhLouCrFnES8jYbFBaRq6rUmxQA8PXTRw61ZJhsJZ8tr7lBTZxNl67dQesjHKP75G8VGDc6GtGnGkzVaahX5KfemVTDHffpbUcm_giVkMSx9IuyZjNYSGIhCiUiZe9p6mR7W8xJWSjpcssStTDBcaPcYnwZVoqI7kM5J8cPS74eswZvYMuPy8XRyvfeduNlDqGkFAB8ZOWRcsdIUegdU9c3Quuzi0MTEJYZBak6cMWxT3MEQ"
  //   );
  // }, []);

  return <>{children}</>;
}

export default AuthenticationProvider;
