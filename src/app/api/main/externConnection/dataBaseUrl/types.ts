import { Prisma } from "@prisma/client";

export type AddDatabaseConnectionData = {
  databaseConnectionConnectionString: string;
  databaseConnectionDepartmentId: string;
};

export const requiredDatabaseConnectionFields: (keyof AddDatabaseConnectionData)[] = [
  "databaseConnectionConnectionString",
  "databaseConnectionDepartmentId"
];

export type DatabaseConnectionResult = {
  DatabaseConnection: Prisma.DatabaseConnectionGetPayload<{
    select: {
      databaseConnectionId: true;
      databaseConnectionConnectionString: true;
      databaseConnectionDepartmentId: true;
    };
  }>;
};

