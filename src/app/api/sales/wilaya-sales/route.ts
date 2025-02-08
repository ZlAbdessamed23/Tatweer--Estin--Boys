import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/error-handler/handleError";
// import { getUser } from "@/lib/token/getUserFromToken";

export async function GET(request: NextRequest) {
  try {
    // const user = getUser(request);
    // if (!user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    console.log(request)
    const wilayaSales =[
      {
        "name": "Algiers",
        "lng": 3.0588,
        "lat": 36.7538,
        "sales": 2500000,
        "growth": 12
      },
      {
        "name": "Oran",
        "lng": -0.6492,
        "lat": 35.6987,
        "sales": 1800000,
        "growth": 8
      },
      {
        "name": "Constantine",
        "lng": 6.6147,
        "lat": 36.365,
        "sales": 1200000,
        "growth": 15
      },
      {
        "name": "Annaba",
        "lng": 7.7436,
        "lat": 36.9264,
        "sales": 900000,
        "growth": 5
      },
      {
        "name": "Setif",
        "lng": 5.4149,
        "lat": 36.1898,
        "sales": 850000,
        "growth": 10
      }
    ]
    
    return NextResponse.json(wilayaSales, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}