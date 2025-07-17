// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Star } from 'lucide-react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
// import FilterSection from '../componets/FilterSection';
// import { client } from '@/sanity/lib/client';
// import { urlFor } from '@/sanity/lib/image';

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   price: number;
//   quantity?: number;
//   discountPercentage?: number;
//   category?: string;
//   description?: string;
//   rating?: number;
//   reviewCount?: number;
//   primeDelivery?: boolean;
// }

// const ProductSection = () => {
//   const cart = useSelector((state: RootState) => state.cart) || [];

//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   // ✅ Fetching products from Sanity
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const fetched: any[] = await client.fetch(`*[_type == "product"]{
//           _id,
//           name,
//           image,
//           priceUSD,
//           discountPercentage,
//           category,
//           description,
//           reviews
//         }`);

//         const normalised: Product[] = fetched.map((p) => ({
//           _id: p._id,
//           name: p.name,
//           image: p.image,
//           price: parseFloat(p.priceUSD || '0'),
//           discountPercentage: p.discountPercentage,
//           category: p.category,
//           description: p.description,
//           rating: Array.isArray(p.reviews) && p.reviews.length
//             ? p.reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / p.reviews.length
//             : 0,
//           reviewCount: p.reviews?.length || 0,
//         }));

//         setProducts(normalised);
//         setFilteredProducts(normalised);
//       } catch (err) {
//         console.error('Error fetching products:', err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // ✅ Filtering logic
//   const handleFiltersChange = (filters: Record<string, string[]>) => {
//     const result = products.filter((product) => {
//       const matchesCategory =
//         !filters.category ||
//         filters.category.includes(product.category?.toLowerCase() || '');

//       const discountString = product.discountPercentage ? String(product.discountPercentage) : '';
//       const matchesDiscount =
//         !filters.discountPercentage ||
//         filters.discountPercentage.includes(discountString);

//       const matchesPrice =
//         !filters.priceRange ||
//         filters.priceRange.some((range) => {
//           const [min, max] = range.split('-').map(Number);
//           return product.price >= min && product.price <= max;
//         });

//       return matchesCategory && matchesDiscount && matchesPrice;
//     });

//     setFilteredProducts(result);
//   };

//   return (
//     <section className="flex flex-col lg:flex-row gap-6">
//       {/* Sidebar Filters */}
//       <FilterSection onFiltersChange={handleFiltersChange} />

//       {/* Product Grid */}
//       <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.length ? (
//           filteredProducts.map((product) => {
//             const rating = product.rating ?? 0;
//             const reviewCount = product.reviewCount ?? 0;

//             return (
//               <article
//                 key={product._id}
//                 className="relative flex flex-col bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105 group"
//               >
//                 {/* Prime badge */}
//                 <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-semibold px-2 py-1 rounded uppercase z-20">
//                   Prime Delivery
//                 </span>

//                 {/* Product Link */}
//                 <Link href={`/Pages/ShopGridDynamic/product/${product._id}`} className="flex flex-col flex-1">
//                   {/* Product Image */}
//                   <div className="w-full h-[236px] bg-[#f6f7fb] flex items-center justify-center">
//                     <Image
//                       src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
//                       alt={product.name}
//                       width={178}
//                       height={178}
//                       className="w-[178px] h-[178px] object-contain transition-transform duration-300 group-hover:scale-110"
//                       priority
//                     />
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-3 flex flex-col gap-2 justify-between">
//                     {/* Product Name */}
//                     <h3 className="text-black text-[15px] md:text-[17px] lg:text-[18px] font-semibold leading-tight line-clamp-2">
//                       {product.name}
//                     </h3>

//                     {/* Rating */}
//                     <div className="flex flex-col items-left space-x-1">
//                       <div className="flex items-center">
//                         {Array.from({ length: 5 }).map((_, idx) => (
//                           <Star
//                             key={idx}
//                             size={16}
//                             className={
//                               idx + 1 <= Math.round(rating)
//                                 ? 'fill-yellow-500 stroke-yellow-500'
//                                 : 'stroke-gray-300'
//                             }
//                           />
//                         ))}
//                       </div>
//                       <span className="text-xs font-semibold text-orange-500">
//                         {rating.toFixed(1)}
//                       </span>
//                       <span className="text-xs text-gray-500">{reviewCount} reviews</span>
//                     </div>

//                     {/* Price */}
//                     <p className="text-[15px] lg:text-[18px] font-bold text-black">
//                       ${product.price.toFixed(2)}
//                     </p>
//                   </div>
//                 </Link>
//               </article>
//             );
//           })
//         ) : (
//           <p className="text-gray-600">No products found.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductSection;





// src/componets/ProductSection.tsx

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FilterSection from './FilterSection';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  discountPercentage?: number;
  category?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  primeDelivery?: boolean;
}

interface Props {
  searchQuery?: string; // ✅ added prop
}

const ProductSection: React.FC<Props> = ({ searchQuery = '' }) => {
  const cart = useSelector((state: RootState) => state.cart) || [];

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched: any[] = await client.fetch(`*[_type == "product"]{
          _id,
          name,
          image,
          priceUSD,
          discountPercentage,
          category,
          description,
          reviews
        }`);

        const normalised: Product[] = fetched.map((p) => ({
          _id: p._id,
          name: p.name,
          image: p.image,
          price: parseFloat(p.priceUSD || '0'),
          discountPercentage: p.discountPercentage,
          category: p.category,
          description: p.description,
          rating: Array.isArray(p.reviews) && p.reviews.length
            ? p.reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / p.reviews.length
            : 0,
          reviewCount: p.reviews?.length || 0,
        }));

        // 🔍 Apply search filter
        const searched = normalised.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(normalised);
        setFilteredProducts(searched);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    const result = products.filter((product) => {
      const matchesCategory =
        !filters.category ||
        filters.category.includes(product.category?.toLowerCase() || '');

      const discountString = product.discountPercentage ? String(product.discountPercentage) : '';
      const matchesDiscount =
        !filters.discountPercentage ||
        filters.discountPercentage.includes(discountString);

      const matchesPrice =
        !filters.priceRange ||
        filters.priceRange.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && product.price <= max;
        });

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesDiscount && matchesPrice && matchesSearch;
    });

    setFilteredProducts(result);
  };

  return (
    <section className="flex flex-col lg:flex-row gap-6">
      <FilterSection onFiltersChange={handleFiltersChange} />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length ? (
          filteredProducts.map((product) => {
            const rating = product.rating ?? 0;
            const reviewCount = product.reviewCount ?? 0;

            return (
              <article
                key={product._id}
                className="relative flex flex-col bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105 group"
              >
                <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-semibold px-2 py-1 rounded uppercase z-20">
                  Prime Delivery
                </span>

                <Link
                  href={`/Pages/ShopGridDynamic/product/${product._id}`}
                  className="flex flex-col flex-1"
                >
                  <div className="w-full h-[236px] bg-[#f6f7fb] flex items-center justify-center">
                    <Image
                      src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
                      alt={product.name}
                      width={178}
                      height={178}
                      className="w-[178px] h-[178px] object-contain transition-transform duration-300 group-hover:scale-110"
                      priority
                    />
                  </div>

                  <div className="p-3 flex flex-col gap-2 justify-between">
                    <h3 className="text-black text-[15px] md:text-[17px] lg:text-[18px] font-semibold leading-tight line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex flex-col items-left space-x-1">
                      <div className="flex items-center">
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
                      <span className="text-xs font-semibold text-orange-500">
                        {rating.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-500">{reviewCount} reviews</span>
                    </div>

                    <p className="text-[15px] lg:text-[18px] font-bold text-black">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </article>
            );
          })
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default ProductSection;
