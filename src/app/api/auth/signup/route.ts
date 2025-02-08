import { NextRequest, NextResponse } from "next/server";
import { AdminSignupData, requiredFields } from "./types";
import { handleError } from "@/lib/error-handler/handleError";
import {
  createAdmin,
  
} from "@/app/api/auth/signup/controller";


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data: AdminSignupData = await req.json();

    const missingFields = requiredFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
          console.log(missingFields.length)
          console.log(missingFields)
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }
   
     await createAdmin(data);

   

    return NextResponse.json(
      {
        message:
          "Your Administrator account has been successfully created, please check your inbox to complete the action",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}
//////send verification email