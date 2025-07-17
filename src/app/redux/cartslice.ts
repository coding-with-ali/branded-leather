"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string; // Optional, but used in logic
}

const cartSlice = createSlice({
  name: "Cart",
  initialState: [] as CartItem[],
  reducers: {
    add(state, action: PayloadAction<CartItem>) {
      const existingItem = state.find(
        (item) => item._id === action.payload._id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ _id: string; size?: string; quantity: number }>
    ) {
      const item = state.find(
        (item) => item._id === action.payload._id && item.size === action.payload.size
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    remove(
      state,
      action: PayloadAction<{ _id: string; size?: string }>
    ) {
      return state.filter(
        (item) => !(item._id === action.payload._id && item.size === action.payload.size)
      );
    },
  },
});

export const { add, updateQuantity, remove } = cartSlice.actions;
export default cartSlice.reducer;
