// types/signin.types.ts

import { Prisma } from "@prisma/client";



export type SignInData = {
  userEmail: string;
  userPassword: string;
  userRole: "admin" | "manager";
};

export const requiredSignInFields: (keyof SignInData)[] = [
  "userEmail",
  "userPassword",
  "userRole",
];

export type Admin = Prisma.AdminGetPayload<{
  include: {
    managedCompany: { include: { companySubscription: { include: { subscriptionPlan: true } } } };
  };
}>;
export type Plan = Prisma.PlanGetPayload<{select:{
  planId: true,
  planName: true,
  planDescription: true,
  planPrice: true,
  planDuration: true,
  planStatus: true,
  planType: true,
  planFeatures: true,
  planCreatedAt: true,
  planUpdatedAt: true,
}}> 

export type Manager = Prisma.ManagerGetPayload<{
  include: {
    employingCompany: { include: { companySubscription: { include: { subscriptionPlan: true } } } };
  };
}>;

export type User = Admin | Manager;

// Define the structure for sign-in result
export type SignInResult =
  {
    user: User;
    token: string;

  }