
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client"; // Update with correct client path
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const RelatedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        // ✅ Fetch more products from Sanity (e.g., 20)
        const query = `*[_type == "product"] [0...20] {
          _id,
          name,
          price,
          "imageUrl": image.asset->url
        }`;

        const fetchedProducts = await client.fetch(query);

        // ✅ Randomize products using JavaScript
        const shuffled = fetchedProducts.sort(() => 0.5 - Math.random());
        const randomProducts = shuffled.slice(0, 4);

        setProducts(randomProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching related products:", error);
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, []);

  if (loading) {
    return <div>Loading related products...</div>;
  }

  if (products.length === 0) {
    return <div>No related products found.</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-wrap  gap-4">
        {products.map((product) => (
          <Link href={`/Pages/ShopGridDynamic/product/${product._id}`} key={product._id} className="group">
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-[300px] w-[240px] md:h-[340px] md:w-[270px] object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
