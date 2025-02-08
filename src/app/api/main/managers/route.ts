import { NextRequest, NextResponse } from "next/server";
import { addManager, checkAdminRole, getAllManagers } from "./controller";
import { handleError } from "@/lib/error-handler/handleError";
import { AddManagerData, requiredFields } from "./types";

import { getUser } from "@/lib/token/getUserFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(user);
    checkAdminRole(user.role);

    const data: AddManagerData = await request.json();
    const missingField = requiredFields.find((field) => !data[field]);
    if (missingField) {
      return NextResponse.json(
        { message: `${missingField} is required` },
        { status: 400 }
      );
    }

    const Manager = await addManager(data,user.companyId);

    return NextResponse.json(Manager, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(user);
    checkAdminRole(user.role);
    const Managers = await getAllManagers(user.companyId);
    return NextResponse.json(Managers, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}