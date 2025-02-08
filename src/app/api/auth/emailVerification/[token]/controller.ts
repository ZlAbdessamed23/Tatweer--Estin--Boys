import prisma from "@/lib/prisma/prismaClient";
import { EmailVerificationResult } from "@/app/api/auth/emailVerification/[token]/types";
import { NextResponse } from "next/server";
import { VerificationError } from "@/lib/error-handler/customeErrors";
export async function verifyEmailToken(
  token: string
): Promise<EmailVerificationResult> {
  return prisma.$transaction(async (prisma) => {
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { emailVerificationTokenToken: token },
    });

    if (!verificationToken) {
      return { status: "invalid" };
    }

    if (verificationToken.emailVerificationTokenExpiresAt < new Date(Date.now())) {
      await prisma.emailVerificationToken.delete({ where: { emailVerificationTokenToken:token } });
      return { status: "expired" };
    }
    if (!verificationToken.emailVerificationTokenAdminId && !verificationToken.emailVerificationTokenManagerId) {
      return { status: "invalid" };
    }
    let user;
    if (verificationToken.emailVerificationTokenAdminId) {
      user = await prisma.admin.update({
        where: { adminId: verificationToken.emailVerificationTokenAdminId as string },
        data: { adminIsActivated: true },
        select:{
          adminId: true,
          adminEmail: true,
          adminFirstName: true,
          adminLastName: true,
          
          adminIsActivated: true,
        }
        
      });
    } else {
      user = await prisma.manager.update({
        where: { managerId: verificationToken.emailVerificationTokenManagerId as string },
        data: { managerIsActivated: true },
        select:{
          managerId: true,
          managerEmail: true,
          managerFirstName: true,
          managerLastName: true,
          
          managerIsActivated: true,
        }
      });
    }

    await prisma.emailVerificationToken.delete({ where: { emailVerificationTokenToken:token } });

    return { status: "success", user };
  });
}
export function handleVerificationResult(
  result: EmailVerificationResult
): NextResponse {
  switch (result.status) {
    case "invalid":
      throw new VerificationError("Jeton de vérification invalide", 400);
    case "expired":
      return NextResponse.json("success")
    case "success":
      return NextResponse.json("success")
    default:
      throw new VerificationError("Unhandled verification result status", 500);
  }
}