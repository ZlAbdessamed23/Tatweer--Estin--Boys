import prisma from "@/lib/prisma/prismaClient";
import { AddJsonUploadData, JsonUploadResult } from "./types";
import {
  NotFoundError,
  
} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";

export async function addJsonUpload(
  data: AddJsonUploadData
): Promise<JsonUploadResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Verify department exists
      const department = await prisma.department.findUnique({
        where: { departmentId: data.jsonDepartmentId },
      });

      if (!department) {
        throw new NotFoundError("Department not found");
      }

      // Create JSON upload with its relationships
      const createdJsonUpload = await prisma.jsonUpload.create({
        data: {
          json: data.json,
          jsonDepartment: { connect: { departmentId: data.jsonDepartmentId } },
        },
        select: {
          id: true,
          json: true,
          createdAt: true,
          jsonDepartmentId: true,
        },
      });

      return { JsonUpload: createdJsonUpload };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}



