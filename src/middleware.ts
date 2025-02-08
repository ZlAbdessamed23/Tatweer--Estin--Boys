import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTVerifyResult } from "jose";
import {
  CustomError,
  UnauthorizedError,
  SubscriptionError,
  AuthenticationError,
} from "@/lib/error-handler/customeErrors";
import { handleError } from "@/lib/error-handler/handleError";

import { DecodedToken } from "./lib/token/decodedToken";
export async function middleware(request: NextRequest) {
  // console.log("inside middleware");
  // Only apply this middleware to /api/main routes
  if (!request.nextUrl.pathname.startsWith("/api/main")) {
    // console.log("don't need middleware");
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  // console.log(token);

  if (!token) {
    return handleError(new AuthenticationError("Authentication required"));
  }

  try {
    // console.log(process.env.JWT_COMPANY_SECRET);
    const secret = new TextEncoder().encode(process.env.JWT_COMPANY_SECRET); // Correct variable
const { payload } = (await jwtVerify(token, secret)) as JWTVerifyResult & {
  payload: DecodedToken;
};
    // console.log("after decode");

    // Check if token is expired
    if (Date.now() >= payload.exp * 1000) {
      throw new UnauthorizedError("Token has expired");
    }

    // Check if subscription has ended
    const subscriptionEndDate = new Date(payload.endDate);
    if (subscriptionEndDate < new Date()) {
      throw new SubscriptionError("Subscription has ended");
    }

    // Attach the user information to the request via headers
    const response = NextResponse.next();
    response.headers.set("x-user-data", JSON.stringify(payload));
    return response;
  } catch (error) {
    if (error instanceof CustomError) {
      return handleError(error);
    }
    if (error instanceof Error) {
      if (error.name === "JWTExpired") {
        return handleError(new UnauthorizedError("Token has expired"));
      } else if (error.name === "JWTInvalid") {
        return handleError(new AuthenticationError("Invalid token"));
      }
    }
    return handleError(new AuthenticationError("Invalid token"));
  }
}

export const config = {
  matcher: "/api/main/:path*",
};