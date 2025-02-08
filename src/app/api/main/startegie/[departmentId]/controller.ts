import { Prisma } from "@prisma/client";
import { StrategieResult, UpdateStrategieData } from "./types";
import prisma from "@/lib/prisma/prismaClient";
import { throwAppropriateError } from "@/lib/error-handler/throwError";
export async function updateStrategie(
    DepartmentId: string,
    data: UpdateStrategieData
  ): Promise<StrategieResult> {
    try {
      return await prisma.$transaction(async (prisma) => {
        // First check if Strategie exists
        const StrategieExists = await prisma.departmentStrategies.findFirst({
          where: { departmentStrategieId: DepartmentId },
        });
  
        if (!StrategieExists) {
          throw new Error(`Strategie with ID ${StrategieExists} not found`);
        }
  
        const updateData: Prisma.DepartmentStrategiesUpdateInput = {};
        
        // Basic fields update
        if (data.strategieContent !== undefined) updateData.strategieContent = data.strategieContent;
       
        
        // Update Strategie if there are changes
        if (Object.keys(updateData).length > 0) {
          const updatedStrategie = await prisma.departmentStrategies.update({
            where: { departmentStrategieId: DepartmentId },
            data: updateData,
            select:{
                strategieContent: true,
               
                
                
                date: true,
                departmentStrategieId: true,
              } 
           
          });
  
          return { Strategie: updatedStrategie };
        }
        
        // If no changes, fetch and return existing Strategie
        const existingStrategie = await prisma.departmentStrategies.findUniqueOrThrow({
          where: { departmentStrategieId: DepartmentId },
          select:{
            strategieContent: true,
           
            
            
            date: true,
            departmentStrategieId: true,
          }  
          
        });
  
        return { Strategie: existingStrategie };
      });
    } catch (error) {
      throwAppropriateError(error);
    }
  }