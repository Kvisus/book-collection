"use client";
// import { Book } from "@/data/books";
// import {
//   Dispatch,
//   ReactNode,
//   createContext,
//   useContext,
//   useReducer,
// } from "react";

// interface CartState {
//   cart: Book[];
// }
// type CartAction = { type: "ADD_TO_CART"; payload: Book };
// const initialState: CartState = {
//   cart: [],
// };
// const CartContext = createContext<{
//   cartState: CartState;
//   dispatch: Dispatch<CartAction>;
// }>({ cartState: initialState, dispatch: () => null });

// const cartReducer = (cartState: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...cartState,
//         cart: [...cartState.cart, action.payload],
//       };
//     default:
//       return cartState;
//   }
// };

// const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartState, dispatch] = useReducer(cartReducer, {
//     cart: [],
//   });

//   const addToCard = (item: Book) => {
//     dispatch({ type: "ADD_TO_CART", payload: item });
//   };

//   return (
//     <CartContext.Provider value={{ cartState, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export { CartProvider, useCart };

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  FC,
} from "react";
import { Book } from "@/data/books";

// Define the shape of the cart state
interface CartState {
  // cart: Book[];
  cart: {
    book: Book;
    quantity: number;
  }[];
}

// Define the shape of the cart action
type CartAction = { type: "ADD_TO_CART"; payload: Book };

// Initial state of the cart
const initialState: CartState = {
  cart: [],
};

// Create the cart context with initial state and dispatch function
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function to update the cart state based on actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingBook = state.cart.findIndex(
        (item) => item.book.isbn === action.payload.isbn
      );

      if (existingBook !== -1) {
        const newCart = [...state.cart];
        // Incrementing quantity moved inside this block
        newCart[existingBook].quantity += 1;

        return {
          ...state,
          cart: newCart,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { book: action.payload, quantity: 1 }],
        };
      }
    default:
      return state;
  }
};

// Provider component to wrap the application with cart context
const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  // console.log(context.state.cart);
  return context;
};

export { CartProvider, useCart };
