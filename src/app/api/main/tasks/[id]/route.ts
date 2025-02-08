import { getUser } from "@/lib/token/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { updateTask, getTaskById, deleteTask } from "@/app/api/main/tasks/[id]/controller";
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

    const taskId = params.id;
    const task = await getTaskById(taskId, );

    return NextResponse.json(task, { status: 200 });
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
    

    const taskId = params.id;
     await deleteTask(
      taskId,
      
     
      
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
    const taskId = params.id;
    const updateData = await request.json();

     await updateTask(
      taskId,
      
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