// types.ts
import {
    
    
    Prisma,
  } from "@prisma/client";
  
  export type AddManagerData = {
    managerFirstName: string;
    managerLastName: string;
    managerEmail: string;
    managerPassword: string;
  };
  
  export const requiredFields: (keyof AddManagerData)[] = [
    "managerFirstName",
    "managerLastName",
    "managerEmail",
    "managerPassword",
  ];
  export type Manager = {
    Manager:Prisma.ManagerGetPayload<{select: {
      managerId: true,
      managerFirstName: true,
      managerLastName: true,
      managerEmail: true,
      managerIsActivated: true,
      managedDepartments: {
        select: {
          managedDepartment: {
            select: {
              departmentName: true
            }
          }
        }
      }
    }}>
  }
  export type Managers = {
    Managers:Prisma.ManagerGetPayload<{select: {
        managerId: true,
        managerFirstName: true,
        managerLastName: true,
        managerEmail: true,
        managerIsActivated: true,
        managedDepartments: {
          select: {
            managedDepartment: {
              select: {
                departmentName: true
              }
            }
          }
        }
      },}>[]
  }  