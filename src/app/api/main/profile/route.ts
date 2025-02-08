import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { getAdminById } from "./controller";

export async function GET(request: NextRequest) {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    
     
    const Departments = await getAdminById(user.id);
    return NextResponse.json(Departments, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}