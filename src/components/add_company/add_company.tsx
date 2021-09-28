import { useAddCompany } from "src/graphql/hooks";
import { randomString } from "src/utils/helper/random";

export default function AddCompany() {
  const { mutate: addCompany } = useAddCompany();

  return (
    <button
      onClick={() => {
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
        addCompany(company);
      }}
    >
      Add New Company
    </button>
  );
}
