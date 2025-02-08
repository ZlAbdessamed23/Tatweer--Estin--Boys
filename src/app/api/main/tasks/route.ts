import { NextRequest, NextResponse } from "next/server";
import {
  addTask,
  getAllTasks,
  
} from "@/app/api/main/tasks/controller";
import { AddTaskData, requiredTaskFields } from "@/app/api/main/tasks/types";
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";


export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorise" }, { status: 401 });
    }
    
 
    const data: AddTaskData = await request.json();
    const missingFields = requiredTaskFields.filter(
          (field) => !data[field]
        );
    
        if (missingFields.length > 0) {
          
    
          return NextResponse.json(
            { message: `${missingFields.join(", ")}: sont requis` },
            { status: 400 }
          );
        }

    await addTask(data,  user.id);

    return NextResponse.json(
      {
        message: "task has been created successfully",
      },
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
    

    const tasks = await getAllTasks(user.id);
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}