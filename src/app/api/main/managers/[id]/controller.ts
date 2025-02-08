import prisma from "@/lib/prisma/prismaClient";
import {
  Manager,
  UpdateManagerData,
} from "@/app/api/main/managers/[id]/types";

import {
  ForbiddenError,
  NotFoundError,
} from "@/lib/error-handler/customeErrors";

import { throwAppropriateError } from "@/lib/error-handler/throwError";
import {
  
  Prisma,
 
} from "@prisma/client";
import bcrypt from "bcrypt";


///////////////////// get user by id /////////////////////////////////
export async function getManagerById(
  managerId: string,
 
): Promise<Manager> {
  try {
    const Manager = await prisma.manager.findFirst({
      where: {
        managerId: managerId,
        
      },
      select: {
        managerFirstName: true,

    managerLastName: true,
    managerEmail: true,
    managerIsActivated: true,
    managerPassword: true,
        
      },
    });

    if (!Manager) {
      throw new NotFoundError("Employée non trouvé");
    }

    return { Manager: Manager };
  } catch (error) {
    throwAppropriateError(error);
  }
}
//////////////////////// delete user by id //////////////////////////////////////
export async function deleteManagerById(
  ManagerId: string,
  
): Promise<Manager> {
  try {
    const deletedManager = await prisma.manager.delete({
      where: {
        managerId: ManagerId,
        
      },
      select: {
        managerFirstName: true,

    managerLastName: true,
    managerEmail: true,
    managerIsActivated: true,
    managerPassword: true
      },
    });

    

    return { Manager: deletedManager };
  } catch (error) {
    throwAppropriateError(error);
  }
}

////////////////////////////// update ///////////////////////////////////

export async function updateManager(
  ManagerId: string,
  
  data: UpdateManagerData
): Promise<Manager> {
  try {
    const updateData: Prisma.ManagerUpdateInput = {};

    // Map UpdateManagerData to ManagerUpdateInput
    if (data.managerFirstName) {
      updateData.managerFirstName = data.managerFirstName;
    }
    if (data.managerLastName) {
      updateData.managerLastName = data.managerLastName;
    }
    if (data.managerPassword) {
      updateData.managerPassword = await hashPassword(data.managerPassword);
    }

    const updatedManager = await prisma.manager.update({
      where: {
        managerId: ManagerId,
      },
      data: updateData,
      select: {
        
        managerFirstName: true,

    managerLastName: true,
    managerEmail: true,
    managerIsActivated: true,
    managerPassword: true
      },
    });

    return { Manager: updatedManager };
  } catch (error) {
    throwAppropriateError(error);
  }
}


async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throwAppropriateError(error);
  }
}
export function checkAdminRole(role: string) {
    if (role !== "admin") {
      throw new ForbiddenError("Only the Administrator can perform this action");
    }
  }