import { DepartementType, Prisma } from "@prisma/client";

export type AddDepartmentData = {
  departmentName?  :         string;
      departmentType?   :        DepartementType,
  managerAccess?: {
    managerId: string;
  }[];
};

export type DepartmentResult = {
  Department: Prisma.DepartmentGetPayload<{select:{
    departmentId: true;
    departmentName: true;
    departmentType: true;
    departmentJsons: {select:{json:true}};
    departmentConnections: {select:{databaseConnectionConnectionString:true}};
  }}> | null;
};