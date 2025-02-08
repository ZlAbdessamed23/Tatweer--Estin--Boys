import { Prisma } from "@prisma/client";



export type UpdateStrategieData = {
    strategieContent?: string;
       
       
    
  
    
  };

export type StrategieResult = {
    Strategie: Prisma.DepartmentStrategiesGetPayload<{
      select:{
        strategieContent: true;
       
        date: true,
        
        departmentStrategieId: true;
      }  
  
    }>;
  };