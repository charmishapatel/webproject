import fetch from 'node-fetch'; // Use fetch in a Node.js environment

async function createMultipleProducts() {
    const sampleProducts = [
        {
            title: "Stylish Hat",
            price: 25,
            description: "A fashionable hat for all occasions.",
            categoryId: 1, // Category: Clothes
            images: ["https://placeimg.com/640/480/fashion"],
        },
        {
            title: "Modern Sneakers",
            price: 50,
            description: "Comfortable and stylish sneakers.",
            categoryId: 3, // Category: Shoes
            images: ["https://placeimg.com/640/480/shoes"],
        },
        {
            title: "Elegant Watch",
            price: 150,
            description: "A timeless piece to complete your look.",
            categoryId: 4, // Category: Accessories
            images: ["https://placeimg.com/640/480/accessories"],
        },
        {
            title: "Wireless Headphones",
            price: 100,
            description: "Experience music without limits.",
            categoryId: 5, // Category: Electronics
            images: ["https://placeimg.com/640/480/tech"],
        },
        {
            title: "Luxury Sofa",
            price: 800,
            description: "Comfort and style combined.",
            categoryId: 2, // Category: Furniture
            images: ["https://placeimg.com/640/480/furniture"],
        },
    ];

    try {
        for (const product of sampleProducts) {
            const response = await fetch("https://api.escuelajs.co/api/v1/products/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`Added product: ${data.title}`);
            } else {
                console.error(`Failed to add product: ${product.title}`);
            }
        }
    } catch (error) {
        console.error("Error adding products:", error);
    }
}

createMultipleProducts();
