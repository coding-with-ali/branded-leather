

'use client';

import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  image: any;
  price: number;
  discountPercentage?: number;
  rating?: number;
  reviewCount?: number;
}

const RelatedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const query = `*[_type == "product"]{
          _id,
          name,
          image,
          priceUSD,
          discountPercentage,
          reviews
        }`;

        const fetched = await client.fetch(query);

        const formatted: Product[] = fetched.map((p: any) => ({
          _id: p._id,
          name: p.name,
          image: p.image,
          price: parseFloat(p.priceUSD || "0"),
          discountPercentage: p.discountPercentage || 0,
          rating: Array.isArray(p.reviews) && p.reviews.length
            ? p.reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / p.reviews.length
            : 0,
          reviewCount: p.reviews?.length || 0,
        }));

        // Shuffle and limit to 8
        const randomProducts = formatted.sort(() => 0.5 - Math.random()).slice(0, 8);

        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

  if (loading) return <div>Loading related products...</div>;

  if (!products.length) return <div>No related products found.</div>;

  return (
    <div className="py-5 mt-8 lg:mx-10">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {products.map((product) => {
          const rating = product.rating ?? 0;
          const reviewCount = product.reviewCount ?? 0;
          const discount = product.discountPercentage ?? 0;
          const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);

          return (
            <article
                  key={product._id}
                  className="h-fit lg:w-[280px] relative flex flex-col bg-white border border-gray-200 shadow-md rounded overflow-hidden"
                >
                  <div className="absolute top-2 left-2 bg-[#3b0a0a] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase z-10">
                    Free Delivery
                  </div>

                  {discount > 0 && (
                    <div className="absolute top-2 right-2 md:right-6 text-xs font-bold text-black bg-white px-2 py-1 rounded shadow">
                      {discount}% OFF
                    </div>
                  )}

                  <Link href={`/Pages/ShopGridDynamic/product/${product._id}`} className="flex flex-col flex-1">
                    <div className="w-full h-[236px] bg-[#f6f7fb] flex items-center justify-center">
                      <Image
                        src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
                        alt={product.name}
                        width={178}
                        height={178}
                        className="w-[200px] h-[200px] object-cover"
                        priority
                      />
                    </div>

                    <div className="p-3 flex flex-col gap-1">
                      {/* Mobile (max 20 characters) */}
                      <h3 className="text-sm font-bold text-black leading-snug block lg:hidden">
                        {product.name.length > 15 ? product.name.slice(0, 15) + '...' : product.name}
                      </h3>

                      {/* Laptop/Desktop (max 25 characters) */}
                      <h3 className="text-sm lg:text-base font-bold text-black leading-snug hidden lg:block">
                        {product.name.length > 25 ? product.name.slice(0, 25) + '...' : product.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        {discount > 0 && (
                          <span className="line-through text-gray-500 text-sm">${originalPrice}</span>
                        )}
                        <span className="text-black font-bold text-md">${product.price.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={16}
                            className={
                              idx + 1 <= Math.round(rating)
                                ? 'fill-yellow-500 stroke-yellow-500'
                                : 'stroke-gray-300'
                            }
                          />
                        ))}
                      </div>

                      <span className="text-xs text-gray-500">{reviewCount} reviews</span>
                    </div>
                  </Link>
                </article>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
