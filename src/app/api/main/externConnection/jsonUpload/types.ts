/* eslint-disable */


import { Prisma } from "@prisma/client";

export type AddJsonUploadData = {
  json: any; // Consider being more specific about the JSON structure if possible
  jsonDepartmentId: string;
};

export const requiredJsonUploadFields: (keyof AddJsonUploadData)[] = [
  "json",
  "jsonDepartmentId"
];

export type JsonUploadResult = {
  JsonUpload: Prisma.JsonUploadGetPayload<{
    select: {
      id: true;
      json: true;
      createdAt: true;
      jsonDepartmentId: true;
    };
  }>;
};

