'use client';

import Image from "next/image";
import Link from "next/link";
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
  FaFacebook,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import ProductTabsWithReviewForm from "../../../../componets/product-tabs-with-review-form";
import RelatedProducts from "../../../../componets/RelatedProducts";

interface Review {
  name: string;
  description: string;
  rating: number;
}

interface Product {
  _id: string;
  name: string;
  price: string;
  oldPrice?: number;
  description: string;
  category: string;
  image: any;
  quantity: number;
  reviews: Review[];
  size: string;
  sizeOptions?: string[];
}

const calculateAverageRating = (reviews: Review[] = []) => {
  if (reviews.length === 0) return 0;
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
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) return;

    const getProduct = async () => {
      try {
        const data = await client.fetch(
          `*[_type == "product" && _id == $id][0]{
            _id, name, priceUSD, description, category, image, reviews,
            sizeOptions,
            "price": priceUSD
          }`,
          { id: productId }
        );

        if (data) {
          setProduct({ ...data, quantity: 1, size: '', price: Number(data.priceUSD) });
          if (data.sizeOptions && data.sizeOptions.length > 0) {
            setSelectedSize(data.sizeOptions[0]);
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
      dispatch(add({ ...product, size: selectedSize, quantity }));
    }
  };

  const averageRating = product?.reviews ? calculateAverageRating(product.reviews) : 0;

  if (loading) {
    return <div className="w-full h-screen flex justify-center items-center"><p className="text-lg font-semibold">Loading product details...</p></div>;
  }

  if (!product) {
    return <div className="w-full h-screen flex justify-center items-center"><p className="text-lg text-red-500 font-semibold">Product not found.</p></div>;
  }

  return (
    <div>
      {/* Banner */}
      <div className="w-full h-[286px] bg-black relative">
        <div className="absolute top-48 left-10 md:top-20 md:left-60">
          <h2 className="text-white font-[forte] text-[26px] md:text-[36px] font-[700]">Product Details</h2>
          <Link href="/" className="px-2 text-white">Home</Link>
          <span className="px-2 text-white">/</span>
          <span className="text-white text-[16px] font-[500] px-2">Product Details</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="max-w-7xl mx-auto p-6 my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="w-full border rounded-xl p-4 shadow-md bg-white">
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg object-cover w-full"
            />
          </div>

          {/* Details */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              {renderStars(averageRating)}
              <span className="text-sm text-gray-500">({product.reviews?.length || 0} reviews)</span>
            </div>

            <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{product.category}</span></p>

            {/* Price */}
            <div className="text-2xl font-semibold text-green-600">
              ${Number(product.price).toFixed(2)}
              {product.oldPrice && (
                <span className="text-base line-through text-red-400 ml-3">
                  ${Number(product.oldPrice).toFixed(2)}
                </span>
              )}
            </div>

            {/* Size Selection */}
            {product.sizeOptions && product.sizeOptions.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Select Size:</p>
                <div className="flex gap-2">
                  {product.sizeOptions.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-1 border rounded-md ${selectedSize === size ? 'bg-black text-white' : ''} hover:bg-black hover:text-white transition`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <p className="font-semibold">Quantity:</p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-20 border px-2 py-1 rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full font-bold text-black transition"
              >
                🛒 Add to Cart
              </button>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mt-6">Description:</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </div>

            {/* Social Share */}
            <div className="flex gap-4 mt-6">
              <Link href={`https://facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? window.location.href : ""}`} target="_blank">
                <FaFacebook className="text-blue-600 text-2xl" />
              </Link>
              <Link href="https://instagram.com" target="_blank">
                <FaInstagram className="text-pink-500 text-2xl" />
              </Link>
              <Link href={`https://linkedin.com/shareArticle?url=${typeof window !== "undefined" ? window.location.href : ""}`} target="_blank">
                <FaLinkedin className="text-blue-700 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Related Products */}
      <div className="md:mx-14 lg:mx-48">
        <ProductTabsWithReviewForm product={product} />
      </div>
      <div className="mx-8 md:mx-20 lg:mx-48">
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
