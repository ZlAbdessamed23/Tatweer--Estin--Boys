import { NextResponse, NextRequest } from "next/server";
import { signIn } from "@/app/api/auth/signin/controller";
import { SignInData } from "@/app/api/auth/signin/types";
import { handleError } from "@/lib/error-handler/handleError";
import { requiredSignInFields } from "@/app/api/auth/signin/types";



export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
   console.log("hello from login")
    const data: SignInData = await req.json();
    const missingFields = requiredSignInFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
          console.log(missingFields)
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }

    const result = await signIn(data);

    
      const { user, token } = result;
      
      const response = NextResponse.json(
        {message:`Bienvenu ${ 'adminFirstName' in user ? user.adminFirstName : user.managerFirstName}`},
        { status: 200 }
      );

      

      response.cookies.set("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        secure: false,
        sameSite: "strict",
      });

      return response;
    
  } catch (error) {
    return handleError(error);
  }
}