'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '../../../../type/products';

interface Props {
  products: Product[];
}

export default function LeatherBag({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white px-4 md:px-10 xl:px-20 py-10 xl:py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide text-black uppercase border-b-4 border-[#955e28] inline-block">
          Leather Bags
        </h2>
        <div className="hidden md:flex gap-2 text-white">
          <button onClick={scrollLeft} className="w-10 h-10 bg-[#955e28] hover:bg-[#7a4b1f] flex items-center justify-center rounded-full">
            &#8249;
          </button>
          <button onClick={scrollRight} className="w-10 h-10 bg-[#955e28] hover:bg-[#7a4b1f] flex items-center justify-center rounded-full">
            &#8250;
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No products available.</p>
      ) : (
        <div ref={scrollRef} className="flex gap-4 mt-8 overflow-x-auto scroll-smooth scrollbar-hide">
          {products.map((product) => (
            <article
              key={product._id}
              className="min-w-[250px] md:min-w-[280px] bg-white border border-gray-200 rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
            >
              <Link href={`/Pages/ShopGridDynamic/product/${product._id}`} className="flex flex-col items-center">
                <div className="bg-white w-full h-[240px] md:h-[300px] flex items-center justify-center rounded-t-md">
                  <Image
                    src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
                    alt={product.name || 'Product Image'}
                    width={250}
                    height={250}
                    className="object-contain max-h-full"
                  />
                </div>

                <div className="w-[240px] px-4 py-3">
                  <div className="flex justify-between text-[12px] font-bold mb-1">
                    <span className="bg-[#3c1e10] text-white px-2 py-[2px] rounded-sm">Free Delivery</span>
                    <span className="text-black">{product.discountPercentage}% OFF</span>
                  </div>

                 <h3 className="text-sm md:text-base font-semibold text-black leading-snug">{product.name}</h3>


                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={`${
                          idx + 1 <= Math.round(product.rating ?? 0)
                            ? 'fill-yellow-500 stroke-yellow-500'
                            : 'stroke-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-[14px]">
                    <span className="line-through text-gray-400">
  ${product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : (product.price + 30).toFixed(2) // fallback if no discount is given
  }
</span>
                    <span className="font-bold text-black">${product.price.toFixed(2)}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button className="bg-[#955e28] text-white text-sm font-semibold px-6 py-3 rounded hover:bg-[#7a4b1f]">
          <Link href="/Pages/PageHero/bags">
          VIEW MORE
          </Link>
        </button>
      </div>
    </section>
  );
}
