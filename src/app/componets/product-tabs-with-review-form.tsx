"use client";
import { useState } from "react";
import { client } from "@/sanity/lib/client";

interface Review {
  name: string;
  rating: number;
  description: string;
}

interface Product {
  _id: string;
  description: string;
  reviews: Review[];
}

const ProductTabsWithReviewForm = ({ product }: { product: Product }) => {
  const [productData, setProductData] = useState<Product>(product); // Updated product data
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("description");

  // Function to fetch updated product data
  const fetchUpdatedProduct = async () => {
    try {
      const updatedProduct = await client.fetch(`*[_id == "${product._id}"][0]`);
      setProductData(updatedProduct);
    } catch (error) {
      console.error("Error fetching updated product:", error);
    }
  };

  // Handle review submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !rating) return;

    const newReview: Review = { name, rating, description };

    try {
      await client
        .patch(product._id)
        .setIfMissing({ reviews: [] })
        .insert("after", "reviews[-1]", [newReview]) // Append the new review
        .commit();

      setSubmitted(true);
      setName("");
      setRating(0);
      setDescription("");

      // Fetch updated product data from Sanity
      fetchUpdatedProduct();
    } catch (error) {
      console.error("Sanity Error:", error);
    }
  };

  return (
    <div className="p-6 border rounded-lg bg-[#F9F8FE]">
      <div className="flex space-x-4 border-b pb-2">
        {["Description", "Reviews"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 font-medium ${activeTab === tab.toLowerCase() ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === "description" && (
          <div>
            <p className="text-gray-700">{productData.description}</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {/* Review Submission Form */}
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded-md mb-2"
              />
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                className="w-full p-2 border rounded-md mb-2"
              />
              <textarea
                placeholder="Write a review"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Submit Review
              </button>
            </form>
            {submitted && <p className="text-green-500 mt-2">Review submitted successfully!</p>}
            <h3 className="text-xl font-semibold mb-2 mt-10">
              Customer Reviews ({productData.reviews?.length || 0})
            </h3>
            {productData.reviews?.map((r, index) => (
              <div key={index} className="mb-3 p-3 border rounded-md">
                <p className="font-semibold">{r.name}</p>
                <p className="text-yellow-500">{Array(r.rating).fill("★").join("")}</p>
                <p className="text-gray-700">{r.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabsWithReviewForm;
