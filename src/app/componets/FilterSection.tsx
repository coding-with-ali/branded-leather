"use client";

import React, { ChangeEvent, useState } from "react";

const categories = ["biker", "bomber", "shearling", "hooded", "vest", "winter"];
const discounts = [10, 15, 20, 25, 30];
const priceRanges = [
  "0-100",
  "100-200",
  "200-300",
  "300-400",
  "400-500",
  "500-600",
  "600-1000",
];

const filterOptions = [
  {
    id: "category",
    title: "Category",
    options: categories,
  },
  {
    id: "discountPercentage",
    title: "Discount Offers",
    options: discounts,
  },
  {
    id: "priceRange",
    title: "Price Range",
    options: priceRanges,
  },
];

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, string[]>) => void;
}

const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters };

    if (updatedFilters[name]?.includes(value)) {
      updatedFilters[name] = updatedFilters[name].filter((v) => v !== value);
      if (updatedFilters[name].length === 0) delete updatedFilters[name];
    } else {
      updatedFilters[name] = updatedFilters[name] ? [...updatedFilters[name], value] : [value];
    }

    setSelectedFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  return (
    <aside className="sticky top-24 hidden lg:block w-full max-w-xs bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">Filter By</h2>
      {filterOptions.map(({ id, title, options }) => (
        <div key={id} className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-3">{title}</p>
          <ul className="space-y-2">
            {options.map((option) => {
              const displayValue =
  id === "discountPercentage"
    ? `${option}% OFF`
    : id === "priceRange"
    ? `$${String(option).replace("-", " - $")}`
    : String(option).charAt(0).toUpperCase() + String(option).slice(1);
              return (
                <li key={option}>
                  <label className="flex items-center space-x-2 text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      name={id}
                      value={String(option)}
                      onChange={handleFilterChange}
                      className="accent-brown-700 w-4 h-4 border-gray-300 rounded"
                    />
                    <span className="hover:text-brown-700 transition">{displayValue}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default FilterSection;