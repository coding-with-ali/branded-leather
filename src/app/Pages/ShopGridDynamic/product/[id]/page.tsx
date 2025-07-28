'use client';

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { add } from "../../../../redux/cartslice";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaHeadset,
  FaRulerCombined,
  FaUndo
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ProductTabsWithReviewForm from "../../../../componets/product-tabs-with-review-form";
import RelatedProducts from "../../../../componets/RelatedProducts";
import Question from "@/app/Pages/HomePage/Question";
import Notification from "../../../../componets/notification";

interface Reviews {
  name: string;
  description: string;
  rating: number;
}

interface ProductDetailBlock {
  title: string;
  content: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;             // ✅ Now number
  priceUSD: number;
  discountPercentage?: number;
  description: any;
  category: string;
  image: any;
  quantity: number;
  reviews: Reviews[];
  size: string;
  sizeOptions?: string[];
  stockLevel: number;
  colors?: string[];
  productDetails?: ProductDetailBlock[];
}

const calculateAverageRating = (reviews?: Reviews[] | null) => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

const renderStars = (rating: number = 0) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  return (
    <div className="flex space-x-1 text-yellow-500">
      {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => <FaRegStar key={i} />)}
    </div>
  );
};

const ProductDetail: React.FC = () => {
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [expandedDetailIndex, setExpandedDetailIndex] = useState<number | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) return;

    const getProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product" && _id == $id][0]{
              _id,
              name,
              priceUSD,
              discountPercentage,
              description,
              "category": category->name,
              image,
              reviews,
              sizeOptions,
              stockLevel,
              colors,
              productDetails
            }`,
          { id: productId }
        );

        if (data) {
          setProduct({
            ...data,
            price: data.priceUSD,   // ✅ Set price explicitly
            quantity: 1,
            size: '',
          });

          if (data.sizeOptions && data.sizeOptions.length > 0) {
            setSelectedSize(data.sizeOptions[0]);
          }
          if (data.colors && data.colors.length > 0) {
            setSelectedColor(data.colors[0]);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        add({
          ...product,
          price: product.priceUSD,   // ✅ Ensure correct price in cart
          size: selectedSize,
          quantity,
        })
      );
    }
  };

  const [selectedTab, setSelectedTab] = useState("Men");

  if (loading) {
    return (
      <div className="bg-[#fdf7ee] w-full h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#fdf7ee] w-full h-screen flex justify-center items-center">
        <p className="text-lg text-red-500 font-semibold">Product not found.</p>
      </div>
    );
  }

  const averageRating = calculateAverageRating(product.reviews);
  const discount = product.discountPercentage || 0;
  const basePrice = product.priceUSD || 0;

  const originalPrice = discount
    ? (basePrice / (1 - discount / 100)).toFixed(2)
    : basePrice.toFixed(2);

  return (
    <div>
      {/* Coupon Banner */}
      {discount > 0 && (
        <div className="bg-yellow-100 text-center py-3 text-lg font-semibold text-gray-800">
          🎉 Limited Offer! Save {discount}% Today!
        </div>
      )}

      <div className="bg-[#fdf7ee] max-w-7xl mx-auto p-6 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Product Image */}
          <div className="w-full border rounded-xl p-4 shadow-md bg-white">
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg object-cover w-full"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <span className="text-sm text-gray-500">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-1">
              {discount > 0 && (
                <span className="line-through text-green-600 text-sm">${originalPrice}</span>
              )}
              <span className="text-red-400 font-bold text-md">
                ${basePrice.toFixed(2)}
              </span>
            </div>

            {/* Stock */}
            <p className={`text-sm font-medium ${product.stockLevel > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stockLevel > 0 ? "✔ In Stock" : "Out of Stock"}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Select Color:</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-1 border rounded-md ${selectedColor === color ? "bg-black text-white" : ""
                        } hover:bg-black hover:text-white transition`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold mb-1">Select Size:</p>
                  <button
                    onClick={() => setShowSizeChart(true)}
                    className="text-blue-600 text-sm underline"
                  >
                    Size Chart
                  </button>
                </div>
                <div className="flex gap-2">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-1 border rounded-md ${selectedSize === size ? "bg-black text-white" : ""
                        } hover:bg-black hover:text-white transition`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex items-center gap-3">
                <p className="font-semibold">Quantity:</p>
                <input
                  type="number"
                  min="1"
                  max={product.stockLevel}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 border px-2 py-1 rounded-full"
                />
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mt-4 md:mt-0">
                <Notification
                  product={{
                    _id: product._id,
                    name: product.name,
                    quantity,
                    image: product.image,
                    price: product.priceUSD,
                  }}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>


            {/* ✅ Support & Services Section */}
            <div className="mt-6">
              <div className="p-4 border-2 rounded-lg shadow-sm bg-[#fdf7ee] flex flex-row gap-5 items-center">
                <FaHeadset className="text-2xl text-blue-600 mb-2" />
                <p className="text-base font-medium text-gray-700">
                  24/7 online dedicated support
                </p>
              </div>

              <div className="p-4 border-2 rounded-lg shadow-sm bg-[#fdf7ee] flex flex-row gap-5 items-center">
                <FaRulerCombined className="text-2xl text-green-600 mb-2" />
                <p className="text-base font-medium text-gray-700">
                  Can create custom sizes & changes
                </p>
              </div>

              <div className="p-4 border-2 rounded-lg shadow-sm bg-[#fdf7ee] flex flex-row gap-5 items-center">
                <FaUndo className="text-2xl text-red-600 mb-2" />
                <p className="text-base font-medium text-gray-700">
                  20 days easy, risk-free returns
                </p>
              </div>
            </div>


            <div className="mt-4">
              <div className="border-b py-2">
                <button
                  className="w-full text-left flex justify-between items-center"
                  onClick={() =>
                    setExpandedDetailIndex(expandedDetailIndex === 0 ? null : 0)
                  }
                >
                  <span className="font-bold">Product Care</span>
                  <span>{expandedDetailIndex === 0 ? "-" : "+"}</span>
                </button>
                {expandedDetailIndex === 0 && (
                  <p className="text-gray-600 text-sm mt-2">
                    To maintain the beauty of your leather bags and jackets,
                    regularly clean them with a soft cloth and use a quality
                    leather conditioner to keep them supple and protected from
                    moisture.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] md:w-[600px] relative">
            <button
              onClick={() => setShowSizeChart(false)}
              className="absolute top-2 right-2 text-gray-600"
            >
              <IoMdClose size={24} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Size Chart</h2>

            {/* Tabs */}
            <div className="flex justify-center space-x-4 border-b mb-4">
              {["Men", "Women", "Guide"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${selectedTab === tab
                    ? "border-b-2 border-blue-600 font-bold"
                    : "text-gray-500"
                    }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex justify-center">
              {selectedTab === "Men" && (
                <Image
                  src="/men-size.webp"
                  alt="Men Size Chart"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              )}

              {selectedTab === "Women" && (
                <Image
                  src="/women-size.webp"
                  alt="Women Size Chart"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              )}

              {selectedTab === "Guide" && (
                <Image
                  src="/size-guid.png"
                  alt="General Size Guide"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}


      {/* Tabs & Related Products */}
      <div className="md:mx-14 lg:mx-48">
        <ProductTabsWithReviewForm product={product} />
      </div>
      <div>
        <Question />
      </div>
      <div className="mx-1 md:mx-20 lg:mx-48">
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
