import { ReactElement } from "react";

export interface SideBarItem {
  name: string;
  label: string;
  icon: ReactElement;
  hide: boolean; // set the hidden value to true if you want to. U can use different var for different purposes.
  path: string;
  active: string;
}

export interface MenuItem {
  title: string;
  url: string;
  active: boolean;
}

export interface Login {
  username: string;
  password: string;
}

export interface CapTableResponse {
  id: number;
  month: number;
  fixedRevenueShareRate: number;
  variableRevenueShareRate: number;
  createdDate: Date;
  cohortId?: number;
}

export interface CapTableRequest {
  month: number;
  fixedRevenueShareRate: number;
  variableRevenueShareRate: number;
  cohortId?: number;
}

export interface RevenueDriverResponse {
  id: number;
  description: string;
  endingMonth: number;
  growthRate: number;
  createdDate: Date;
  cohortId?: number;
}

export interface RevenueDriverRequest {
  description: string;
  endingMonth: number;
  growthRate: number;
  cohortId?: number;
}

export interface RevenueShareDriverResponse {
  id: number;
  description: string;
  type: string;
  receiptsRate: number;
  createdDate: Date;
  variableTypePhase: number;
  months: number;
  cohortId?: number;
}

export interface RevenueShareDriverRequest {
  description: string;
  type: string;
  receiptsRate: number;
  variableTypePhase: number;
  months: number;
  cohortId?: number;
}

export interface RevenueProjectionTypeRequest {
  type: string;
  cohortId?: number;
}

export interface RevenueProjectionTypeResponse {
  id: number;
  type: string;
  cohortId?: number;
  createdDate: Date;
}

export interface RevenueShareTypeResponse {
  id: number;
  type: string;
  cohortId?: number;
  createdDate: Date;
}

export interface RevenueShareTypeRequest {
  type: string;
  cohortId?: number;
}

export interface RiskResponse {
  id: number;
  type: string;
  percentage: number;
  createdDate: Date;
  cohortId?: number;
}

export interface RiskRequest {
  type: string;
  percentage: number;
  cohortId?: number;
}

export interface CohortRequest {
  name: string;
  description: string;
  maxFacilityTerm: number;
}

export interface CohortResponse {
  id: number;
  name: string;
  description: string;
  maxFacilityTerm: number;
  payoffMonths: CapTableResponse[];
  revenueDrivers: RevenueDriverResponse[];
  revenueShareDrivers: RevenueShareDriverResponse[];
  revenueShareTypes: RevenueShareTypeResponse[];
  revenueProjectionTypes: RevenueProjectionTypeResponse[];
  risks: RiskResponse[];
  createdDate: Date;
  updatedAt: Date;
}

export interface CohortType {
  id: number;
  name: string;
  description: string;
  maxFacilityTerm: number;
  createdDate: Date;
  updatedAt: Date;
}

export interface UserRequest {
  roleId: number | string;
  fullName: string;
  email: string;
  password: string;
}

export interface UserResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  status: string;
  registeredBy: string;
  lastLoggedIn: string;
  registeredAt: string;
  passwordChanged: boolean;
  updatedAt: string;
}

export interface AssetRequest {
  scoringDataType: string;
  rangeStart: number | null;
  rangeEnd: number | null;
  weight: number | null;
}
export interface AssetResponse {
  id: number;
  scoringDataType: string;
  rangeStart: number | null;
  rangeEnd: number | null;
  weight: number | null;
}

export interface Request {
  balanceThreshold: number;
  minWeight: number;
  description: string;
  updatedAt: string;
  minBalanceThreshold?: number; // Include minBalanceThreshold in the Request interface
}

export interface Response {
  balanceThreshold: number;
  minWeight: number;
  minBalanceThreshold?: number;
  description: string;
  updatedAt: string;
  id: number;
}

export interface SocialRequest {
  name: string;
  description: string;
  updatedAt: string;
}

export interface SocialResponse {
  name: string;
  description: string;
  updatedAt: string;
  id: number;
}
