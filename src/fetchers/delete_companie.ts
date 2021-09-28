import client from "../utils/http/swr.client";
import { company_DeleteCompany } from "../graphql/company/companies";

const { gql, key } = company_DeleteCompany;

export default async function deleteCompany(companyId: number) {
  const data = await client.request(gql, {
    companyId,
  });

  if (data[key].status !== "SUCCESS") {
    return console.log("error", data);
  }

  return data;
}
