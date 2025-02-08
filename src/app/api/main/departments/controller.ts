import prisma from "@/lib/prisma/prismaClient";
import { AddDepartmentData, DepartmentResult, DepartmentsResult } from "./types";
import {
  NotFoundError,
  LimitExceededError,
  SubscriptionError,
} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";

export async function addDepartment(
  data: AddDepartmentData,
  companyId: string
  
): Promise<DepartmentResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      // Verify company and subscription
      const company = await prisma.company.findUnique({
        where: { companyId },
        select: {
          companySubscription: {
            select: {
              subscriptionPlan: {
                select: {
                  planMaxDepartments: true,
                },
              },
            },
          },
          _count: { select: { companyDepartments: true } },
        },
      });

      // Validation checks
      if (!company) throw new NotFoundError("Entreprise non trouvée");
      if (!company.companySubscription?.subscriptionPlan)
        throw new SubscriptionError("L'entreprise n'a pas d'abonnement actif");
      if (company._count.companyDepartments >= company.companySubscription.subscriptionPlan.planMaxDepartments) {
        throw new LimitExceededError(
          "Le nombre maximum de départements pour ce plan est déjà atteint"
        );
      }

     
      // Filter valid manager access
      const validManagerAccess = data.managerAccess.filter(
        (ma) => ma.managerId !== ""
      );

      // Create department with its relationships
      const createdDepartment = await prisma.department.create({
        data: {
          departmentName: data.departmentName,
          departmentType: data.departmentType,
          parentCompany: { connect: { companyId } },
          departmentManagers: {
            create: [
              // Connect the creating manager
              // Connect additional managers
              ...validManagerAccess.map((ma) => ({
                departmentManager: { connect: { managerId: ma.managerId } },
              })),
            ],
          },
          // Create associated table
          departmentTables: {
            create: {
              tableName: `${data.departmentName} Table`,
              
            },
          },
          departmentstartegies:{
            create: {
              strategieContent: "hello from chamso",
              

              
            },
          }
        },
        select: {
          departmentId: true,
          departmentName: true,
          departmentType: true,
          
        },
      });

      return { Department: createdDepartment };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

export async function getAllDepartments(
  companyId: string
): Promise<DepartmentsResult> {
  try {
    const departments = await prisma.department.findMany({
      where: { departmentCompanyId: companyId },
      select: {
        departmentId: true,
        departmentName: true,
        departmentType: true,
        departmentManagers : true
      },
    });

    return { Departments: departments };
  } catch (error) {
    throwAppropriateError(error);
  }
}