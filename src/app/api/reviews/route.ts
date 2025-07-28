import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-10-01",
  token: process.env.SANITY_API_TOKEN, // server-only token
  useCdn: false,
});

export async function POST(req: Request) {
  try {
    const { productId, name, rating, description } = await req.json();

    if (!productId || !name || !rating) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const result = await sanity
      .patch(productId)
      .setIfMissing({ reviews: [] })
      .insert("after", "reviews[-1]", [{ name, rating, description }])
      .commit();

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Sanity API Error:", err);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
