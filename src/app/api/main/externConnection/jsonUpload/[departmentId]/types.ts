import { Prisma } from "@prisma/client";

export type JsonUploadsResult = {
  JsonUploads: Prisma.JsonUploadGetPayload<{
    select: {
      id: true;
      json: true;
      createdAt: true;
      jsonDepartmentId: true;
    };
  }>[];
};