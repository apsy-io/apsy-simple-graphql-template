import { useQuery, useMutation, useQueryClient } from "react-query";
import getAllCompanies from "src/fetchers/get_all_companies";
import deleteCompany from "src/fetchers/delete_companie";
import addCompany from "src/fetchers/add_company";
import { company_GetCompanies } from "../graphql/company/companies";
import { CompanyType } from "src/@types/company.type";

export function useCompanies() {
  return useQuery(company_GetCompanies.key, getAllCompanies);
}

export function useDeleteCompanie() {
  const queryClient = useQueryClient();

  return useMutation(deleteCompany, {
    onSuccess: (_, id) => {
      let { key } = company_GetCompanies;
      let companies = queryClient.getQueryData(key) as CompanyType[];

      companies = companies.filter((company) => company.id !== id);

      queryClient.setQueryData(key, companies);
    },
  });
}

export function useAddCompany() {
  const queryClient = useQueryClient();

  return useMutation(addCompany, {
    onSuccess: (company) => {
      let { key } = company_GetCompanies;
      let companies = queryClient.getQueryData(key) as CompanyType[];

      queryClient.setQueryData(key, [...companies, company]);
    },
  });
}
