import { NextRequest, NextResponse } from "next/server";
import { addJsonUpload } from "@/app/api/main/externConnection/jsonUpload/controller";
import { AddJsonUploadData, requiredJsonUploadFields } from "@/app/api/main/externConnection/jsonUpload/types";
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    

    const data: AddJsonUploadData = await request.json();
    const missingFields = requiredJsonUploadFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
    
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }
     await addJsonUpload(
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

