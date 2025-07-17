// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { add, updateQuantity } from "../redux/cartslice";
// import Image from "next/image";
// import Link from "next/link";
// import FilterSection from "../componets/FilterSection";

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   priceUSD: string;
//   quantity: number;
//   discountPercentage: number;
//   category: string;
//   description: string;
// }

// export default function SearchPageContent() {
//   const searchParams = useSearchParams();
//   const query = searchParams.get("query") || "";
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [cartItems, setCartItems] = useState<{ [key: string]: boolean }>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (query.trim()) {
//       fetchProducts(query);
//     }
//   }, [query]);

//   const fetchProducts = async (searchQuery: string) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);

//       if (!res.ok) throw new Error(`Failed to fetch. Status: ${res.status}`);

//       const data = await res.json();
//       if (!Array.isArray(data)) throw new Error("Invalid response format.");

//       const normalized = data.map((product: any) => ({
//         _id: product._id,
//         name: product.name,
//         image: product.image,
//         priceUSD: product.priceUSD,
//         quantity: 1,
//         discountPercentage: product.discountPercentage || 0,
//         category: product.category || "",
//         description: product.description || "",
//       }));

//       setProducts(normalized);
//       setFilteredProducts(normalized);
//     } catch (err: any) {
//       console.error("Fetch error:", err);
//       setError("Failed to load products.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFiltersChange = (filters: Record<string, string[]>) => {
//     const filtered = products.filter((product) => {
//       const matchesCategory =
//         !filters.category ||
//         filters.category.includes(product.category?.toLowerCase() || "");

//       const discountString = product.discountPercentage
//         ? String(product.discountPercentage)
//         : "";
//       const matchesDiscount =
//         !filters.discountPercentage ||
//         filters.discountPercentage.includes(discountString);

//       const matchesPrice =
//         !filters.priceRange ||
//         filters.priceRange.some((range) => {
//           const [min, max] = range.split("-").map(Number);
//           return Number(product.priceUSD) >= min && Number(product.priceUSD) <= max;
//         });

//       return matchesCategory && matchesDiscount && matchesPrice;
//     });

//     setFilteredProducts(filtered);
//   };
// const handleAddToCart = (product: Product) => {
//   dispatch(
//     add({
//       _id: product._id,
//       name: product.name,
//       image: product.image,
//       price: `$${parseFloat(product.priceUSD).toFixed(2)}`, // properly formatted USD string
//       quantity: product.quantity,
//     })
//   );
//   setCartItems((prev) => ({ ...prev, [product._id]: true }));
// }

//   const handleQuantityChange = (productId: string, newQuantity: number) => {
//     if (newQuantity > 0) {
//       setProducts((prevProducts) =>
//         prevProducts.map((product) =>
//           product._id === productId ? { ...product, quantity: newQuantity } : product
//         )
//       );
//       dispatch(updateQuantity({ _id: productId, quantity: newQuantity }));
//     }
//   };

//   return (
//     <div className="flex">
//       <FilterSection onFiltersChange={handleFiltersChange} />
//       <div className="w-full sm:px-6 md:px-10 lg:px-16 py-6 bg-[#fdfcf9] min-h-screen">
//         <h1 className="text-2xl font-bold mb-6 text-[#3d3d3d]">
//           Search Results for <span className="text-[#7E33E0]">&quot;{query}&quot;</span>
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center h-40">
//             <p className="animate-pulse text-gray-500">Loading products...</p>
//           </div>
//         ) : error ? (
//           <p className="text-red-600">{error}</p>
//         ) : filteredProducts.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div
//                 key={product._id}
//                 className="bg-white border border-[#e5e5e5] rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col justify-between"
//               >
//                 <Link href={`/Pages/ShopGridDynamic/product/${product._id}`}>
//                   <div className="w-full h-60 overflow-hidden">
//                     <Image
//                       className="w-[300px] h-auto object-cover hover:scale-105 transition duration-300"
//                       src={product.image}
//                       alt={product.name}
//                       width={300}
//                       height={300}
//                     />
//                   </div>
//                   <div className="p-4 space-y-2">
//                     <h3 className="text-lg font-semibold text-[#3d3d3d] truncate">
//                       {product.name}
//                     </h3>
//                     <p className="text-md font-bold text-[#4d2c19]">
//                       ${parseFloat(product.priceUSD).toFixed(2)}
//                     </p>
//                   </div>
//                 </Link>

//                 <div className="px-4 pb-4">
//                   {cartItems[product._id] ? (
//                     <div className="mt-2 flex items-center justify-between bg-[#f2efed] rounded-md px-3 py-2">
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(product._id, product.quantity - 1)
//                         }
//                         className="bg-[#4d2c19] text-white px-2 py-1 rounded hover:bg-[#2e1b0f]"
//                       >
//                         -
//                       </button>
//                       <span className="text-md font-medium text-[#4d2c19]">
//                         {product.quantity}
//                       </span>
//                       <button
//                         onClick={() =>
//                           handleQuantityChange(product._id, product.quantity + 1)
//                         }
//                         className="bg-[#4d2c19] text-white px-2 py-1 rounded hover:bg-[#2e1b0f]"
//                       >
//                         +
//                       </button>
//                     </div>
//                   ) : (
//                     <button
//                       onClick={() => handleAddToCart(product)}
//                       className="w-full mt-2 py-2 bg-[#4d2c19] text-white rounded-md font-medium hover:bg-[#2e1b0f] transition"
//                     >
//                       🛒 Add to Cart
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-lg mt-10">
//             No products found for &quot;{query}&quot;.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }



// src/app/Pages/SearchPageContent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import ProductSection from "../componets/ProductSection"; // Adjust the path if needed

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-[#3d3d3d]">
        Search Results for <span className="text-[#7E33E0]">&quot;{query}&quot;</span>
      </h1>

      {/* ✅ Inject ProductSection and pass the query */}
      <ProductSection searchQuery={query} />
    </div>
  );
}
