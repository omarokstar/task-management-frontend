import { NextResponse } from "next/server";
import { getReportsSummaryFromBackend } from "@/lib/backendApi";

export async function GET() {
  try {
    const summary = await getReportsSummaryFromBackend();
    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch reports summary." } },
      { status: 500 }
    );
  }
}
