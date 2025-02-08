import { NextRequest, NextResponse } from "next/server";
import {
  checkAdminRole,
  getManagerById,
  deleteManagerById,
  updateManager,
} from "@/app/api/main/managers/[id]/controller";
import { handleError } from "@/lib/error-handler/handleError";
import { UpdateManagerData } from "@/app/api/main/managers/[id]/types";

import { getUser } from "@/lib/token/getUserFromToken";

// ... keep your existing POST and GET routes ...

// New route to get an Manager by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    
    checkAdminRole(user.role);

    const ManagerId = (await params).id;
    const Manager = await getManagerById(ManagerId);

    return NextResponse.json(Manager, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// New route to delete an Manager by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    
    checkAdminRole(user.role);

    const ManagerId = (await params).id;
     await deleteManagerById(ManagerId);

    return NextResponse.json(
      { message: "Manager has been deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
////////////////////// update ///////////////////////
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    
    checkAdminRole(user.role);

    const ManagerId = (await params).id;
    const updateData: UpdateManagerData = await request.json();

     await updateManager(
      ManagerId,
      
      updateData
    );

    return NextResponse.json(
      { message: "Manager has been updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}