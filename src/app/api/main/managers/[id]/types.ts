
import {
 
  Prisma,
} from "@prisma/client";





export type UpdateManagerData = {
    managerFirstName?: string;
    managerLastName?: string;
    
    managerPassword?: string;
  
};
export type Manager ={
  Manager : Prisma.ManagerGetPayload<{select:{
    managerFirstName: true,

    managerLastName: true,
    managerEmail: true,
    managerIsActivated: true,
    managerPassword: true}}>
}