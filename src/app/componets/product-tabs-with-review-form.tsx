
"use client";
import { useState } from "react";
import { client } from "@/sanity/lib/client";
import ProductDescription from "./ProductDescription";
import { Star } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  description: string;
}

interface Product {
  _id: string;
  description: any;
  reviews: Review[];
}

const tabs = [
  { id: "description", label: "Description" },
  { id: "reviews", label: "Reviews" },
  { id: "shipment", label: "Shipment & Return" },
];

const ProductTabsWithReviewForm = ({ product }: { product: Product }) => {
  const [productData, setProductData] = useState<Product>(product);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const fetchUpdatedProduct = async () => {
    try {
      const updatedProduct = await client.fetch(
        `*[_id == "${product._id}"][0]{_id, description, reviews}`
      );
      setProductData(updatedProduct);
    } catch (error) {
      console.error("Error fetching updated product:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          name,
          rating,
          description,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setName("");
        setRating(0);
        setDescription("");
        fetchUpdatedProduct();
      } else {
        console.error("API error:", data.error);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="p-6 border rounded-xl bg-[#fdf7ee] shadow-md">
      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-3 py-2 font-medium text-sm transition-all
              ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-6">
        {/* Description Tab */}
        {activeTab === "description" && (
          <ProductDescription description={product.description} />
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <label className="block mb-2 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <label className="block mb-2 font-medium text-gray-700">
                Rating
              </label>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>

              <label className="block mb-2 font-medium text-gray-700">
                Review
              </label>
              <textarea
                placeholder="Write your review..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit Review
              </button>

              {submitted && (
                <p className="text-green-500 mt-3">
                  ✅ Review submitted successfully!
                </p>
              )}
            </form>

            {/* Reviews List */}
            <h3 className="text-lg font-semibold mt-8 mb-4">
              Customer Reviews ({productData.reviews?.length || 0})
            </h3>
            <div className="space-y-4">
              {productData.reviews?.map((r, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg shadow-sm bg-white"
                >
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-yellow-400">
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </p>
                  <p className="text-gray-700 mt-1">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shipment Tab */}
        {activeTab === "shipment" && (
          <div className="text-gray-700 space-y-4 leading-relaxed">
            <p>
              <strong>20 DAYS EXCHANGE & RETURN POLICY:</strong> We have a simple
              Return policy of 20 days. Contact us via email and we’ll respond
              within 24 hours. After 20 days no return is accepted.
            </p>
            <p>
              <strong>RETURN & EXCHANGE POLICY:</strong> Email
              info@thegenuineleather.com within 24 hours to initiate a return.
              Canceling after 24 hours incurs a 25% fee.
            </p>
            <p>
              <strong>CANCELLATION OF THE ORDERS:</strong> Check your size
              before purchasing. If incorrect, email us at
              contact@thegenuineleather.com.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabsWithReviewForm;
