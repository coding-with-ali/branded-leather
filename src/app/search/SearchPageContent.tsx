
"use client";

import { useSearchParams } from "next/navigation";
import ProductSection from "../componets/ProductSection"; // Adjust the path if needed
import NewCollectionBanner from "../componets/NewCollectionBanner";
import Question from "../Pages/HomePage/Question"

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <div className="bg-white p-4">
       <NewCollectionBanner />
      <h1 className="text-2xl font-bold mb-6 text-[#3d3d3d]">
        Search Results for <span className="text-[#7E33E0]">&quot;{query}&quot;</span>
      </h1>

      {/* ✅ Inject ProductSection and pass the query */}
      <ProductSection searchQuery={query} />
      <Question/> 
    </div>
  );
}
