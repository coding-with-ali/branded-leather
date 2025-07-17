
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { allProducts } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/image';
import { Product } from '../../../../type/products';

interface SanityProduct {
  _id: string;
  name: string;
  image: any;
  priceUSD: string;
  reviews?: { rating: number }[];
}

/**
 * Fetch products from Sanity and normalize to the Product type
 */
async function fetchProducts(): Promise<Product[]> {
  try {
    const rawProducts: SanityProduct[] = await client.fetch(allProducts, {}, { cache: 'no-store' });

    return rawProducts.map((p) => {
      const ratings = p.reviews?.map((r) => r.rating) || [];
      const total = ratings.reduce((acc, val) => acc + val, 0);
      const avgRating = ratings.length > 0 ? total / ratings.length : 0;

      return {
        _id: p._id,
        name: p.name,
        image: p.image,
        price: parseFloat(p.priceUSD || '0'),
        rating: avgRating,
        reviewCount: ratings.length,
        quantity: 1,
        primeDelivery: true,
        _type: 'product',
        description: '',
        category: '',
        sizeOptions: [],
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

const Featured = async () => {
  const products = await fetchProducts();

  return (
    <section className="xl:pt-24 px-2 md:px-8 lg:px-12">
      <h2 className="text-[30px] md:text-[34px] lg:text-[44px] font-dancing lg:font-[Stencil] text-center text-black font-extrabold mb-10 uppercase tracking-wide">
        Shop Best Sellers
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-8">
          {products.map((product) => (
            <article
              key={product._id}
              className="relative flex flex-col bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm transition-transform duration-300 hover:scale-105 group"
            >
              {/* Prime badge */}
              <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-semibold px-2 py-1 rounded z-20 uppercase">
                Prime Delivery
              </span>

              <Link
                href={`/Pages/ShopGridDynamic/product/${product._id}`}
                className="flex flex-col flex-1"
              >
                <div className="w-full h-[185px] lg:h-[236px] bg-[#f6f7fb] flex items-center justify-center">
                  <Image
                    src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
                    alt={product.name || 'Product Image'}
                    width={178}
                    height={178}
                    className="w-[178px] h-[178px] object-contain transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>

                <div className="p-2 space-y-1">
                  <h3 className="text-black text-[16px] md:text-[18px] lg:text-[20px] font-bold leading-snug line-clamp-2 h-10">
                    {product.name}
                  </h3>

                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={16}
                        className={`${
                          idx + 1 <= Math.round(product.rating ?? 0)
                            ? 'fill-yellow-500 stroke-yellow-500'
                            : 'stroke-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-semibold text-orange-500">
                      {product.rating?.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">{product.reviewCount} Reviews</p>

                  <p className="text-lg font-semibold text-black">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Featured;
