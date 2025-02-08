import { NextRequest, NextResponse } from "next/server";
import { addDepartment, getAllDepartments } from "@/app/api/main/departments/controller";
import { AddDepartmentData, requiredDepartmentFields } from "@/app/api/main/departments/types";
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    

    const data: AddDepartmentData = await request.json();
    const missingFields = requiredDepartmentFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
    
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }
     await addDepartment(
      data,
      user.companyId,
      
    );

    return NextResponse.json(
      { message: "department created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    

    const Departments = await getAllDepartments(user.companyId);
    return NextResponse.json(Departments, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}