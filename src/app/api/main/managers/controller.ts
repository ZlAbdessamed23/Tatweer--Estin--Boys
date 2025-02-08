import prisma from "@/lib/prisma/prismaClient";
import {
  AddManagerData,
  Manager,
  Managers,

} from "@/app/api/main/managers/types";
import bcrypt from "bcrypt";
import {
  ConflictError,
  SubscriptionError,
  ValidationError,
  LimitExceededError,
  ForbiddenError
} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { generateVerificationToken } from "@/lib/third-party/email/generateVerificationToken";

export async function addManager(
  data: AddManagerData,
  companyId: string
): Promise<Manager> {
  try {
    if (!data.managerEmail || !data.managerPassword) {
      throw new ValidationError("Email and password are required");
    }

    return await prisma.$transaction(async (prisma) => {
      // Parallel fetch of company data, manager count, and existing manager check
      const [company, managerCount, existingManager] = await Promise.all([
        prisma.company.findUnique({
          where: { companyId },
          include: {
            companySubscription: {
              include: {
                subscriptionPlan: true,
              },
            },
          },
        }),
        prisma.manager.count({
          where: { managerCompanyId: companyId },
        }),
        prisma.manager.findUnique({
          where: { managerEmail: data.managerEmail },
          select: {
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
          }
        }),
      ]);

      // Validation checks
      if (!company) throw new ValidationError("Company not found");
      if (!company.companySubscription?.subscriptionPlan)
        throw new SubscriptionError("Company has no active subscription");
      if (managerCount >= company.companySubscription.subscriptionPlan.planMaxManagers) {
        throw new LimitExceededError(
          "Maximum number of managers for this plan has been reached"
        );
      }
      if (existingManager) {
        throw new ConflictError("A manager with this email already exists");
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.managerPassword, 10);

      // Create manager
      const newManager = await prisma.manager.create({
        data: {
          managerFirstName: data.managerFirstName,
          managerLastName: data.managerLastName,
          managerEmail: data.managerEmail,
          managerPassword: hashedPassword,
          managerCompanyId: companyId,
          managerIsActivated: false
        },
        select: {
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
        }
      });

      // Generate token and create verification token
      const token = generateVerificationToken(newManager.managerId);

      await Promise.all([
        prisma.emailVerificationToken.create({
          data: {
            emailVerificationTokenToken: token,
            emailVerificationTokenManagerId: newManager.managerId,
            emailVerificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        }),

      ]);

      return { Manager: newManager };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}



export async function getAllManagers(companyId: string): Promise<Managers> {
  try {
    const managers = await prisma.manager.findMany({
      where: { managerCompanyId: companyId },
      select: {
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
      },
    });

    return { Managers: managers };
  } catch (error) {
    throwAppropriateError(error);
    throw error;
  }
}

// Update the types to match your schema
export function checkAdminRole(role: string) {
  if (role !== "admin") {
    throw new ForbiddenError("Only the Administrator can perform this action");
  }
}