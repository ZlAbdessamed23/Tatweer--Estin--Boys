import { DepartementType, Prisma } from "@prisma/client";

export type AddDepartmentData = {
  departmentName: string;
  departmentType: DepartementType
  managerAccess: {
    managerId: string;
  }[];
};

export const requiredDepartmentFields: (keyof AddDepartmentData)[] = [
  "departmentName",
  "departmentType",
  "managerAccess",
];

export type DepartmentResult = {
  Department: Prisma.DepartmentGetPayload<{
    select: {
      departmentId: true;
      departmentName: true;
      departmentType: true;
    };
  }>;
};

export type DepartmentsResult = {
  Departments: Prisma.DepartmentGetPayload<{
    select: {
      departmentId: true;
      departmentName: true;
      departmentType: true;
      departmentManagers : true;
    };
  }>[];
};