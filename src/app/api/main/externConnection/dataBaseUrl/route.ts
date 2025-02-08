import { NextRequest, NextResponse } from "next/server";
import {addDatabaseConnection } from "@/app/api/main/externConnection/dataBaseUrl/controller";
import { AddDatabaseConnectionData, requiredDatabaseConnectionFields } from "@/app/api/main/externConnection/dataBaseUrl/types";
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    

    const data: AddDatabaseConnectionData = await request.json();
    const missingFields = requiredDatabaseConnectionFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
    
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }
     await addDatabaseConnection(
      data,
      
      
    );

    return NextResponse.json(
      { message: "JsonUpload created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}

