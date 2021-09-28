import { useQuery, useMutation, useQueryClient } from "react-query";
import getAllCompanies from "src/graphql/fetchers/get_all_companies";
import deleteCompany from "src/graphql/fetchers/delete_companie";
import addCompany from "src/graphql/fetchers/add_company";
import { company_GetCompanies } from "../company/companies";
import { CompanyType } from "src/@types/company.type";

export function useCompanies() {
  return useQuery(company_GetCompanies.key, getAllCompanies);
}

export function useDeleteCompanie() {
  const queryClient = useQueryClient();
  const { key } = company_GetCompanies;

  return useMutation(deleteCompany, {
    onMutate: (id) => {
      let previousCompanies = queryClient.getQueryData(key) as CompanyType[];
      let companies = previousCompanies.filter((company) => company.id !== id);

      queryClient.setQueryData(key, companies);

      return { previousCompanies };
    },
    onError: (err, id, context: any) => {
      queryClient.setQueryData(key, context.previousCompanies);
    },
  });
}

export function useAddCompany() {
  const queryClient = useQueryClient();
  const { key } = company_GetCompanies;

  return useMutation(addCompany, {
    onMutate: (company) => {
      let previousCompanies = queryClient.getQueryData(key) as CompanyType[];

      queryClient.setQueryData(key, [...previousCompanies, company]);

      return { previousCompanies };
    },
    onSuccess: () => {
      //re-fetching the queries to add a company ID that has just been added.
      queryClient.refetchQueries(key);
    },
    onError: (err, id, context: any) => {
      queryClient.setQueryData(key, context.previousCompanies);
    },
  });
}
