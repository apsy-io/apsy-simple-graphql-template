import { Fragment } from "react";
import { useCompanies, useDeleteCompanie } from "src/hooks";
import { CompanyType } from "src/@types/company.type";
import styles from "./companies.module.scss";

export default function Comanies() {
  const { data: companies, isLoading } = useCompanies();
  const { mutate: deleteCompany } = useDeleteCompanie();

  if (isLoading) return <div>Loading ...</div>;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th rowSpan={2}>Row</th>
          <th rowSpan={2}>ID</th>
          <th rowSpan={2}>Name</th>
          <th rowSpan={2}>Active</th>
          <th colSpan={2}>Employees</th>
          <th rowSpan={2}>Options</th>
        </tr>
        <tr>
          <th>name</th>
          <th>family</th>
        </tr>
      </thead>
      <tbody>
        {companies.map(
          ({ id, name, isActive, employees }: CompanyType, index: number) => (
            <Fragment key={index}>
              <tr>
                <td rowSpan={2}>{index + 1}</td>
                <td rowSpan={2}>{id}</td>
                <td rowSpan={2}>{name}</td>
                <td rowSpan={2}>{String(isActive)}</td>
              </tr>
              <tr>
                <td>
                  <div className="display-grid">
                    {employees.map(({ firstName }, index) => (
                      <div key={index}>{firstName}</div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="display-grid">
                    {employees.map(({ lastName }, index) => (
                      <div key={index}>{lastName}</div>
                    ))}
                  </div>
                </td>
                <td>
                  <button onClick={() => deleteCompany(id)}>Delete</button>
                </td>
              </tr>
            </Fragment>
          )
        )}
      </tbody>
    </table>
  );
}
