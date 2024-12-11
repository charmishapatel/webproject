"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "./header";

export default function HomePage() {
    const [sortOption, setSortOption] = useState("Price: Low to High");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cart, setCart] = useState([]);

    
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await fetch("https://fakestoreapi.com/products");
                const data = await response.json();

              
                let filteredData = data.filter(product => product.image && product.image.startsWith("http"));

              
                if (selectedCategory !== "All") {
                    filteredData = filteredData.filter(product => product.category === selectedCategory);
                } else {
                    filteredData = filteredData.sort(() => 0.5 - Math.random()).slice(0, 8);
                }

                setFilteredProducts(filteredData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }
        fetchProducts();
    }, [selectedCategory]);

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };
    

    const sortProducts = (option) => {
        setSortOption(option);
        const sorted = [...filteredProducts].sort((a, b) => {
            if (option === "Price: Low to High") {
                return a.price - b.price;
            } else if (option === "Price: High to Low") {
                return b.price - a.price;
            } else {
                return a.title.localeCompare(b.title);
            }
        });
        setFilteredProducts(sorted);
    };

    const handleAddToCart = (product) => {
        const updatedCart = [...cart, { ...product, quantity: 1 }];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-5">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="border rounded-lg shadow animate-pulse">
                        <div className="bg-gray-300 w-full h-60 rounded-t-lg"></div>
                        <div className="p-4">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header onFilterChange={setSelectedCategory} selectedCategory={selectedCategory} cartCount={cartCount} />
            <div className="flex justify-between items-center p-5">
                <div className="flex space-x-4 items-center">
                    <select
                        value={sortOption}
                        onChange={(e) => sortProducts(e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                    >
                        <option>Filter</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Alphabetical</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-5">
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-black mt-10">No products found.</p>
                ) : (
                    filteredProducts.map((product) => (
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
                                <div className="mt-4 flex space-x-4">
                                    <Link
                                        href={`/productDetails?id=${product.id}`}
                                        className="flex-1 text-center text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        className="flex-1 text-center text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}