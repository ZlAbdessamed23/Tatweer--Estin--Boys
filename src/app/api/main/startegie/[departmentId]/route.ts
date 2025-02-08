import { updateStrategie } from "@/app/api/main/startegie/[departmentId]/controller"
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { departmentId: string } }
): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Non Authorisé" }, { status: 401 });
    }
    const departmentId = params.departmentId;
    const updateData = await request.json();

     await updateStrategie(
      departmentId,
      
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