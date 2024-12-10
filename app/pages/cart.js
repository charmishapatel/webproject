"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import cartIcon from "../assets/images/cart.png";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);  // Cart items state

  // Function to add item to the cart (to be called from HomePage)
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  // Function to remove item from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="h-20 flex items-center justify-between px-10" style={{ backgroundColor: "#E7CCCC" }}>
        <Link href="/" className="text-xl font-bold text-black hover:text-gray-600">
          Home
        </Link>
        <div className="flex items-center space-x-6">
          <Image
            src={cartIcon}
            alt="Cart"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </div>
      </header>

      <div className="m-5">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-5">
          {cartItems.length === 0 ? (
            <p className="text-center text-black mt-10">Your cart is empty.</p>
          ) : (
            cartItems.map((product) => (
              <div key={product.id} className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                <div className="relative w-full h-60">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-bold text-black">{product.title}</h2>
                  <p className="text-gray-600 mt-2">${product.price}</p>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="mt-4 text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
