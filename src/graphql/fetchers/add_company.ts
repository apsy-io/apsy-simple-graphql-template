import client from "../../utils/http/swr.client";
import { company_CreateCompany } from "../../graphql/company/companies";
import { CompanyType } from "src/@types/company.type";

const { gql, key } = company_CreateCompany;

export default async function addCompany(company: CompanyType) {
  const data = await client.request(gql, {
    company,
  });

  if (data[key].status !== "SUCCESS") {
    throw new Error(data[key].status);
  }

  return data[key].result;
}
