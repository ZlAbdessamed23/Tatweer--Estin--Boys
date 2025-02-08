import prisma from "@/lib/prisma/prismaClient";
import { TaskResult, UpdateTaskData } from "@/app/api/main/tasks/[id]/types";
import {
  NotFoundError,
  
} from "@/lib/error-handler/customeErrors";

import {   Prisma } from "@prisma/client";
import { throwAppropriateError } from "@/lib/error-handler/throwError";

export async function updateTask(
    taskId: string,
    data: UpdateTaskData
  ): Promise<TaskResult> {
    try {
      return await prisma.$transaction(async (prisma) => {
        // First check if task exists
        const taskExists = await prisma.task.findUnique({
          where: { taskId },
        });
  
        if (!taskExists) {
          throw new Error(`Task with ID ${taskId} not found`);
        }
  
        const updateData: Prisma.TaskUpdateInput = {};
        
        // Basic fields update
        if (data.taskTitle !== undefined) updateData.taskTitle = data.taskTitle;
        if (data.taskDescription !== undefined) updateData.taskDescription = data.taskDescription;
        if (data.taskDueDate !== undefined) updateData.taskDueDate = new Date(data.taskDueDate);
        if (data.taskStatus !== undefined) updateData.taskStatus = data.taskStatus;
        
        // Update task if there are changes
        if (Object.keys(updateData).length > 0) {
          const updatedTask = await prisma.task.update({
            where: { taskId },
            data: updateData,
            select: {
              taskId: true,
              taskTitle: true,
              taskDescription: true,
              taskManager: {
                select: {
                  managerId: true,
                  managerFirstName: true,
                },
              },
            },
          });
  
          return { Task: updatedTask };
        }
        
        // If no changes, fetch and return existing task
        const existingTask = await prisma.task.findUniqueOrThrow({
          where: { taskId },
          select: {
            taskId: true,
            taskTitle: true,
            taskDescription: true,
            taskManager: {
              select: {
                managerId: true,
                managerFirstName: true,
              }
            }
          },
        });
  
        return { Task: existingTask };
      });
    } catch (error) {
      throwAppropriateError(error);
    }
  }


//////////////////////// get task by id ///////////////////////////////
export async function getTaskById(
  taskId: string,
 
  
): Promise<TaskResult> {
  try {
    const task = await prisma.task.findUnique({
      where: { taskId: taskId },
      select: {
        taskId: true,
        taskTitle: true,
        taskDescription: true,
        taskManager: {
          select: {
            managerId: true,
            managerFirstName: true,
          }
        }
      },  
      
    });

    if (!task) {
      throw new NotFoundError(`Task non trouvée`);
    }

    

    return { Task: task };
  } catch (error) {
    throw throwAppropriateError(error);
  }
}
///////////////////////// delete task //////////////////////////////////
export async function deleteTask(
  taskId: string,
  
 
 
): Promise<TaskResult> {
  try {
    return await prisma.$transaction(async (prisma) => {
     

      // Then delete the task
      const deletedTask = await prisma.task.delete({
        where: { taskId: taskId },
        select: {
            taskId: true,
            taskTitle: true,
            taskDescription: true,
            taskManager: {
              select: {
                managerId: true,
                managerFirstName: true,
              }
            }
          },  
      });
      
      return { Task: deletedTask };
    });
  } catch (error) {
    throw throwAppropriateError(error);
  }
}