// import { NextResponse } from "next/server";
// import { client } from "@/sanity/lib/client";

// export async function POST(req: Request) {
//   try {
//     const orderData = await req.json();

//     const sanityOrder = {
//       _type: "order",
//       orderNumber: `ORD-${Math.floor(Math.random() * 100000)}`,
//       customerName: orderData.customerName,
//       email: orderData.email,
//       address: orderData.address,
//       city: orderData.city,
//       postalCode: orderData.postalCode,
//       totalPrice: orderData.totalPrice,
//       status: orderData.status,
//       orderDate: orderData.orderDate,
//       products: orderData.products.map((item: { _id: string; name: string; price: number; quantity: number; image: string; }) => ({
//         _type: "object",
//         _ref: item._id,
//         id: item._id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         image: item.image,
//       })),
//     };

//     await client.create(sanityOrder);
//     return NextResponse.json({ message: "Order placed successfully!" }, { status: 200 });
//   } catch (error) {
//     console.error("Error submitting order:", error);
//     return NextResponse.json({ message: "Failed to place order" }, { status: 500 });
//   }
// }



// app/api/order/route.ts
import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

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
      postalCode: orderData.postalCode,
      totalPrice: orderData.totalPrice,
      status: orderData.status || "pending",
      orderDate: orderData.orderDate || new Date().toISOString(),
      products: orderData.products.map((item: {
        _id: string;
        name: string;
        price: string;
        quantity: number;
        image: string;
      }) => ({
        _type: "object",
        _ref: item._id, // Optional: link to product if it exists in Sanity
        id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    };

    await client.create(sanityOrder);

    return NextResponse.json(
      { message: "Order placed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting order:", error);
    return NextResponse.json(
      { message: "Failed to place order", error },
      { status: 500 }
    );
  }
}
