import { useAddCompany } from "src/hooks";

export default function AddCompany() {
  const { mutate: addCompany } = useAddCompany();

  return <button onClick={() => addCompany()}>Add New Company</button>;
}
