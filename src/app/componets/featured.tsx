
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  image: any;
  price: number;
  discountPercentage?: number;
  category?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
}

const Featured = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched: any[] = await client.fetch(`*[_type == "product" && isFeaturedProduct == true][0...4]{
          _id,
          name,
          image,
          priceUSD,
          discountPercentage,
          category->{title},
          description,
          reviews
        }`);

        const normalised: Product[] = fetched.map((p) => ({
          _id: p._id,
          name: p.name,
          image: p.image,
          price: parseFloat(p.priceUSD || '0'),
          discountPercentage: p.discountPercentage,
          category: p.category?.title || '',
          description: p.description,
          rating: Array.isArray(p.reviews) && p.reviews.length
            ? p.reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / p.reviews.length
            : 0,
          reviewCount: p.reviews?.length || 0,
        }));

        setProducts(normalised);
      } catch (err) {
        console.error('Error fetching featured products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className=" py-10 px-4 hidden md:block">
      <h2 className="text-[24px] md:text-[34px] lg:text-[44px] font-[Josefin Sans] text-center text-[#1A0B5B] font-[700]">
        Most Popular Products
      </h2>

      {/* Grid container */}
      <div className="w-full mt-10 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => {
              const rating = product.rating ?? 0;
              const reviewCount = product.reviewCount ?? 0;
              const discount = product.discountPercentage || 0;
              const originalPrice = discount
                ? (product.price / (1 - discount / 100)).toFixed(2)
                : product.price.toFixed(2);

              return (
                <article
                  key={product._id}
                  className="h-fit relative flex flex-col bg-white border border-gray-200 shadow-md rounded overflow-hidden"
                >
                  <div className="absolute top-2 left-2 bg-[#3b0a0a] text-white text-[10px] font-semibold px-2 py-1 rounded uppercase z-10">
                    Free Delivery
                  </div>

                  {discount > 0 && (
                    <div className="absolute top-2 right-2 text-xs font-bold text-black bg-white px-2 py-1 rounded shadow">
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

                    <div className="p-3 flex flex-col gap-1 items-center text-center">
                      <h3 className="text-sm lg:text-base font-bold text-black leading-snug">
                        {product.name.length > 22 ? product.name.slice(0, 22) + '...' : product.name}
                      </h3>

                      <div className="flex items-center gap-1 justify-center">
                        {discount > 0 && (
                          <span className="line-through text-gray-500 text-sm">${originalPrice}</span>
                        )}
                        <span className="text-black font-bold text-md">${product.price.toFixed(2)}</span>
                      </div>

                      <div className="flex items-center gap-1 justify-center">
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
            })
          ) : (
            <p className="text-center text-gray-500">No featured products available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Featured;
