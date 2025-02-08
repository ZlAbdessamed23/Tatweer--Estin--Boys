import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { deleteDepartment,getDepartmentById,updateDepartment } from "@/app/api/main/departments/[type]/controller";
import { handleError } from "@/lib/error-handler/handleError";
import { DepartmentType } from "@/app/types/constant";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }

    const departmentType = params.type as DepartmentType;
    const Department = await getDepartmentById(user.companyId, departmentType, user.id,user.role);

    return NextResponse.json(Department, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}




export async function DELETE(
  request: NextRequest,
  { params }: { params: { type: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    

    const departmentType = params.type as DepartmentType;
     await deleteDepartment(
      user.companyId,
      departmentType,
      
      
      
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
  { params }: { params: { type: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    const departmentType = params.type as DepartmentType;
    const updateData = await request.json();

     await updateDepartment(
      user.companyId,
      departmentType,
      
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