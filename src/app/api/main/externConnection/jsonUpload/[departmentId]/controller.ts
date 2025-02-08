import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { JsonUploadsResult } from "./types";
import prisma from "@/lib/prisma/prismaClient";
export async function getJsonUploadsByDepartment(
    departmentId: string
  ): Promise<JsonUploadsResult> {
    try {
      const jsonUploads = await prisma.jsonUpload.findMany({
        where: { jsonDepartmentId: departmentId },
        select: {
          id: true,
          json: true,
          createdAt: true,
          jsonDepartmentId: true,
        },
      });
  
      return { JsonUploads: jsonUploads };
    } catch (error) {
      throwAppropriateError(error);
    }
  }