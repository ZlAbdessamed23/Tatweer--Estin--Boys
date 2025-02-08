import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prismaClient";

export async function POST(req: NextRequest) {
  try {
    const {
        planName  ,          
        planMaxAPICalls ,    
        planMaxManagers  ,   
        planMaxDepartments , 
        planAllowedAITypes , 
    } = await req.json();

    const plan = await prisma.plan.create({
      data: {
        planName  ,          
        planMaxAPICalls ,    
        planMaxManagers  ,   
        planMaxDepartments , 
        planAllowedAITypes , 
      },
    });

    if (!plan) {
      return NextResponse.json(
        { message: "Failed to create the plan" },
        { status: 400 }
      );
    }

    return NextResponse.json(plan, { status: 200 });
  } catch (error) {
    console.error("Error creating plan:", error);
    return NextResponse.json({ message: `${(error as Error).message}` }, { status: 500 });
  };
};