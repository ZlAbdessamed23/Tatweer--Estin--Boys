import { DepartmentType, ColumnType } from '@/app/types/constant';

export type UserType = "admin" | "manager";

interface User {
  userEmail: string;
  password: string;
  userType: UserType;
};

export interface Admin {
  adminId: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  adminIsActivated: boolean;
  managedCompany?: Company;
  emailVerificationToken?: EmailVerificationToken;
  assignedTasks: Task[];
};

export interface Company {
  companyId: string;
  companyName: string;
  companyEmployeeNumber: number;
  companyLocation: string;
  companyPhoneNumber: string;
  companyEmail: string;
  administrator: Admin;
  adminCompanyId: string;
  companyManagers: Manager[];
  companyDepartments: Department[];
  companySubscription?: Subscription;
};

export interface Manager {
  managerId: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  managerPassword: string;
  managerIsActivated: boolean;
  managerCompanyId: string;
  employingCompany: Company;
  managedDepartments: DepartmentManager[];
  emailVerificationToken?: EmailVerificationToken;
  assignedTasks: Task[];
};

export interface EmailVerificationToken {
  emailVerificationTokenId: string;
  emailVerificationTokenToken: string;
  emailVerificationTokenAdminId?: string;
  emailVerificationTokenManagerId?: string;
  emailVerificationTokenCreatedAt: Date;
  emailVerificationTokenExpiresAt: Date;
  adminVerification?: Admin;
  managerVerification?: Manager;
}

export interface Plan {
  planId: string;
  planName: string;
  planMaxAPICalls: number;
  planMaxManagers: number;
  planMaxDepartments: number;
  planAllowedAITypes: string;
  planSubscriptions: Subscription[];
}

export interface Subscription {
  subscriptionId: string;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  subscriptionCompanyId: string;
  subscriptionPlanId: string;
  subscribedCompany: Company;
  subscriptionPlan: Plan;
}

export interface Department {
  departmentId: string;
  departmentName: string;
  departmentType: DepartmentType;
  departmentCompanyId: string;
  parentCompany: Company;
  departmentManagers: DepartmentManager[];
  departmentTables: Table[];
  departmentIntegrations: ThirdPartyIntegration[];
  departmentConnections: DatabaseConnection[];
}

export interface DepartmentManager {
  departmentId: string;
  managerId: string;
  managedDepartment: Department;
  departmentManager: Manager;
}

export interface Table {
  tableId: string;
  tableName: string;
  tableDepartmentId: string;
  tableCreatedAt: Date;
  tableUpdatedAt: Date;
  tableDepartment: Department;
  tableColumns: Column[];
  tableRows: Row[];
}

export interface Column {
  columnId: string;
  columnName: string;
  columnType: ColumnType;
  columnTableId: string;
  columnTable: Table;
  columnCells: Cell[];
}

export interface Row {
  rowId: string;
  rowTableId: string;
  rowCreatedAt: Date;
  rowTable: Table;
  rowCells: Cell[];
}

export interface Cell {
  cellId: string;
  cellRowId: string;
  cellColumnId: string;
  cellValue: string;
  cellRow: Row;
  cellColumn: Column;
}

export interface Task {
  taskId: string;
  taskTitle: string;
  taskDescription: string;
  taskAdminId: string;
  taskManagerId: string;
  taskCreatedAt: Date;
  taskDueDate: Date;
  taskStatus: string;
  taskAdmin: Admin;
  taskManager: Manager;
}

export interface ThirdPartyIntegration {
  thirdPartyIntegrationId: string;
  thirdPartyIntegrationType: string;
  thirdPartyIntegrationDepartmentId: string;
  thirdPartyIntegrationConnectionDetails: string;
  integrationDepartment: Department;
}

export interface DatabaseConnection {
  databaseConnectionId: string;
  databaseConnectionType: string;
  databaseConnectionDepartmentId: string;
  databaseConnectionConnectionString: string;
  databaseConnectionCredentials: string;
  connectionDepartment: Department;
};

interface BankCard {
  cardId: string;
  cardType: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpirationDate: string;
};

interface GenerateRequest {
  department: DepartmentType;
  companySize?: string;
  industry?: string;
  currentChallenges?: string;
  budget?: string;
  timeframe?: string;
  conversation: string[];
};