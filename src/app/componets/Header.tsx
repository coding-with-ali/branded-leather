"use client";
import React, { useState, useEffect } from "react";
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
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  name: string;
  image?: any;
  priceUSD?: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setLiveResults([]);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setLiveResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await client.fetch(
          `*[_type == "product" && name match "*${searchQuery}*"][0...6]{
            _id,
            name,
            priceUSD,
            image
          }`
        );
        setLiveResults(data);
      } catch (err) {
        console.error("Live search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [searchQuery]);

  const renderLiveResults = () =>
    liveResults.length > 0 && (
      <div className="absolute top-full left-0 w-full bg-white shadow-md z-50 max-h-64 overflow-y-auto">
        {liveResults.map((product) => (
          <Link
            key={product._id}
            href={`/Pages/ShopGridDynamic/product/${product._id}`}
            className="flex items-center gap-2 p-2 hover:bg-gray-100"
            onClick={() => {
              setSearchQuery("");
              setLiveResults([]);
              setIsSearchOpen(false);
            }}
          >
            <Image
              src={product.image ? urlFor(product.image).url() : "/fallback-image.jpg"}
              alt={product.name}
              width={178}
              height={178}
              className="w-[100px] h-[100px] object-cover"
              priority
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{product.name}</span>
              {product.priceUSD && (
                <span className="text-xs text-gray-500">${product.priceUSD}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    );

  const getDropdownItems = (label: string) =>
    label === "MEN"
      ? [
          { name: "Leather Jackets", slug: "LeatherJacket" },
          { name: "Black Leather Jackets", slug: "BlackLeatherJacket" },
          { name: "Brown Leather Jackets", slug: "BrownLeatherJacket" },
          { name: "Biker Jackets", slug: "MotorcycleJacket" },
          { name: "Cafe Racer Jackets", slug: "CafeRacerJacket" },
          { name: "Bomber Jackets", slug: "BomberJacket" },
        ]
      : [
          { name: "Leather Jackets", slug: "leatherJacket" },
          { name: "Black Leather Jackets", slug: "BlackLeatherJacket" },
          { name: "Brown Leather Jackets", slug: "BrownLeatherJacket" },
          { name: "Biker Jackets", slug: "MotorcycleJacket" },
          { name: "Cafe Racer Jackets", slug: "CafeRacerJacket" },
          { name: "Bomber Jackets", slug: "BomberJacket" },
        ];

  return (
    <div>
      {/* Main Nav */}
      <div className="bg-[#000] w-full flex justify-between items-center px-4 py-2 sm:px-10 relative">
        {/* Left Side */}
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
            <Image src="/logo.jpg" alt="Logo" width={190} height={190} className="w-48 h-auto" />
          </Link>
        </div>

        {/* Desktop Nav */}
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
                <ul className="absolute top-full left-0 z-50 bg-white text-black font-bold font-sans w-[250px] shadow-md border mt-2">
                  {getDropdownItems(label).map((item) => (
                    <li
                      key={item.slug}
                      className="px-4 py-2 hover:bg-[#1f1f1f] hover:text-white"
                    >
                      <Link href={`/Pages/Category/${label}/${item.slug}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href="/Pages/PageHero/bags" className="text-white font-bold text-[15px]">
            LEATHER BAG
          </Link>
          <Link href="/Pages/PageHero/jacket" className="text-white font-bold text-[15px]">
            PRIME DELIVERY
          </Link>
          <Link href="/Pages/ShopList" className="text-white font-bold text-[15px]">
            WINTER JACKET
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block relative w-[280px] xl:w-[320px]">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full h-[40px] items-center border-2 border-white rounded-md overflow-hidden"
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
          {renderLiveResults()}
        </div>
        <div>
          <Link href="/Pages/Cart" className="hidden md:flex bg-[#c84e4b] p-2 rounded-sm">
          <ShoppingBag color="white" />
        </Link>
        </div>

        {/* Mobile Search + Cart */}
        <div className="md:hidden flex items-center gap-3 relative">
          <form
            onSubmit={handleSearchSubmit}
            className={`flex items-center border-2 border-white rounded-md overflow-hidden transition-all duration-300 ease-in-out ${
              isSearchOpen ? "w-[160px]" : "w-[45px]"
            } bg-[#2d2d2d] relative`}
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
          {isSearchOpen && (
            <div className="absolute top-12 left-0 w-[200px]">{renderLiveResults()}</div>
          )}

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
                <ul className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 bg-white font-bold font-sans text-black w-[250px] shadow-md border mt-2">
                  {getDropdownItems(label).map((item) => (
                    <li
                      key={item.slug}
                      className="px-4 py-2 hover:bg-[#1f1f1f] hover:text-white cursor-pointer"
                    >
                      <Link
                        href={`/Pages/Category/${label}/${item.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <Link href="/Pages/PageHero/bags" className="text-white text-[15px] font-extrabold">
            LEATHER BAG
          </Link>
          <Link href="/Pages/ShopList" className="text-white text-[15px] font-extrabold">
            PRIME DELIVERY
          </Link>
          <Link href="/Pages/ShopList" className="text-white text-[15px] font-extrabold">
            WINTER JACKET
          </Link>
        </div>
      )}
    </div>
  );
}
