import prisma from "@/lib/prisma/prismaClient";
import { 
  AddDatabaseConnectionData, 
  DatabaseConnectionResult, 
  
} from "./types";
import {
  NotFoundError,
} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";

export async function addDatabaseConnection(
  data: AddDatabaseConnectionData
): Promise<DatabaseConnectionResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Verify department exists
      const department = await prisma.department.findUnique({
        where: { departmentId: data.databaseConnectionDepartmentId },
      });

      if (!department) {
        throw new NotFoundError("Department not found");
      }

      // Check if connection string already exists for this department
      const existingConnection = await prisma.databaseConnection.findFirst({
        where: {
          databaseConnectionDepartmentId: data.databaseConnectionDepartmentId,
          databaseConnectionConnectionString: data.databaseConnectionConnectionString,
        },
      });

      if (existingConnection) {
        throw new Error("Connection string already exists for this department");
      }

      // Create database connection
      const createdConnection = await prisma.databaseConnection.create({
        data: {
          databaseConnectionConnectionString: data.databaseConnectionConnectionString,
          connectionDepartment: {
            connect: { departmentId: data.databaseConnectionDepartmentId },
          },
        },
        select: {
          databaseConnectionId: true,
          databaseConnectionConnectionString: true,
          databaseConnectionDepartmentId: true,
        },
      });

      return { DatabaseConnection: createdConnection };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}