// app/ItemDetails/[id].js

"use client"; // This makes the component a client component

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Header from '../components/header';

export default function ItemDetails({ params }) {
    const { id } = params; // Get dynamic route parameter from params
    const [product, setProduct] = useState(null); // To hold product details

    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
            const data = await response.json();
            setProduct(data);
        }

        fetchProduct();
    }, [id]); // Re-run when the id changes

    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <button
                onClick={() => window.history.back()} // Using window.history for navigation
                className="text-black border border-gray-300 px-4 py-2 rounded hover:bg-gray-200 ml-5 mt-5"
            >
                ← Back
            </button>

            <div className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10">
                <div className="flex-1">
                    <Image
                        src={product.images[0]} // Assuming the product has an 'images' field
                        alt={product.title}
                        width={400}
                        height={400}
                        className="rounded-lg shadow-lg ml-8 mt-10"
                    />
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-black mb-2">{product.title}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-black mb-4">${product.price}</p>

                    {/* Color and Size selection */}
                    <div className="mb-4">
                        <h2 className="text-lg font-medium text-black mb-2">Choose Color:</h2>
                        <div className="flex space-x-4">
                            {/* Example color options */}
                            {['Red', 'Blue', 'Green', 'Black'].map((color) => (
                                <div
                                    key={color}
                                    className={`w-8 h-8 rounded-full border-2 cursor-pointer`}
                                    style={{ backgroundColor: color.toLowerCase() }}
                                    onClick={() => setSelectedColor(color)}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Size selection */}
                    <div className="mb-4">
                        <h2 className="text-lg font-medium text-black mb-2">Choose Size:</h2>
                        <div className="flex space-x-4">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className={`px-4 py-2 rounded border ${selectedSize === size ? "border-black bg-gray-200" : "border-gray-300"}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
                            Add to Cart
                        </button>
                        <button className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
