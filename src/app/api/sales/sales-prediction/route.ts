import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/error-handler/handleError";
// import { getUser } from "@/lib/token/getUserFromToken";


export async function GET(request: NextRequest) {
  try {
    console.log(request)
    // const user = getUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const salesPrediction = [
      { month: "Jan", amount: 5000, predicted: 5200 },
      { month: "Feb", amount: 22000, predicted: 21000 },
      { month: "Mar", amount: 15000, predicted: 16000 },
      { month: "Apr", amount: 35000, predicted: 33000 },
      { month: "May", amount: 20000, predicted: 22000 },
      { month: "Jun", amount: 28000, predicted: 29000 },
      { month: "Jul", predicted: 31000 },
      { month: "Aug", predicted: 34000 },
      { month: "Sep", predicted: 28000 }
    ];

    return NextResponse.json(salesPrediction, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}