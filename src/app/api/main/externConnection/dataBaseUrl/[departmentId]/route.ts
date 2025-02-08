import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { getDatabaseConnectionsByDepartment } from "./controller";

export async function GET(request: NextRequest,{ params }: { params: { departmentId: string } }) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    
     const departmentId = params.departmentId;
    const Departments = await getDatabaseConnectionsByDepartment(departmentId);
    return NextResponse.json(Departments, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}