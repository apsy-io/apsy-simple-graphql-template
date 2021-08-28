export type ResStatusType =
  | "SUCCESS"
  | "ERROR"
  | "ALREADY_EXISTS"
  | "AUTHENTICATION_FAILED"
  | "IMAGE_UPLOAD_FAILED"
  | "NOT_FOUND"
  | "ALREADY_EXISTS"
  | "REACHED_THE_LIMIT"
  | "USER_NOT_FOUND"
  | "EVENT_DOES_NOT_EXIST"
  | "USER_NOT_INVITED"
  | "EVENT_NOT_STARTED"
  | "EVENT_ENDED"
  | "EXTERNAL_EVENT_ERROR"
  | "USER_HAS_NOT_JOINED"
  | "NON_HOST_TRIED_TO_START"
  | "NON_HOST_TRIED_TO_DELETE"
  | "EVENT_NEEDS_AT_LEAST_ONE_HOST"
  | "USER_CREATION_FAILED"
  | "ALREADY_FOLLOWING"
  | "NOT_FOLLOWING"
  | "CATEGORY_NOT_FOUND"
  | "GROUP_NEEDS_AT_LEAST_ONE_OWNER"
  | "GROUP_DOES_NOT_EXIST"
  | "NON_OWNER_TRIED_TO_DELETE"
  | "POST_NOT_FOUND"
  | "COMMENT_NOT_FOUND";

export type CommonResponse<T extends string, S = any> = Record<
  T,
  { result: S; status: ResStatusType }
>;

export type StatusPostResponse<T extends string> = CommonResponse<T, undefined>;

export type CommonGetResponse<T extends string, S = any> = Record<T, S>;

export type CommonHandledReuslt<T, R extends string> = {
  req: T;
  res: CommonResponse<R>;
  success: ResStatusType;
};

export type RequestIdInputType<T extends string, S = any> = Record<T, S>;

export type GraphqlQueryObj = {
  key: string;
  gql: string;
};
export type GraphqlQueryTypesKey = "args" | "res";

export type PaginationArgsType = {
  id?: number;
  text?: string;
  categoryId?: number;
  skip: number;
  pageSize: number;
};