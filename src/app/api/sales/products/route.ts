import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/error-handler/handleError";
// import { getUser } from "@/lib/token/getUserFromToken";


export async function GET(request: NextRequest) {
  try {
    console.log(request)
    // const user = getUser(request);
    // if (!user) {
    //     console.log(user)
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      
    // }

    const products = [
      {
        name: "iPhone 15 Pro",
        price: 523,
        change: -12,
        category: "mobile",
        sales: 1250
      },
      {
        name: "MacBook Air M2",
        price: 20000,
        change: 30,
        category: "laptop",
        sales: 450
      },
      {
        name: "Apple Watch Series 9",
        price: 13500,
        change: 7,
        category: "wearable",
        sales: 850
      },
      {
        name: "MacBook Pro 5",
        price: 32871,
        change: -2,
        category: "laptop",
        sales: 320
      }
    ];

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}