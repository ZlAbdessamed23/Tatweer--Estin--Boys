import prisma from "@/lib/prisma/prismaClient";
import { AddTaskData, TaskResult, TasksResult } from "@/app/api/main/tasks/types";


import { throwAppropriateError } from "@/lib/error-handler/throwError";


export async function addTask(
  data: AddTaskData,
  userId: string,
): Promise<TaskResult> {
  try {
    // Validate that taskDueDate is provided
    if (!data.taskDueDate) {
      throw new Error("taskDueDate must be provided");
    }

    const createdTask = await prisma.task.create({
      data: {
        taskTitle: data.taskTitle,
        taskDescription: data.taskDescription,
        taskDueDate: data.taskDueDate, // Ensure this is provided
        taskStatus: data.taskStatus,
        taskAdmin: {
          connect: {
            adminId: userId, // Connect to existing admin using userId
          },
        },
        taskManager: {
          connect: {
            managerId: data.taskManager, // Connect to existing manager
          },
        },
      },
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

    return { Task: createdTask };
  } catch (error) {
    throwAppropriateError(error);
  }
}

export async function getAllTasks(
  userId: string,



): Promise<TasksResult> {
  try {


    const tasks = await prisma.task.findMany({
      where: {
        taskAdminId: userId,
        // Use ternary to set the correct ID field based on role

      },
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
      }
    });

    return { Tasks: tasks };
  } catch (error) {
    throwAppropriateError(error);
  }
}
