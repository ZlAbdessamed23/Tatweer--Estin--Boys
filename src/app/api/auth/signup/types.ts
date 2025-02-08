import { Prisma } from "@prisma/client";

export type AdminSignupData = {
  adminFirstName: string;
  adminLastName: string;
  adminPassword: string;
  adminEmail: string;
  companyName: string;
  companyLocation: string;
  companyPhoneNumber: string;
  companyEmail: string;
  companyEmployeeNumber: number;
  planName: string;
};

export const requiredFields: (keyof AdminSignupData)[] = [
  "adminFirstName",
  "adminLastName",
  "adminPassword",
  "adminEmail",
  "companyName",
  "companyLocation",
  "companyPhoneNumber",
  "companyEmail",
  "companyEmployeeNumber",
  "planName",
];


export type AdminSignupResult = {
  admin: Prisma.AdminGetPayload<{
    include: {
      managedCompany: {
        include: {
          companySubscription: true;
        };
      };
      emailVerificationToken: true;
    };
  }>;
 
};
