import client from "../../utils/http/swr.client";
import { company_DeleteCompany } from "../company/companies";

const { gql, key } = company_DeleteCompany;

export default async function deleteCompany(companyId: number) {
  const data = await client.request(gql, {
    companyId,
  });

  if (data[key].status !== "SUCCESS") {
    throw new Error(data[key].status);
  }

  return data;
}
