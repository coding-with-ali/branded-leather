// /app/api/trackOrder/route.ts
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderNumber = searchParams.get("id"); // better name

  console.log("Tracking Order Number:", orderNumber); // ✅ debug

  if (!orderNumber) {
    return NextResponse.json({ message: "Order ID missing" }, { status: 400 });
  }

  try {
    // GROQ query to match exact orderNumber string
    const query = `*[_type == "order" && orderNumber == $orderNumber][0]`;
    const order = await client.fetch(query, { orderNumber });

    console.log("Sanity Order Result:", order); // ✅ debug

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (error: any) {
    console.error("Track order error:", error.message || error);
    return NextResponse.json({ message: "Server error", error: error.message || error }, { status: 500 });
  }
}
