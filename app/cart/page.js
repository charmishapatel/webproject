"use client";
import { useState, useEffect } from "react";
import Payment from "../payment/page";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [isCheckout, setIsCheckout] = useState(false); 

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const calculateTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    const handleRemoveFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

   
    const handleCheckout = () => {
        setIsCheckout(true); 
    };

    return (
        <div className="bg-gray-100 min-h-screen p-10">
            {isCheckout ? (
                <Payment cart={cart} total={calculateTotal()} />
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-center mb-5">Your Cart</h1>
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-600">Your cart is empty!</p>
                    ) : (
                        <div>
                            <ul>
                                {cart.map((product) => (
                                    <li key={product.id} className="flex justify-between items-center p-4 border-b">
                                        <div className="flex items-center">
                                            <img src={product.image} alt={product.title} width={50} height={50} className="object-cover" />
                                            <span className="ml-4">{product.title}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="mr-4">x{product.quantity}</span>
                                            <span className="mr-4">${(product.price * product.quantity).toFixed(2)}</span>
                                            <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveFromCart(product.id)}>
                                                Remove
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between mt-5 font-bold text-xl">
                                <span>Total:</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="mt-5 flex justify-center">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleCheckout}>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
