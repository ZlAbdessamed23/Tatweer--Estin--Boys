import prisma from "@/lib/prisma/prismaClient";
import bcrypt from "bcrypt";

import {
  AdminSignupData,
  AdminSignupResult,
} from "@/app/api/auth/signup/types";
import {
  ValidationError,
  NotFoundError,
  ConflictError,

} from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
import { PrismaClient } from "@prisma/client";


export async function createAdmin(
  data: AdminSignupData
): Promise<AdminSignupResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
      const { existingAdmin, existingPlan } = await validateAdminData(
        data,
        prisma
      );
      if (existingAdmin) {
        throw new ConflictError("An administrator with this email already exists");
      }
      if (!existingPlan) {
        throw new NotFoundError("The plan is not valid");
      }

      const hashedPassword = await hashPassword(data.adminPassword);
      const subscriptionData = getSubscriptionData(existingPlan.planName);

      const createdAdmin = await createAdminWithCompany(
        data,
        hashedPassword,
        subscriptionData,
        prisma
      );
      

      return { admin: createdAdmin };
    });
  } catch (error) {
    throwAppropriateError(error);
  }
}

async function validateAdminData(
  data: AdminSignupData,
  prisma: Omit<
    PrismaClient,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >
) {
  const [existingAdmin, existingPlan] = await Promise.all([
    prisma.admin.findUnique({ where: { adminEmail: data.adminEmail } }),
    prisma.plan.findFirst({
      where: { planName: data.planName },
      select: { planName: true },
    }),
  ]);
  return { existingAdmin, existingPlan };
}

async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

function getSubscriptionData(planName: string): { endDate?: Date } {
  switch (planName) {
    case "Free":
      return {
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 50), // 50 years
      };
    case "Premium":
      return {};
    case "Standard":
      return {
        endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
      };
    default:
      throw new ValidationError(`le type de plan est non valide : ${planName}`);
  }
}



export async function createAdminWithCompany(
    data: AdminSignupData,
    hashedPassword: string,
    subscriptionData: { endDate?: Date },
    prisma: Omit<
      PrismaClient,
      "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
    >
  ) {
    if (!subscriptionData.endDate) {
      throw new ValidationError("endDate is required in subscription");
    }
  
    // First, get the Plan ID based on the plan name
    const plan = await prisma.plan.findFirst({
      where: {
        planName: data.planName
      }
    });
  
    if (!plan) {
      throw new ValidationError(`Plan with name ${data.planName} not found`);
    }
  
    return await prisma.admin.create({
      data: {
        adminFirstName: data.adminFirstName,
        adminLastName: data.adminLastName,
        adminEmail: data.adminEmail,
        adminPassword: hashedPassword,
        
        managedCompany: {
          create: {
            companyName: data.companyName,
            companyLocation: data.companyLocation,
            companyPhoneNumber: data.companyPhoneNumber,
            companyEmail: data.companyEmail,
            companyEmployeeNumber: data.companyEmployeeNumber,
            companySubscription: {
              create: {
                subscriptionEndDate: subscriptionData.endDate,
                subscriptionPlan: {
                  connect: {
                    planId: plan.planId
                  }
                }
              }
            }
          }
        }
      },
      include: {
        managedCompany: {
          include: {
            companySubscription: true,

          }
        },
        emailVerificationToken: true
      }
    }) as AdminSignupResult['admin'];
  }


