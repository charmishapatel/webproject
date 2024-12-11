"use client";

import { useState } from "react";
import Header from "../pages/header";

export default function Payment({ cart, total }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [errors, setErrors] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    
    const validateInputs = () => {
        const errors = {};

        if (!cardNumber || cardNumber.length !== 16) {
            errors.cardNumber = "Card number must be 16 digits";
        }

        if (!expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            errors.expiryDate = "Expiry date must be in MM/YY format";
        }

        if (!cvv || cvv.length !== 3) {
            errors.cvv = "CVV must be 3 digits";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    
    const handlePayment = (e) => {
        e.preventDefault();

        if (validateInputs()) {
            
            setPaymentSuccess(true);

            
            localStorage.removeItem("cart");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-10 flex justify-center items-center">
            {paymentSuccess ? (
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-500">Payment Successful</h2>
                    <p className="mt-4 text-lg">Thank you for your purchase!</p>
                </div>
            ) : (
                <div className="max-w-md w-full">
                    <h1 className="text-3xl font-bold text-center mb-5">Payment Details</h1>
                    <form onSubmit={handlePayment} className="space-y-5">
                      
                        <div className="mb-4">
                            <label htmlFor="cardNumber" className="block text-lg font-medium">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className={`w-full p-2 mt-2 border ${errors.cardNumber ? "border-red-500" : "border-gray-300"} rounded`}
                                placeholder="Enter card number"
                            />
                            {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                        </div>

                      
                        <div className="mb-4 flex">
                            <div className="mr-2 w-1/2">
                                <label htmlFor="expiryDate" className="block text-lg font-medium">Expiry Date</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    className={`w-full p-2 mt-2 border ${errors.expiryDate ? "border-red-500" : "border-gray-300"} rounded`}
                                    placeholder="MM/YY"
                                />
                                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                            </div>
                            <div className="w-1/2">
                                <label htmlFor="cvv" className="block text-lg font-medium">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className={`w-full p-2 mt-2 border ${errors.cvv ? "border-red-500" : "border-gray-300"} rounded`}
                                    placeholder="CVV"
                                />
                                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
                        >
                            Submit Payment
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}