import { NextRequest, NextResponse } from "next/server";
import { queryDatabase } from "./controller";
import { DatabaseRequestData, requiredDatabaseFields } from "./types";
import { handleError } from "@/lib/error-handler/handleError";
import { getUser } from "@/lib/token/getUserFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authenticate user
    const user = getUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    // console.log("the reequest arrive")
    // Parse request body

    const data: DatabaseRequestData = await request.json();
    console.log(data)
    // Validate required fields
    const missingFields = requiredDatabaseFields.filter(
      (field) => !data[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `${missingFields.join(", ")}: are required` },
        { status: 400 }
      );
    }
    console.log(data)
    // Query the database

    const result = await queryDatabase(data);
    console.log(result)

    // Return success response with the queried data
    return NextResponse.json(result, { status: 200 });

  } catch (error) {
    return handleError(error);
  }
}

