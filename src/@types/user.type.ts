import { CompanyType } from "./company.type";

export type UserBase = {
  email: string;
  password?: string;
};

export type PrimaryContactVia = "PHONE" | "EMAIL" | "MAIL";

export type UserRole =
  | "EMPLOYEE"
  | "MANAGER"
  | "DIRECTOR"
  | "ADMIN"
  | "SUPER_ADMIN";

export type UserWorkLocation = {
  category: Partial<any>;
  categoryId: number;
  entity: UserType;
  entityId: number;
};

export type PhoneNumberDefInput = {
  countryCode: string;
  number: string;
  ext: string;
};

export type CountryCode = any;
export type UsaStateCode = any;

export type AddressDefInput = {
  country: CountryCode;
  state: UsaStateCode;
  province: String;
  city: String;
  zipcode: String;
  area: String;
  street1: String;
  street2: String;
};

export type EmailDefInput = {
  emailAddress: String;
};

export type ContactDef = {
  id: number;
  isPrimary: boolean;
  isActive: boolean;
  phoneNumber: Partial<PhoneNumberDefInput>;
  address: Partial<AddressDefInput>;
  email: Partial<EmailDefInput>;
};

export type Vaccination = {
  dateVaccinated: Date;
  employeeId: number;
  employeeSurveyId: number;
  id: number;
  proofCard: string;
  sendVaccineSurvey: string;
};

export type UserType = {
  activationKey: string;
  clearRiskyEmployee: boolean;
  company: Partial<CompanyType>;
  companyId: number;
  contacts: [Partial<ContactDef>];
  deactivationDateTime: Date;
  employeeID: string;
  externalId: string;
  firstName: string;
  id: number;
  isActive: boolean;
  isAdmin: boolean;
  jobTypeId: number;
  kioskID: string;
  languageId: number;
  lastName: string;
  managerId: number;
  photoUrl: string;
  // posts: [PostDef]
  primaryContactVia: PrimaryContactVia;
  role: UserRole;
  sendReceiveSurvey: boolean;
  socialProvider: number;
  userBase: UserBase;
  username: string;
  userWorkLocations: [Partial<UserWorkLocation>];

  jobType: any;
  language: Partial<any>;
  manager: Partial<UserType>;

  trackVaccination: boolean;

  vaccinations: [Partial<Vaccination>];
};

export type PartialUserType = Partial<UserType>;
