import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { DatabaseConnectionsResult } from "./types";
import prisma from "@/lib/prisma/prismaClient";

export async function getDatabaseConnectionsByDepartment(
    departmentId: string
  ): Promise<DatabaseConnectionsResult> {
    try {
      const connections = await prisma.databaseConnection.findMany({
        where: { databaseConnectionDepartmentId: departmentId },
        select: {
          databaseConnectionId: true,
          databaseConnectionConnectionString: true,
          databaseConnectionDepartmentId: true,
        },
      });
  
      return { DatabaseConnections: connections };
    } catch (error) {
      throwAppropriateError(error);
    }
  }