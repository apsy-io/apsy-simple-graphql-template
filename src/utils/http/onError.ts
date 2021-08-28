import { RES_STATUS } from "./constant";

function checkIfAuthError(error: any) {
  const errorKey = Object.keys(error)[0];
  if (error[errorKey] && error[errorKey] && error[errorKey]?.status) {
    if (error[errorKey]?.status === RES_STATUS.unauthorize) {
      return true;
    }
  }
  return false;
}

export function onSWRError(error: any) {
  if (checkIfAuthError(error)) {
    //do nothing it handled on graphqlFetcher
  }
}
export const onSWRErrorRetry = (
  error: any,
  key: string,
  config: any,
  revalidate: any,
  { retryCount }: any
) => {
  if (checkIfAuthError(error)) {
    //do nothing it handled on graphqlFetcher
    return;
  }
  // Only retry up to 3 times.
  if (retryCount >= 3) return;

  // Retry after 3 seconds.
  setTimeout(() => revalidate({ retryCount }), 3000);
};
