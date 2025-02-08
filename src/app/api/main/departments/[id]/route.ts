import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { deleteDepartment,getDepartmentById,updateDepartment } from "@/app/api/main/departments/[id]/controller";
import { handleError } from "@/lib/error-handler/handleError";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }

    const DepartmentId = params.id;
    const Department = await getDepartmentById(DepartmentId, user.id, user.role);

    return NextResponse.json(Department, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    

    const departmentId = params.id;
     await deleteDepartment(
      departmentId,
      
      
      
    );

    return NextResponse.json(
      {
        message: "Tache supprimée avec succès",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    const DepartmentId = params.id;
    const updateData = await request.json();

     await updateDepartment(
      DepartmentId,
      
      updateData
    );

    return NextResponse.json(
      {
        message: "Tache mise à jour avec succès",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}