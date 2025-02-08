import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/error-handler/handleError";
import { verifyEmailToken, handleVerificationResult } from "@/app/api/auth/emailVerification/[token]/controller";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  if (!token) {
    return NextResponse.json(
      { message: "A verification token is required" },
      { status: 400 }
    );
  }

  try {
    const result = await verifyEmailToken(token);
    return handleVerificationResult(result);
  } catch (error) {
    return handleError(error);
  }
}