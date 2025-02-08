import prisma from "@/lib/prisma/prismaClient";
import { AdminWithCompanyResult } from "./types";
import { NotFoundError } from "@/lib/error-handler/customeErrors";
import { throwAppropriateError } from "@/lib/error-handler/throwError";

export async function getAdminById(
  adminId: string
): Promise<AdminWithCompanyResult> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { adminId },
      select: {
        adminId: true,
        adminFirstName: true,
        adminLastName: true,
        adminEmail: true,
        
        managedCompany: {
          select: {
            
            companyName: true,
            companyEmployeeNumber: true,
            companyLocation: true,
            companyPhoneNumber: true,
            companyEmail: true,
          },
        },
      },
    });

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    return { Admin: admin };
  } catch (error) {
    throwAppropriateError(error);
  }
}

export async function getAdminByEmail(
  email: string
): Promise<AdminWithCompanyResult> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { adminEmail: email },
      select: {
        adminId: true,
        adminFirstName: true,
        adminLastName: true,
        adminEmail: true,
        adminIsActivated: true,
        managedCompany: {
          select: {
            companyId: true,
            companyName: true,
            companyEmployeeNumber: true,
            companyLocation: true,
            companyPhoneNumber: true,
            companyEmail: true,
          },
        },
      },
    });

    if (!admin) {
      throw new NotFoundError("Admin not found");
    }

    return { Admin: admin };
  } catch (error) {
    throwAppropriateError(error);
  }
}