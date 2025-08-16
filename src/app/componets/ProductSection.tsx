
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import FilterSection from './FilterSection';
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

interface Props {
  searchQuery?: string;
  category?: string;
}

const ProductSection: React.FC<Props> = ({ searchQuery = '', category = '' }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // ✅ GROQ: fetch only products matching the query (single-letter works)
        const fetched: any[] = await client.fetch(
          `*[_type == "product" &&
            (!defined($searchQuery) || name match "*${searchQuery}*") &&
            (!defined($category) || category->title match "*${category}*")
          ]{
            _id,
            name,
            image,
            priceUSD,
            discountPercentage,
            category->{title},
            description,
            reviews
          }`,
          { searchQuery, category }
        );

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
        setFilteredProducts(normalised); // already filtered by query
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [searchQuery, category]);

  const handleFiltersChange = (filters: Record<string, string[]>) => {
    const result = products.filter((product) => {
      const selectedCategories = [
        ...(filters.menCategory || []),
        ...(filters.womenCategory || []),
      ];

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category || '');

      const matchesPrice =
        !filters.priceRange ||
        filters.priceRange.some((range) => {
          const [min, max] = range.split('-').map(Number);
          return product.price >= min && product.price <= max;
        });

      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategoryProp = category
        ? (product.category?.toLowerCase().includes(category.toLowerCase()) ?? false)
        : true;

      return (
        matchesCategory &&
        matchesPrice &&
        matchesSearch &&
        matchesCategoryProp
      );
    });

    setFilteredProducts(result);
  };

  const formatSearchHeading = () => {
    const lower = category.toLowerCase();
    if (lower.includes("jacket")) return "Leather Jackets";
    if (lower.includes("bag")) return "Bags";
    if (lower.includes("wallet")) return "Wallets";
    if (lower.includes("Winter")) return "Winters";



    if (lower.includes("Men Leather Jacket")) return "Men Leather Jackets";
    if (lower.includes("Men Puffer Jacket")) return "Men Puffer Jackets";
    if (lower.includes("Men Winter Jacket")) return "Men Winter Jackets";
    if (lower.includes("Men Motorcycle Jacket")) return "Men Motorcycle Jackets";
    if (lower.includes("Men Black Jacket")) return "Men Black Jacket";
    if (lower.includes("Men Brown Jacket")) return "Men Brown Jacket";
    if (lower.includes("Men Bomber Jacket")) return "Men Bomber Jackets";
    if (lower.includes("Men  Cafe Racer Jacket")) return "Men  Cafe Racer Jackets";



   if (lower.includes("Women Motorcycle Jacket")) return "Women Motorcycle Jackets";
    if (lower.includes("Women Black Jacket")) return "Women Black Jacket";
    if (lower.includes("Women Brown Jacket")) return "Women Brown Jacket";
    if (lower.includes("Women Bomber Jacket")) return "Women Bomber Jackets";
    if (lower.includes("Women  Cafe Racer Jacket")) return "Women  Cafe Racer Jackets";
    if (searchQuery) return `Search results for "${searchQuery}"`;
    return "All Products";
  };

  return (
    <section className="bg-[#fdf7ee] flex flex-col lg:flex-row gap-1 pt-10">
      <FilterSection onFiltersChange={handleFiltersChange} />

      <div className="bg-[#fdf7ee] flex-1">
        <div className="mb-4 text-2xl font-bold text-gray-800">
          {formatSearchHeading()}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {filteredProducts.length ? (
            filteredProducts.map((product) => {
              const rating = product.rating ?? 0;
              const reviewCount = product.reviewCount ?? 0;
              const discount = product.discountPercentage || 0;
              const originalPrice = discount
                ? (product.price / (1 - discount / 100)).toFixed(2)
                : product.price.toFixed(2);

              return (
                <article
                  key={product._id}
                  className="h-fit lg:w-[280px] relative flex flex-col bg-white border border-gray-200 shadow-md rounded overflow-hidden"
                >
                  <div className="absolute top-2 left-2 bg-[#3b0a0a] text-white text-[8px] md:text-[10px] font-semibold px-2 py-1 rounded uppercase z-10">
                    Free Delivery
                  </div>

                  {discount > 0 && (
                    <div className="absolute top-2 right-2 text-[8px] md:text-[10px] font-bold text-black bg-white px-2 py-1 rounded shadow">
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
                      {/* Mobile */}
                      <h3 className="text-sm font-bold text-black leading-snug block lg:hidden">
                        {product.name.length > 15 ? product.name.slice(0, 15) + '...' : product.name}
                      </h3>

                      {/* Desktop */}
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
            })
          ) : (
            <p className="text-gray-600 px-2">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
  