import { Prisma } from "@prisma/client";

export type AddTaskData = {
  taskTitle: string;
  taskDescription: string;
  taskDueDate: Date;
  taskStatus: string;
  taskManager: string
};

export const requiredTaskFields: (keyof AddTaskData)[] = [
  "taskTitle",
  "taskDescription",
  "taskManager",
  "taskDescription"
];

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

export type TasksResult = {
  Tasks: Prisma.TaskGetPayload<{
    select: {
      taskId: true;
      taskTitle: true;
      taskDescription: true;
      taskManager: {
        select: {
          managerId: true;
          managerFirstName: true;

        }
      }
    }
  }>[];
};