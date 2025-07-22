

"use client";

import React, { useState, ChangeEvent } from "react";
import { X } from "lucide-react";

const menCategories = [
  "Men Leather Jackets",
  "Men Motorcycle Jackets",
  "Men Bomber Jackets",
  "Men Black Jackets",
  "Men Brown Jackets",
  "Men Aviator Jackets",
  "Men Distressed Jackets",
  "Men Cafe Racer Jackets",
  "Men Winter Jackets",
  "Men Puffer Jackets",
];

const womenCategories = [
  "Women Leather Jackets",
  "Women Black Leather Jackets",
  "Women Biker Jackets",
  "Women Bomber Jackets",
  "Women Denim Jackets",
  "Women Fur Jackets",
  "Women Cotton Jackets",
  "Women Varsity Jackets",
  "Women Puffer Jackets",
  "Women Wool Jackets",
];

const priceRanges = [
  "0-100",
  "100-200",
  "200-300",
  "300-400",
  "400-500",
  "500-600",
  "600-1000",
];

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, string[]>) => void;
}

const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters };

    if (updatedFilters[name]?.includes(value)) {
      updatedFilters[name] = updatedFilters[name].filter((v) => v !== value);
      if (updatedFilters[name].length === 0) delete updatedFilters[name];
    } else {
      updatedFilters[name] = updatedFilters[name]
        ? [...updatedFilters[name], value]
        : [value];
    }

    setSelectedFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const renderFilterContent = () => (
    <div className="p-6 space-y-6">
      {/* PRICE RANGE */}
      <div>
        <h3 className="uppercase font-bold text-sm text-gray-900 tracking-wide mb-3">
          Shop by Price
        </h3>
        <ul className="space-y-2">
          {priceRanges.map((range) => (
            <li key={range}>
              <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="priceRange"
                  value={range}
                  onChange={handleFilterChange}
                  className="accent-brown-700 w-4 h-4 border-gray-300 rounded"
                />
                <span className="hover:text-brown-700">
                  ${range.replace("-", " - $")}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* MEN COLLECTION */}
      <div>
        <h3 className="uppercase font-bold text-sm text-gray-900 tracking-wide mb-3">
          Men’s Collections
        </h3>
        <ul className="space-y-2">
          {menCategories.map((item) => (
            <li key={item}>
              <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="menCategory"
                  value={item}
                  onChange={handleFilterChange}
                  className="accent-brown-700 w-4 h-4 border-gray-300 rounded"
                />
                <span className="hover:text-brown-700">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* WOMEN COLLECTION */}
      <div>
        <h3 className="uppercase font-bold text-sm text-gray-900 tracking-wide mb-3">
          Women’s Collections
        </h3>
        <ul className="space-y-2">
          {womenCategories.map((item) => (
            <li key={item}>
              <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  name="womenCategory"
                  value={item}
                  onChange={handleFilterChange}
                  className="accent-brown-700 w-4 h-4 border-gray-300 rounded"
                />
                <span className="hover:text-brown-700">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP FILTER SIDEBAR */}
      <aside className="hidden lg:block w-full max-w-xs bg-white border rounded-md shadow-sm sticky top-24 h-fit">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="font-semibold text-gray-800 text-lg">Filter</h2>
        </div>
        {renderFilterContent()}
      </aside>

      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-4 px-2">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="w-full bg-gray-100 border text-gray-800 py-2 rounded-md font-medium"
        >
          Show Filters
        </button>
      </div>

      {/* MOBILE FILTER DRAWER */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="w-3/4 max-w-sm bg-white h-full shadow-lg relative overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-semibold text-gray-800 text-lg">Filters</h2>
              <button
                onClick={() => setShowMobileFilter(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {renderFilterContent()}

            {/* Apply Filters Button */}
            <div className="p-4 border-t">
              <button
                onClick={() => setShowMobileFilter(false)}
                className="w-full bg-brown-700 text-white py-2 rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="flex-1"
            onClick={() => setShowMobileFilter(false)}
          ></div>
        </div>
      )}
    </>
  );
};

export default FilterSection;
