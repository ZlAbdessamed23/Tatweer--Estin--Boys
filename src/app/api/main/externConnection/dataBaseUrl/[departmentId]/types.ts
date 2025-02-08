import { Prisma } from "@prisma/client";

export type DatabaseConnectionsResult = {
    DatabaseConnections: Prisma.DatabaseConnectionGetPayload<{
      select: {
        databaseConnectionId: true;
        databaseConnectionConnectionString: true;
        databaseConnectionDepartmentId: true;
      };
    }>[];
  };