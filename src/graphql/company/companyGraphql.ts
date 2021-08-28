import { useCallback } from "react";
import {
  company_CreateCompany,
  company_CreateCompanyType,
  company_DeleteCompany,
  company_DeleteCompanyType,
  company_GetCompanies,
  company_GetCompaniesType,
  GET_ACTIVATE_COMPANIES_KEY,
  GET_DEACTIVATE_COMPANIES_KEY,
} from "./companies";
import useSWR, { mutate } from "swr";
import { graphqlFetcher } from "src/utils/http/swr";

import { useCommonLoading } from "../useCommonLoading";
import { useOptimistic } from "../useOptimistic";
import { randomId } from "src/utils/helper/random";
import { onErrorMessage } from "../useHandleCommonError";
import { DEFAULT_PAGE_SIZE_REQ } from "src/utils/http/constant";
import { useCommonSnack } from "../commonSnackbar";

export function useCompanyMutation() {
  const { isLoading, setLoading, finishLoadingState } = useCommonLoading();

  const { addArrayOptimistic, updateArrayOptimistic, deleteArrayOptimistic } =
    useOptimistic();

  const { createSnack, deleteSnack, updateSnack } = useCommonSnack();

  const mutateCreateCompany = useCallback(
    async ({ company }: company_CreateCompanyType["args"]) => {
      const res: company_CreateCompanyType["res"] = await mutate(
        company_CreateCompany.key,
        graphqlFetcher<company_CreateCompanyType>(company_CreateCompany.gql, {
          company,
        }),
        false
      );
      return res;
    },
    []
  );

  const createCompany = useCallback(
    async (company: company_CreateCompanyType["args"]) => {
      const swrKey = GET_ACTIVATE_COMPANIES_KEY;
      const optimKey = company_GetCompanies.key;
      const optId = randomId();
      try {
        //optimistically change data before actually call api
        addArrayOptimistic(
          { ...company.company, id: optId },
          GET_ACTIVATE_COMPANIES_KEY,
          company_GetCompanies.key
        );
        setLoading(swrKey);
        const res = await mutateCreateCompany(company);
        if (res.company_CreateCompany.status === "SUCCESS") {
          //refetch companies to be sure everythings synced and get real id of created Company
          mutate(swrKey);
          const userId = res.company_CreateCompany.result.employees[0].id;
          return res;
        } else {
          //show error snack and delete optimistic created item again optimistically
          createSnack(
            res.company_CreateCompany.status,
            res.company_CreateCompany.status
          );
          deleteArrayOptimistic(optId, swrKey, optimKey);
        }
      } catch (err) {
        //show error snack and delete optimistic created item again optimistically
        createSnack(undefined, onErrorMessage(err, swrKey));
        deleteArrayOptimistic(optId, swrKey, optimKey);
        console.error(err);
      } finally {
        finishLoadingState(swrKey);
      }
    },
    []
  );

  const mutateDeleteCompany = useCallback(
    async (companyId: company_DeleteCompanyType["args"]["companyId"]) => {
      const res: company_DeleteCompanyType["res"] = await mutate(
        company_DeleteCompany.key,
        graphqlFetcher<company_DeleteCompanyType>(company_DeleteCompany.gql, {
          companyId,
        }),
        false
      );
      return res;
    },
    []
  );
  const deleteCompany = useCallback(
    async (company_id: company_DeleteCompanyType["args"]) => {
      try {
        //optimistically change data before actually call api
        deleteArrayOptimistic(
          company_id.companyId,
          GET_ACTIVATE_COMPANIES_KEY,
          company_GetCompanies.key
        );
        setLoading(company_DeleteCompany.key);
        const res = await mutateDeleteCompany(company_id.companyId);
        if (res.company_DeleteCompany.status === "SUCCESS") {
        } else {
          //refetch companies to be sure everythings synced if any error occured!
          mutate(company_GetCompanies.key);
          deleteSnack(
            res.company_DeleteCompany.status,
            res.company_DeleteCompany.status
          );
        }
      } catch (err) {
        //refetch companies to be sure everythings synced if any error occured!
        mutate(company_GetCompanies.key);
        deleteSnack(undefined, onErrorMessage(err, company_DeleteCompany.key));

        console.error(err);
      } finally {
        finishLoadingState(company_DeleteCompany.key);
      }
    },
    []
  );

  return {
    mutateCreateCompany,

    mutateDeleteCompany,

    createCompany,
    deleteCompany,

    loadingCreateCompany: isLoading[company_CreateCompany.key],
  };
}

export function useGetAccounts(isActivate: boolean) {
  const { data: activateData, error: activateError } = useSWR(
    isActivate ? GET_ACTIVATE_COMPANIES_KEY : null,
    () =>
      graphqlFetcher<company_GetCompaniesType>(company_GetCompanies.gql, {
        isActive: true,
        ...DEFAULT_PAGE_SIZE_REQ,
      })
  );
  const { data: deactivateData, error: deactivateError } = useSWR(
    !isActivate ? GET_DEACTIVATE_COMPANIES_KEY : null,
    () =>
      graphqlFetcher<company_GetCompaniesType>(company_GetCompanies.gql, {
        isActive: false,
        ...DEFAULT_PAGE_SIZE_REQ,
      })
  );
  return {
    activateCompanies: activateData?.company_GetCompanies.result,
    activateCompaniesLoading: !activateData && !activateError,
    deactivateCompanies: deactivateData?.company_GetCompanies.result,
    deactivateCompaniesLoading: !deactivateData && !deactivateError,
  };
}
