import client from "../../utils/http/swr.client";
import { company_GetCompanies } from "../company/companies";
import { DEFAULT_PAGE_SIZE_REQ } from "../../utils/http/constant";

export default async function getAllCompanies() {
  const { gql, key } = company_GetCompanies;

  const data = await client.request(gql, {
    isActive: true,
    ...DEFAULT_PAGE_SIZE_REQ,
  });

  if (data[key].status !== "SUCCESS") {
    return console.log("error", data);
  }

  return data[key].result;
}
