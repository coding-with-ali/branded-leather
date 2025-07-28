"use client";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  image: any;
  priceUSD: string;
}

export default function LiveSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await client.fetch(
  `*[_type=="product" && name match "*${query}*"]{
    _id,
    name,
    priceUSD,
    image{
      asset->{
        _id,
        url
      }
    }
  }`
);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {loading && <p className="text-gray-500 mt-2">Searching...</p>}

      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <div
              key={product._id}
              className="border p-2 rounded bg-white shadow-sm"
            >
              <Image
                                      src={product.image ? urlFor(product.image).url() : '/fallback-image.jpg'}
                                      alt={product.name}
                                      width={178}
                                      height={178}
                                      className="w-[200px] h-[200px] object-cover"
                                      priority
                                    />
              <h3 className="mt-2 text-sm font-semibold">{product.name}</h3>
              <p className="text-blue-600 font-bold">$ {product.priceUSD}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
