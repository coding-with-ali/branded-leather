// // "use client";
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // interface CartItem {
// //   _id: string;
// //   name: string;
// //   price: number;
// //   image: string;
// //   quantity: number;
// //   size?: string; // Optional, but used in logic
// // }

// // const cartSlice = createSlice({
// //   name: "Cart",
// //   initialState: [] as CartItem[],
// //   reducers: {
// //     add(state, action: PayloadAction<CartItem>) {
// //       const existingItem = state.find(
// //         (item) => item._id === action.payload._id && item.size === action.payload.size
// //       );
// //       if (existingItem) {
// //         existingItem.quantity += action.payload.quantity;
// //       } else {
// //         state.push(action.payload);
// //       }
// //     },

// //     updateQuantity(
// //       state,
// //       action: PayloadAction<{ _id: string; size?: string; quantity: number }>
// //     ) {
// //       const item = state.find(
// //         (item) => item._id === action.payload._id && item.size === action.payload.size
// //       );
// //       if (item) {
// //         item.quantity = action.payload.quantity;
// //       }
// //     },

// //     remove(
// //       state,
// //       action: PayloadAction<{ _id: string; size?: string }>
// //     ) {
// //       return state.filter(
// //         (item) => !(item._id === action.payload._id && item.size === action.payload.size)
// //       );
// //     },
// //   },
// // });

// // export const { add, updateQuantity, remove } = cartSlice.actions;
// // export default cartSlice.reducer;



// "use client";
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   size?: string; // Optional, but used in logic
// }

// // ✅ Initial State with localStorage support
// const initialState: CartItem[] =
//   typeof window !== "undefined" && localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart") as string)
//     : [];

// const cartSlice = createSlice({
//   name: "Cart",
//   initialState,
//   reducers: {
//     add(state, action: PayloadAction<CartItem>) {
//       const existingItem = state.find(
//         (item) =>
//           item._id === action.payload._id && item.size === action.payload.size
//       );
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity;
//       } else {
//         state.push(action.payload);
//       }
//       localStorage.setItem("cart", JSON.stringify(state)); // ✅ Save to localStorage
//     },

//     updateQuantity(
//       state,
//       action: PayloadAction<{ _id: string; size?: string; quantity: number }>
//     ) {
//       const item = state.find(
//         (item) =>
//           item._id === action.payload._id && item.size === action.payload.size
//       );
//       if (item) {
//         item.quantity = action.payload.quantity;
//       }
//       localStorage.setItem("cart", JSON.stringify(state)); // ✅ Update localStorage
//     },

//     remove(state, action: PayloadAction<{ _id: string; size?: string }>) {
//       const newState = state.filter(
//         (item) =>
//           !(item._id === action.payload._id && item.size === action.payload.size)
//       );
//       localStorage.setItem("cart", JSON.stringify(newState)); // ✅ Save new state
//       return newState;
//     },

//     clearCart() {
//       localStorage.removeItem("cart");
//       return [];
//     },
//   },
// });

// export const { add, updateQuantity, remove, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

// SSR ke waqt safe empty state rakhenge
const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      return action.payload;
    },

    add(state, action: PayloadAction<CartItem>) {
      const existingItem = state.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ _id: string; size?: string; quantity: number }>
    ) {
      const item = state.find(
        (item) =>
          item._id === action.payload._id && item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    remove(state, action: PayloadAction<{ _id: string; size?: string }>) {
      const newState = state.filter(
        (item) =>
          !(item._id === action.payload._id && item.size === action.payload.size)
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    },

    clearCart() {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
      return [];
    },
  },
});

export const { add, updateQuantity, remove, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
