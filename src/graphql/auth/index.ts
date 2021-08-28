import { CommonResponse } from "src/@types/graphql.type";
import { PartialUserType } from "src/@types/user.type";

export const SIGN_IN_USER_KEY = "user_SignInUser";
export const user_SignInUser = {
  key: SIGN_IN_USER_KEY,
  gql: /* GraphQL */ `
  mutation{ ${SIGN_IN_USER_KEY} {
    result{
        id
        firstName
        lastName
        role
        companyId
    }
    status
    }}`,
};
export type user_SignInUserType = {
  args: null;
  res: CommonResponse<typeof SIGN_IN_USER_KEY, PartialUserType>;
};
