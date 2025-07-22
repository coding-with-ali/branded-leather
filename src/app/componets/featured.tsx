// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Product } from '../../../type/products';
// import { client } from '@/sanity/lib/client';
// import { four } from '@/sanity/lib/queries';
// import { urlFor } from '@/sanity/lib/image';

// // 🟢 Server-side fetching function
// async function fetchProducts(): Promise<Product[]> {
//   try {
//     return await client.fetch(four, {}, { cache: 'no-store' });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return [];
//   }
// }

// const Featured = async () => {
//   const products = await fetchProducts();

//   return (
//     <div>
//       <h2 className="text-[24px] md:text-[34px] lg:text-[44px] font-[Josefin Sans] text-center text-[#1A0B5B] font-[700]">
//         Most Popular Products
//       </h2>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-500">No products available.</p>
//       ) : (
//         <div className="flex justify-around items-center flex-wrap gap-5 mt-10 md:mt-20">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="w-[270px] h-[360px] shadow-lg text-center group relative transition-transform duration-300 hover:scale-105">
//               <div className="absolute inset-0 bg-[#2F1AC4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <Link href={`/Pages/ShopGridDynamic/product/${product._id}`}>
//                 <div className="w-[270px] h-[236px] bg-[#F6F7FB] flex items-center justify-center relative z-10">
//                   <Image
//                     src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
//                     alt={product.name || 'Product Image'}
//                     width={178}
//                     height={178}
//                     className="w-[178px] h-[178px] object-contain"
//                     priority // ✅ Instant Load
//                   />
//                 </div>
//                 <div className="relative z-10 transition-colors duration-300">
//                   <h3 className="text-black text-[15px] md:text-[17px] font-semibold leading-tight line-clamp-2">
//                         {product.name}
//                       </h3>
//                   <div className="flex justify-center items-center gap-1">
//                     <div className="w-[14px] h-[4px] bg-[#05E6B7] rounded-[10px]"></div>
//                     <div className="w-[14px] h-[4px] bg-[#F701A8] rounded-[10px]"></div>
//                     <div className="w-[14px] h-[4px] bg-[#00009D] rounded-[10px]"></div>
//                   </div>
//                   <p className="text-[#151875] text-[14px] font-[400] py-2 group-hover:text-white">
//                     Code - {product.discountPercentage}
//                   </p>
//                   <p className="text-[#151875] text-[14px] font-[400] group-hover:text-white">
//                     Price: ${product.price}
//                   </p>
//                 </div>
//                 <button className="absolute bottom-28 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-[#05E6B7] text-white text-[14px] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                   View Cart
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Featured;




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
    <section className="bg-white py-10 px-4 hidden md:inline-block">
      <h2 className="text-[24px] md:text-[34px] lg:text-[44px] font-[Josefin Sans] text-center text-[#1A0B5B] font-[700]">
        Most Popular Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 max-w-7xl mx-auto">
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
                className="h-[400px] relative flex flex-col bg-white border border-gray-200 shadow-md rounded overflow-hidden"
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

                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-black text-[15px] md:text-[17px] font-semibold leading-tight line-clamp-2">
                      {product.name}
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
          })
        ) : (
          <p className="text-center text-gray-500">No featured products available.</p>
        )}
      </div>
    </section>
  );
};

export default Featured;
