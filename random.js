"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

toast.configure();

export default function HomePage() {
    const [sortOption, setSortOption] = useState("All");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await fetch("https://api.escuelajs.co/api/v1/products");
                const data = await response.json();

                // Filter products with valid images
                let filteredData = data.filter(product => {
                    const imageUrl = product.images && product.images[0];
                    return imageUrl && imageUrl.startsWith("http");
                });

                // Apply category filtering if not "All"
                if (sortOption !== "All" && !sortOption.startsWith("Price") && sortOption !== "Alphabetical") {
                    filteredData = filteredData.filter(product => product.category.name === sortOption);
                } else {
                    // Limit to 8 products for "All"
                    filteredData = filteredData.sort(() => 0.5 - Math.random()).slice(0, 8);
                }

                // Apply sorting
                if (sortOption === "Price: Low to High") {
                    filteredData.sort((a, b) => a.price - b.price);
                } else if (sortOption === "Price: High to Low") {
                    filteredData.sort((a, b) => b.price - a.price);
                } else if (sortOption === "Alphabetical") {
                    filteredData.sort((a, b) => a.title.localeCompare(b.title));
                }

                setFilteredProducts(filteredData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        }

        fetchProducts();
    }, [sortOption]);

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
            <Header onFilterChange={setSortOption} selectedCategory={sortOption} />

            <div className="flex justify-between items-center p-5">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                >
                    <option value="All">All Categories</option>
                    <option value="Clothes">Clothes</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Shoes">Shoes</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option disabled>──────────</option>
                    <option value="Price: Low to High">Price: Low to High</option>
                    <option value="Price: High to Low">Price: High to Low</option>
                    <option value="Alphabetical">Alphabetical</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-5">
                {filteredProducts.length === 0 ? (
                    <p className="text-center text-black mt-10">No products found.</p>
                ) : (
                    filteredProducts.map(product => {
                        const productImage = product.images[0];
                        const imageUrl = productImage && productImage.startsWith("http")
                            ? productImage
                            : "https://placeimg.com/640/480/any"; // Fallback image

                        return (
                            <div
                                key={product.id}
                                className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
                            >
                                <div className="relative w-full h-60">
                                    <Image
                                        src={imageUrl}
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
                                            href={`/ItemDetails/?id=${product.id}`}
                                            className="flex-1 text-center text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            View Details
                                        </Link>

                                        <button
                                            className="flex-1 text-center text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                                            onClick={() =>
                                                toast.success(`${product.title} added to cart!`, {
                                                    position: toast.POSITION.BOTTOM_RIGHT,
                                                })
                                            }
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
