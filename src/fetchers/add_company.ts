import client from "../utils/http/swr.client";
import { company_CreateCompany } from "../graphql/company/companies";
import { randomString } from "src/utils/helper/random";

const { gql, key } = company_CreateCompany;

export default async function addCompany() {
  const company: any = {
    name: `companyName ${randomString(5)}`,
    isActive: true,
    employees: [
      {
        role: "DIRECTOR",
        userBase: {
          email: `${randomString(5)}@company.com`,
        },
        firstName: `${randomString(5)}`,
        lastName: `${randomString(5)}`,
      },
    ],
  };

  const data = await client.request(gql, {
    company,
  });

  if (data[key].status !== "SUCCESS") {
    return console.log("error", data);
  }

  return data[key].result;
}
