
import { client } from '@/sanity/lib/client';
import { productsByCategory } from '@/sanity/lib/queries'; // <-- use new query
import { Product } from '../../../type/products';
import Bag from '../Pages/HomePage/Bag';

interface SanityProduct {
  _id: string;
  name: string;
  image: any;
  priceUSD: string;
  reviews?: { rating: number }[];
  discountPercentage: number;
}

export default async function BagWrapper() {
  try {
    // 🟠 Change category name below if needed
    const rawProducts: SanityProduct[] = await client.fetch(productsByCategory('Leather Bag'), {}, { cache: 'no-store' });

    const products: Product[] = rawProducts.map((p) => {
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
        category: 'Bags', // you can set this for clarity
        sizeOptions: [],
        discountPercentage: p.discountPercentage,
      };
    });

    return <Bag products={products} />;
  } catch (error) {
    console.error('Error fetching products:', error);
    return <div>Failed to load products.</div>;
  }
}
