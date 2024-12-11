"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "../pages/header";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const router = useRouter();
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch product details");
          }
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  if (loading) {
    return <div className="text-center text-xl p-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-5">Error: {error}</div>;
  }

  return (
    <div>
      <Header onFilterChange={() => {}} selectedCategory="All" cartCount={cart.length} />
      <div className="bg-gray-100 min-h-screen p-5 flex justify-center">
        {product ? (
          <div className="max-w-4xl bg-white shadow-lg rounded-lg p-5">
            <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
            <img
              src={product.image}
              alt={product.title}
              className="w-1/3 h-auto object-contain rounded-md mb-4 mx-auto"
            />
            <p className="text-lg text-gray-800 mb-2">{product.description}</p>
            <p className="text-xl font-semibold mb-2">${product.price}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>

            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => router.back()}
              >
                Back
              </button>
              <button
                className="flex-1/2 text-center text-white bg-green-400 px-4 py-2 rounded hover:bg-green-600"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Product not found</div>
        )}
      </div>
    </div>
  );
};

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails />
    </Suspense>
  );
}
