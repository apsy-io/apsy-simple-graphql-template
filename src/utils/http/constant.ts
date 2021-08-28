import { ResStatusType } from "src/@types/graphql.type";

export const ACCESS_TOKEN_KEY = "LOCAL_TOKEN";

export const ACCESS_TOKEN_FAILED = "ACCESS_TOKEN_FAILED";

export const RES_STATUS: Record<string, ResStatusType> = {
  success: "SUCCESS",
  deplicate: "ALREADY_EXISTS",
  error: "ERROR",
  unauthorize: "AUTHENTICATION_FAILED",
};

export const AUTO_SAVE_SUCCESS = "SUCCESS";
export const AUTO_SAVE_FAILED = "Error";

export type AUTO_SAVE_RESULT = {
  result: typeof AUTO_SAVE_SUCCESS | typeof AUTO_SAVE_FAILED;
  form: "account";
};

export const DEFAULT_PAGE_SIZE_REQ = {
  request: {
    pageSize: 100,
    skip: 0,
  },
};
