import { Prisma } from "@prisma/client";

export type UpdateTaskData = {
  taskTitle?: string;
  taskDescription?: string;
  taskDueDate?: Date;
  taskStatus?: string;
  

  
};
export type TaskResult = {
    Task: Prisma.TaskGetPayload<{
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
  
    }>;
  };