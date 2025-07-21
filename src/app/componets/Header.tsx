"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const router = useRouter();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="bg-[#ffc78e] px-4 py-2 text-sm font-semibold text-center md:flex md:justify-between md:items-center md:px-10">
        <div className="hidden md:flex items-center gap-2">
          <span>Follow Us:</span>
          <FaFacebookF />
          <FaInstagram />
          <FaPinterestP />
          <FaYoutube />
        </div>
        <div>
          🔥 Extra Save $15 Today! Use Code: <b>SAVE15</b>
        </div>
        <Link href="/Pages/Cart" className="hidden md:flex bg-[#c84e4b] p-2 rounded-sm">
          <ShoppingBag color="white" />
        </Link>
      </div>

      {/* Main Nav */}
      <div className="bg-[#000] w-full h-fit flex justify-between items-center border-b-2 px-4 md:py-2 sm:px-10">
        <div className="flex items-center gap-3">
          {isMenuOpen ? (
            <FaTimes
              size={24}
              className="text-white xl:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <FaBars
              size={24}
              className="text-white xl:hidden"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
          <Link href="/">
            <Image
                    src="/logo.jpg"
                    alt="Hero"
                    width={190}
                    height={190}
                    className='w-48 h-auto'
                  />
              </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex gap-6 items-center">
          {["MEN", "WOMEN"].map((label) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => setDropdown(label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <button className="text-white font-bold text-[15px] flex items-center gap-1">
                {label} ▾
              </button>
              {dropdown === label && (
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
          ))}
          <Link href="/" className="text-white font-bold text-[15px]">LEATHER BAG</Link>
          <Link href="/Pages/ShopList" className="text-white font-bold text-[15px]">PRIME DELIVERY</Link>
          <Link href="/Pages/ShopList" className="text-white font-bold text-[15px]">WINTER JACKET</Link>
        </div>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex w-[280px] xl:w-[320px] h-[40px] items-center border-2 border-white rounded-md overflow-hidden"
        >
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 text-white bg-[#1c1b1b] outline-none"
            placeholder="Search products..."
          />
          <button type="submit" className="w-[50px] h-[40px] flex items-center justify-center">
            <FaSearch size="20px" className="text-white" />
          </button>
        </form>

        {/* Mobile Search & Cart */}
        <div className="md:hidden flex items-center gap-3">
          {/* Expandable Search */}
          <form
            onSubmit={handleSearchSubmit}
            className={`flex items-center border-2 border-white rounded-md overflow-hidden transition-all duration-300 ease-in-out ${
              isSearchOpen ? "w-[200px] pl-2" : "w-[45px]"
            } bg-[#2d2d2d]`}
          >
            {isSearchOpen && (
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-white placeholder-white text-sm px-2 py-1 w-full outline-none"
                placeholder="Search jackets"
              />
            )}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="w-[45px] h-[40px] flex items-center justify-center"
            >
              <FaSearch size="18px" className="text-white" />
            </button>
          </form>

          <Link href="/Pages/Cart" className="bg-[#c84e4b] p-2 rounded-sm">
            <ShoppingBag color="white" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-[#1c1b1b] xl:hidden flex flex-col items-center gap-4 py-4 border-t">
          {["MEN", "WOMEN"].map((label) => (
            <div key={label} className="relative">
              <button
                className="text-white text-[15px] font-extrabold flex items-center gap-1"
                onClick={() => setDropdown(dropdown === label ? null : label)}
              >
                {label} ▾
              </button>
              {dropdown === label && (
                <ul className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 bg-white text-black w-[250px] shadow-md border mt-2">
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
          ))}
          <Link href="/" className="text-white text-[15px] font-extrabold">LEATHER BAG</Link>
          <Link href="/Pages/ShopList" className="text-white text-[15px] font-extrabold">PRIME DELIVERY</Link>
          <Link href="/Pages/ShopList" className="text-white text-[15px] font-extrabold">WINTER JACKET</Link>
        </div>
      )}
    </div>
  );
}
