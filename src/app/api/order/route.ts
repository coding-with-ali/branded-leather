
import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orderData = await req.json();

    const sanityOrder = {
      _type: "order",
      orderNumber: `ORD-${Math.floor(Math.random() * 100000)}`,
      customerName: orderData.customerName,
      email: orderData.email,
      address: orderData.address,
      city: orderData.city,
      phone: orderData.phone,
      postalCode: orderData.postalCode,
      totalPrice: orderData.totalPrice,
      status: orderData.status,
      orderDate: orderData.orderDate,
      products: orderData.products.map((item: any) => ({
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,  
        image: item.image,
      })),
    };

    await client.create(sanityOrder);
    return NextResponse.json({ message: "Order placed successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error submitting order:", error.message || error);
    return NextResponse.json({ message: "Failed to place order", error: error.message || error }, { status: 500 });
  }
}
