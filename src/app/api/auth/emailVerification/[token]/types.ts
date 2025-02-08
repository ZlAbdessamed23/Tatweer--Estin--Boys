import { Prisma } from "@prisma/client";

export type EmailVerificationResult =
  | {
      status: "success";
      user: Prisma.AdminGetPayload<{select:{
        adminId: true,
        adminEmail: true,
        adminFirstName: true,
        adminLastName: true,
       
        adminIsActivated: true,
      }}> | Prisma.ManagerGetPayload<{select:{
        managerId: true,
        managerEmail: true,
        managerFirstName: true,
        managerLastName: true,
       
        managerIsActivated: true,
      }}> 
    }
  | { status: "invalid" }
  | { status: "expired" };