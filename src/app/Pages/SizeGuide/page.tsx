"use client";

import Image from "next/image";
import React, { useState } from "react";

const tabs = ["Size Guide", "Men", "Women", "Kids", "Trousers", "Hat"];

const SizeGuidePage = () => {
  const [activeTab, setActiveTab] = useState("Hat");

  const renderContent = () => {
    switch (activeTab) {
      case "Size Guide":
        return (
          <ResponsiveImage
            src="/size guide.webp"
            alt="General Size Guide"
          />
        );

      case "Men":
        return (
          <ResponsiveImage
            src="/men size.webp"
            alt="Men Size Guide"
          />
        );

      case "Women":
        return (
          <ResponsiveImage
            src="/women size.webp"
            alt="Women Size Guide"
          />
        );

      case "Kids":
        return (
          <ResponsiveImage
            src="/kids size.webp"
            alt="Kids Size Guide"
          />
        );

      case "Trousers":
        return (
          <ResponsiveImage
            src="/trouser size.webp"
            alt="Trousers Size Guide"
          />
        );

      case "Hat":
        return (
          <div className="text-center mt-6">
            <Image
              src="/hat-size.webp"
              alt="Hat Size Guide"
              width={1000}
              height={600}
              className="mx-auto w-full max-w-4xl h-auto rounded-md shadow"
            />
            
          </div>
        );

      default:
        return (
          <div className="text-center mt-8">
            <p className="text-gray-600">Size guide not available yet for this category.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold border transition-all duration-200
              ${
                activeTab === tab
                  ? "bg-black text-white border-black"
                  : "bg-gray-200 text-black border-gray-300 hover:bg-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-center uppercase text-black mb-4">
        {activeTab === "Size Guide" ? "Jacket" : activeTab} Size Chart
      </h1>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

// Reusable responsive image component
const ResponsiveImage = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => (
  <div className="text-center mt-6">
    <Image
      src={src}
      alt={alt}
      width={1000}
      height={600}
      className="mx-auto w-full max-w-4xl h-auto rounded-md shadow"
    />
  </div>
);

export default SizeGuidePage;
