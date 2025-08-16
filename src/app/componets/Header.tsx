
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useSelector } from "react-redux";

// --- Types ---
interface Product {
  _id: string;
  name: string;
  image?: any;
  priceUSD?: string;
}


// --- Dummy Data ---
const outfit = [
  { label: "Leather Jackets", slug: "LeatherJacket" },
  { label: "Black Leather Jacket", slug: "BlackLeatherJacket" },
  { label: "Brown Leather Jacket", slug: "BrownLeatherJacket" },
  { label: "Motorcycle Jackets", slug: "MotorcycleJacket" },
  { label: "Biker's Jacket", slug: "BikerJacket" },
  { label: "Bomber Jackets", slug: "BomberJacket" },
  { label: "Cafe Racer Jacket", slug: "CafeRacerJacket" },


];

const allSeason = [
  { label: "Aviator Jacket", slug: "AviatorJacket", img: "/avitar.webp", badge: "New" },
  { label: "Suede Jacket", slug: "SuedeJacket", img: "/sudue.webp" },
  { label: "Coats", slug: "Coats", img: "/coat.jpg" },
  { label: "Shearling Jacket", slug: "ShearlingJacket", img: "/shearling.webp" },
  { label: "Puffers", slug: "Puffers", img: "/puffer.webp" },
];

const trendingBanners = [
  { img: "/dropdown1.webp", alt: "Sale Banner" },
  { img: "/dropdown2.webp", alt: "New Collection" },
  { img: "/dropdown3.webp", alt: "New Collection" },
];

// --- MegaMenu ---
function MegaMenu({ label }: { label: string }) {
  return (
    <div className="flex justify-center item center mx-auto left-14 top-24 fixed">
      <div className=" w-[90vw] bg-white text-black shadow-xl rounded-b-xl p-8 z-50 hidden lg:block">
        <div className="grid grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* Outfit */}
          <div>
            <h3 className="text-lg font-extrabold mb-3">OUTFIT</h3>
            <ul className="space-y-2 font-bold">
              {outfit.map((o) => (
                <li key={o.label}>
                  <Link href={`/Pages/Category/${label}/${o.slug}`} className="hover:text-[#c84e4b]">
                    {o.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* All Season */}
          <div>
            <h3 className="text-lg font-extrabold mb-3">ALL SEASON</h3>
            <ul className="space-y-3 font-bold">
              {allSeason.map((it) => (
                <li key={it.label} className="flex items-center gap-3">
                  <Image src={it.img} alt={it.label} width={50} height={50} className="rounded-full border" />
                  <Link href={`/Pages/Category/${label}/${it.slug}`} className="hover:text-[#c84e4b]">
                    {it.label}
                  </Link>
                  {it.badge && <span className="text-[10px] bg-red-600 text-white px-2 py-[1px] rounded">{it.badge}</span>}
                </li>
              ))}
            </ul>
          </div>

          {/* Trending */}
          <div>
            <h3 className="text-lg font-extrabold mb-3">TRENDING PRODUCTS</h3>
            <div className="flex flex-col gap-3 mt-4">
              {trendingBanners.map((b) => (
                <Image key={b.alt} src={b.img} alt={b.alt} width={250} height={120} className="rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [liveResults, setLiveResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const cartCount = useSelector((state: any) =>
    state.cart.reduce((total: number, item: any) => total + item.quantity, 0)
  );
  // --- Live Search ---
  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setLiveResults([]);
      setDropdown(null);
    }
  };

  useEffect(() => {
    if (!searchQuery.trim()) return setLiveResults([]);
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await client.fetch(
          `*[_type=="product" && name match "*${searchQuery}*"][0...6]{_id,name,priceUSD,image}`
        );
        setLiveResults(data);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const renderLiveResults = () =>
    liveResults.length > 0 && (
      <div className="absolute top-full left-0 w-full text-black bg-white shadow-md z-50 max-h-64 overflow-y-auto rounded-md border">
        {liveResults.map((p) => (
          <Link
            key={p._id}
            href={`/Pages/ShopGridDynamic/product/${p._id}`}
            className="flex items-center gap-2 p-2 hover:bg-gray-100"
            onClick={() => {
              setSearchQuery("");
              setLiveResults([]);
            }}
          >
            <Image src={p.image ? urlFor(p.image).url() : "/fallback.jpg"} alt={p.name} width={60} height={60} className="w-[50px] h-[50px] object-cover rounded" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{p.name}</span>
              {p.priceUSD && <span className="text-xs text-gray-500">${p.priceUSD}</span>}
            </div>
          </Link>
        ))}
      </div>
    );

  return (
    <header className="bg-[#000] text-white relative">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
          {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.jpg" alt="Logo" width={160} height={60} className="w-40 h-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-10 items-center justify-center">
          {(["MEN", "WOMEN"] as const).map((label) => (
            <div
              key={label}
              className="relative"
              onMouseEnter={() => setDropdown(label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <button className="text-white font-bold lg:text-[10px] xl:text-[16px] flex items-center gap-1 hover:text-[#c84e4b]">
                {label} ▾
              </button>
              {dropdown === label && <MegaMenu label={label} />}
            </div>
          ))}

          <Link href="/Pages/PageHero/bags" className="font-bold hover:text-[#c84e4b] lg:text-[10px] xl:text-[16px]">LEATHER BAG</Link>
          <Link href="/Pages/PageHero/jacket" className="font-bold hover:text-[#c84e4b] lg:text-[10px] xl:text-[16px]">PRIME DELIVERY</Link>
          <Link href="/Pages/Category/Winter/All" className="font-bold hover:text-[#c84e4b] lg:text-[10px] xl:text-[16px]">WINTER JACKETS</Link>
        </nav>

        {/* Desktop Search + Cart */}
        <div className="flex items-center gap-6 relative">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex h-[40px] items-center border border-gray-400 rounded-md overflow-hidden w-[220px] xl:w-[300px]">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 text-white bg-[#1c1b1b] outline-none"
              placeholder="Search jackets..."
            />
            <button type="submit" className="w-[45px] h-full flex items-center justify-center">
              <FaSearch size={18} />
            </button>
          </form>
          {renderLiveResults()}

          <Link href="/Pages/Cart" className="relative">
            <ShoppingBag className="w-8 h-8 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>


      </div>


      {/* Mobile/Tablet Dropdown */}
      {isMenuOpen && (
        <div className="xl:hidden bg-[#1c1b1b] text-white flex flex-col gap-6 px-6 py-4">
          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex h-[40px] items-center border border-gray-400 rounded-md overflow-hidden">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 text-white bg-[#1c1b1b] outline-none"
              placeholder="Search jackets..."
            />
            <button type="submit" className="w-[45px] h-full flex items-center justify-center">
              <FaSearch size={18} />
            </button>
          </form>
          {renderLiveResults()}

          {(["MEN", "WOMEN"] as const).map((label) => (
            <div key={label}>
              <button onClick={() => setDropdown(dropdown === label ? null : label)} className="w-full flex justify-between py-2 font-bold">
                {label} ▾
              </button>
              {dropdown === label && (
                <div className="flex flex-col gap-6 mt-2">
                  {/* Outfit */}
                  <div>
                    <h3 className="font-extrabold mb-2">OUTFIT</h3>
                    <ul className="space-y-2">
                      {outfit.map((o) => (
                        <li key={o.label}><Link href={`/Pages/Category/${label}/${o.slug}`} className="hover:text-[#c84e4b]">{o.label}</Link></li>
                      ))}
                    </ul>
                  </div>

                  {/* All Season */}
                  <div>
                    <h3 className="font-extrabold mb-2">ALL SEASON</h3>
                    <ul className="space-y-3">
                      {allSeason.map((it) => (
                        <li key={it.label} className="flex items-center gap-3">
                          <Image src={it.img} alt={it.label} width={40} height={40} className="rounded-full border" />
                          <Link href={`/Pages/Category/${label}/${it.slug}`} className="hover:text-[#c84e4b]">{it.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link href="/Pages/PageHero/bags" className="font-bold hover:text-[#c84e4b] lg:text-[10px] xl:text-[16px]">LEATHER BAG</Link>
          <Link href="/Pages/PageHero/jacket" className="font-bold hover:text-[#c84e4b] lg:text-[10px] xl:text-[16px]">PRIME DELIVERY</Link>
          <Link href="/Pages/Category/Winter/All" className="font-bold hover:text-[#c84e4b] lg:text-[10px] xl:text-[16px]">WINTER JACKETS</Link>
        </div>
      )}
    </header>
  );
}
