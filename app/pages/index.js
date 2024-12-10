"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";

export default function HomePage() {
    const [sortOption, setSortOption] = useState("Price: Low to High");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true); // Start loading
                const response = await fetch("https://api.escuelajs.co/api/v1/products");
                const data = await response.json();
    
                let filteredData = data.filter(product => product.images && product.images[0]?.startsWith("http"));
    
                if (selectedCategory !== "All") {
                    filteredData = filteredData.filter(product => product.category.name === selectedCategory);
                } else {
                    filteredData = filteredData.sort(() => 0.5 - Math.random()).slice(0, 8);
                }
    
                setFilteredProducts(filteredData); // Update the state with filtered products
                setLoading(false); // Stop loading
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }
    
        fetchProducts();
    }, [selectedCategory]);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingProductIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header onFilterChange={setSelectedCategory} selectedCategory={selectedCategory} cartCount={cartCount} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-5">
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-black mt-10">No products found.</p>
                ) : (
                    filteredProducts.map((product) => {
                        const productImage = product.images[0];
                        const imageUrl = productImage && productImage.startsWith("http") ? productImage : "https://placeimg.com/640/480/any";
                        return (
                            <div key={product.id} className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
                                <div className="relative w-full h-60">
                                    <Image src={imageUrl} alt={product.title} fill className="object-cover rounded-t-lg" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold text-black">{product.title}</h2>
                                    <p className="text-gray-600 mt-2">${product.price}</p>
                                    <div className="mt-4 flex space-x-4">
                                        <Link href={`/ItemDetails/?id=${product.id}`} className="flex-1 text-center text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                                            View Details
                                        </Link>

                                        
                                        <button
                                            className="flex-1 text-center text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                                            onClick={() => {
                                                handleAddToCart(product);
                                                alert(`${product.title} added to cart!`);
                                            }}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
