import { Prisma } from "@prisma/client";

// Type for admin data including company information
export type AdminWithCompanyResult = {
  Admin: Prisma.AdminGetPayload<{
    select: {
      adminId: true;
      adminFirstName: true;
      adminLastName: true;
      adminEmail: true;
      
      managedCompany: {
        select: {
          
          companyName: true;
          companyEmployeeNumber: true;
          companyLocation: true;
          companyPhoneNumber: true;
          companyEmail: true;
        };
      };
    };
  }>;
};