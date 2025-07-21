

import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({ name: "orderNumber", title: "Order Number", type: "string" }),
    defineField({ name: "customerName", title: "Customer Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }), // ✅ Added phone field
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
    defineField({ name: "totalPrice", title: "Total Price", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["pending", "shipped", "delivered"] },
    }),
    defineField({ name: "orderDate", title: "Order Date", type: "datetime" }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          type: "object",
          name: "productItem",
          fields: [
            defineField({ name: "key", title: "Key", type: "string" }),
            defineField({ name: "id", title: "Product ID", type: "string" }),
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "price", title: "Price", type: "number" }),
            defineField({ name: "quantity", title: "Quantity", type: "number" }),
            defineField({ name: "image", title: "Image", type: "image" }),
          ],
        },
      ],
    }),
  ],
});
