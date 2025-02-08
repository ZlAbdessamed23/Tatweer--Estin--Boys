import { handleError } from "@/lib/error-handler/handleError";
import {  NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    // Create a response that will be used to clear the cookie
    const response = NextResponse.json(
      {
        message: "Déconnexion réussie",
        redirectUrl: `${process.env.SERVER_URL}/login`,
      },
      { status: 200 }
    );

    // Clear the hotelToken cookie
    response.cookies.set("companyToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return handleError(error);
  }
}