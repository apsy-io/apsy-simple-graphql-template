import { CompanyType } from "src/@types/company.type";
import {
  CommonResponse,
  PaginationArgsType,
  StatusPostResponse,
} from "src/@types/graphql.type";

export const GET_ACTIVATE_COMPANIES_KEY = "company_GetCompanies_activate";
export const GET_DEACTIVATE_COMPANIES_KEY = "company_GetCompanies_deactivate";

export const GET_COMPANIES_KEY = "company_GetCompanies";
export const company_GetCompanies = {
  key: GET_COMPANIES_KEY,
  gql: /* GraphQL */ `
  query ${GET_COMPANIES_KEY}($request: FindRequestInput,$isActive: Boolean!) {
    ${GET_COMPANIES_KEY}(request: $request, isActive: $isActive) {
    result {
    id
    name
    isActive
    employees{
      id
      firstName
      lastName
      role
      userBase{
        email
        }
      }
    }
    status
    }
  }
`,
};
export type company_GetCompaniesType = {
  args: {
    request: PaginationArgsType;
    isActive: boolean;
  };
  res: CommonResponse<typeof GET_COMPANIES_KEY, Array<CompanyType>>;
};

export const CREATE_COMPANY_KEY = "company_CreateCompany";
export const company_CreateCompany = {
  key: CREATE_COMPANY_KEY,
  gql: /* GraphQL */ `
  mutation ${CREATE_COMPANY_KEY}($company: CompanyInput) {
    ${CREATE_COMPANY_KEY}(company: $company) {
    result {
    id
    name
    isActive
    employees{
      id
      firstName
      lastName
      role
      userBase{
        email
        }
      }
    }
    status
    }
  }
`,
};
export type company_CreateCompanyType = {
  res: CommonResponse<typeof CREATE_COMPANY_KEY, CompanyType>;
  args: {
    company: Partial<CompanyType>;
  };
};

export type company_MutationType<T extends string> = {
  args: {
    companyId: number;
  };
  res: StatusPostResponse<T>;
};

export const DELETE_COMPANY_KEY = "company_DeleteCompany";
export const company_DeleteCompany = {
  key: DELETE_COMPANY_KEY,
  gql: /* GraphQL */ `
  mutation ${DELETE_COMPANY_KEY}($companyId: Int!) {
    ${DELETE_COMPANY_KEY}(companyId: $companyId) {
      status
    }
  }
`,
};

export type company_DeleteCompanyType = company_MutationType<
  typeof DELETE_COMPANY_KEY
>;
