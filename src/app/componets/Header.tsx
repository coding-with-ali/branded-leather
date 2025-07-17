// Updated Header Component with Dropdown
"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js router
import Link from "next/link";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `/search?query=${encodeURIComponent(searchQuery)}`;
      router.push(searchUrl);
      setSearchQuery("");
    }
  };

  return (
    <div>
      <div className="bg-[#99582A] w-full h-[70px] flex justify-around items-center border-b-2">
        <div className="flex justify-around md:justify-center items-center gap-2 w-full px-4 sm:gap-28 sm:px-0">
          {!isMenuOpen ? (
            <FaBars
              size="24px"
              className="xl:hidden text-white cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          ) : (
            <FaTimes
              size="24px"
              className="xl:hidden text-white cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          <h3 className="text-[26px] md:text-[34px] font-dancing lg:font-[forte] text-white font-[700]">
            Leather Brother
          </h3>

          <div className="hidden xl:flex gap-6 items-center">
            <Link href="/" className="text-white text-lg">
              Home
            </Link>

            {/* Dropdown Menu */}
            <div
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="text-white text-lg flex items-center gap-1">
                Category ▾
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-full left-0 z-50 bg-white text-black w-[250px] shadow-md border mt-2">
                  {[
                    "Biker Jackets",
                    "Artificial Leather Jackets",
                    "Fleece Hoodie",
                    "Black and Brown Jackets",
                    "Denim Jackets",
                    "Casual and Formal Jackets",
                    "Long Coats",
                    "Leather Vests",
                    "Cotton Jackets",
                    "T-Shirts",
                  ].map((item) => (
                    <li
                      key={item}
                      className="px-4 py-2 hover:bg-[#1f1f1f] hover:text-white cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href="/Pages/ShopList" className="text-white text-lg">
              Products
            </Link>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex w-[220px] md:w-[320px] h-[40px] items-center border-2 border-white rounded-md overflow-hidden"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
              className="w-full px-3 text-white bg-[#99582A] outline-none"
              placeholder="Search products..."
            />
            <button type="submit" className="w-[50px] h-[40px] flex items-center justify-center">
              <FaSearch size="20px" className="text-white" />
            </button>
          </form>
          <Link href="/Pages/Cart">
            <FaCartPlus size="24px" color="white" />
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="bg-[#99582A] xl:hidden flex flex-col items-center gap-4 py-4 border-t">
          <Link href="/" className="text-white text-lg">
            Home
          </Link>
          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button className="text-white text-lg flex items-center gap-1">
              Category ▾
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full -left-20  z-50 bg-white text-black w-[250px] shadow-md border mt-2">
                {[
                  "Biker Jackets",
                  "Artificial Leather Jackets",
                  "Fleece Hoodie",
                  "Black and Brown Jackets",
                  "Denim Jackets",
                  "Casual and Formal Jackets",
                  "Long Coats",
                  "Leather Vests",
                  "Cotton Jackets",
                  "T-Shirts",
                ].map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 hover:bg-[#1f1f1f] hover:text-white cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/Pages/ShopList" className="text-white text-lg">
            Products
          </Link>
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-[90%] max-w-[320px] h-[40px] items-center border-2 border-white rounded-md overflow-hidden"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
              className="w-full px-3 text-white bg-[#99582A] outline-none"
              placeholder="Search products..."
            />
            <button
              type="submit"
              className="w-[50px] h-[40px] flex items-center justify-center"
            >
              <FaSearch size="20px" className="text-white" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
