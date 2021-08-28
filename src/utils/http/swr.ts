import { RES_STATUS } from "src/utils/http/constant";
import { ACCESS_TOKEN_FAILED } from "./constant";
import { fbGetToken } from "./firebase";
import client, { setAuthHeader } from "./swr.client";
import { isTokenExpired } from "./token";

let refreshTokenRequested: any;

type QueryType = {
  res: any;
  args: any;
};

function handleResponse(res: any, resolve: any, reject: any) {
  const success = Object.keys(res).some(
    (key: string) => res[key].status === RES_STATUS.success
  );
  if (success) {
    resolve(res);
  } else {
    reject(res);
  }
}

export function graphqlFetcher<T extends QueryType>(
  GQL: string,
  args?: T["args"]
) {
  return new Promise<T["res"]>(async (resolve, reject) => {
    try {
      const res = await client.request(GQL, args);

      //token expired || no token exist
      const authFail = Object.keys(res).some(
        (key: string) => res[key].status === RES_STATUS.unauthorize
      );

      if (authFail) {
        //token expired
        //just single request should request for refresh token and other should wait for
        if (!refreshTokenRequested) {
          refreshTokenRequested = true;
          try {
            const idToken = await fbGetToken();
            if (!isTokenExpired(idToken)) {
              setAuthHeader(idToken);

              const response = await client.request(GQL, args);
              refreshTokenRequested = false;
              handleResponse(response, resolve, reject);
            }
          } catch (err) {
            //shuold sent to login
            refreshTokenRequested = false;
            reject(ACCESS_TOKEN_FAILED);
          }
        } else {
          //handle other request simultanously stop by expired token
          let retry = 0;
          const interval = setInterval(async () => {
            retry += 1;
            if (!refreshTokenRequested) {
              const response = await client.request(GQL, args);
              handleResponse(response, resolve, reject);
              clearInterval(interval);
            } else if (retry > 10) {
              interval && clearInterval(interval);
            }
          }, 3000);
        }
      } else {
        handleResponse(res, resolve, reject);
      }
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}
