import { Fragment } from "react";
import {
  company_GetCompanies,
  GET_ACTIVATE_COMPANIES_KEY,
} from "src/graphql/company/companies";
import {
  useCompanyMutation,
  useGetAccounts,
} from "src/graphql/company/companyGraphql";
import { useOptimistic } from "src/graphql/useOptimistic";
import { randomString } from "src/utils/helper/random";

const ListCompanies = () => {
  const { activateCompanies } = useGetAccounts(true);
  const { deleteCompany } = useCompanyMutation();

  const onDeleteCompany = (companyId: number) => () => {
    
    deleteCompany({ companyId });
  };
  return (
    <div>
      {activateCompanies?.map(({ id, name, employees }) => {
        return (
          <div key={id} style={{ marginBottom: 40 }}>
            <p>{id}</p>
            <p>{name}</p>
            {employees.map(({ id, firstName, lastName }) => {
              return (
                <Fragment key={id}>
                  <p>{`${firstName} ${lastName}`}</p>
                </Fragment>
              );
            })}
            <button onClick={onDeleteCompany(id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

const AddCompany = () => {
  const { createCompany } = useCompanyMutation();

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

  const onAddCompany = () => {

    
    createCompany({ company });
  };
  return <button onClick={onAddCompany}>Add New Company</button>;
};

export default function Home() {
  return (
    <div>
      <ListCompanies />
      <AddCompany />
    </div>
  );
}
