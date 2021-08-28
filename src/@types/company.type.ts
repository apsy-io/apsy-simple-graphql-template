import { UserType } from "./user.type";

export type SurveySendType = "AUTO" | "MANUAL";
export type TemperatureUnit = "FAHRENHEIT" | "CENTIGRADE";

export type CompanyType = {
  employees: Array<Partial<UserType>>;
  id: number;
  isActive: boolean;
  name: string;
  autoTranslate: boolean;
  logoUrl: string;

  surveySendType: SurveySendType;
  temperatureUnit: TemperatureUnit;

  risk_LowRiskMin: number;
  risk_LowRiskMax: number;
  risk_ModerateRiskMin: number;
  risk_ModerateRiskMax: number;
  risk_HighRiskMin: number;
  risk_HighRiskMax: number;
  alertDirector_Risk: Boolean;
  alertDirector_AfterRiskFlaggedStaff: Boolean;
  alertDirector_Cleared: Boolean;
  alertDirector_NotCleared: Boolean;
  alertDirector_SurveyNotCompleted: Boolean;
  alertDirector_TemperatureNotCompleted: Boolean;
  alertDirector_MissSurveyAndTemperature: Boolean;
  alertDirector_RiskFlaggedStaff: Boolean;
  alertDirector_MissTemperatureAndScreeningSurvey: Boolean;
  alertManager_Risk: Boolean;
  alertManager_AfterRiskFlaggedStaff: Boolean;
  alertManager_Cleared: Boolean;
  alertManager_NotCleared: Boolean;
  alertManager_SurveyNotCompleted: Boolean;
  alertManager_TemperatureNotCompleted: Boolean;
  alertManager_MissSurveyAndTemperature: Boolean;
  alertManager_RiskFlaggedStaff: Boolean;
  alertManager_MissTemperatureAndScreeningSurvey: Boolean;
};
