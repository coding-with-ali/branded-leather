
"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePageHero() {
  return (
    <div className="relative bg-black text-white flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Semi-circle background */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200vw] h-[200vw] rounded-full z-0" />

      {/* Images in circular layout */}
      <div className="relative z-10 w-full max-w-[1000px] h-[400px] md:h-[500px] flex items-center justify-center">
        {/* Top Center */}
        <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 text-center flex flex-col items-center">
       <Link href="/Pages/PageHero/jacket">
          <Image src="/1.webp" alt="Leather Jackets" width={200} height={200} 
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
          />
          </Link>
        </div>

        {/* Left Top */}
        <div className="absolute top-28 md:top-[10%] left-[10%] text-center flex flex-col items-center">
       <Link href="/Pages/PageHero/jacket">
          <Image src="/2.webp" alt="Premium Jackets" width={150} height={150}
          className="w-[130px] h-[130px] md:w-[150px] md:h-[150px]" />
        </Link>
        </div>


        {/* Right Top */}
        <div className="absolute top-28 md:top-[10%] right-[10%] text-center flex flex-col items-center">
       <Link href="/Pages/PageHero/jacket">
          <Image src="/4.webp" alt="Leather Vest" width={150} height={150} 
          className="w-[130px] h-[130px] md:w-[150px] md:h-[150px]"/>
        </Link>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-8 md:bottom-[10%] left-[10%] text-center flex flex-col items-center">
       <Link href="/Pages/PageHero/bags">
          <Image src="/3.webp" alt="Leather Bags" width={135} height={135} 
          className="w-[120px] h-[130px] md:w-[135px] md:h-[135px]"/>
          </Link>
        </div>

        {/* Bottom Right */}
        <div className="absolute bottom-8 md:bottom-[10%] right-[10%] text-center flex flex-col items-center">
       <Link href="/Pages/PageHero/wallet">
          <Image src="/5.webp" alt="Leather Wallets" width={135} height={135} 
          className="w-[120px] h-[130px] md:w-[135px] md:h-[135px]"/>
        </Link>
        </div>
        
      </div>

      {/* Center Heading & Buttons */}
      <div className="relative z-10 md:-mt-56 text-center">
        <h2 className="text-lg md:text-2xl font-serif font-semibold uppercase">Let&rsquo;s Craft Your Next</h2>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase mt-2 tracking-wider">Masterpiece</h1>

        <div className="flex gap-4 justify-center mt-6 flex-wrap">
          <Link href="/Pages/ShopList">
            <button className="bg-[#ad6b37] text-white px-6 py-2 font-semibold uppercase rounded-sm hover:bg-[#955826] transition-all">
              Shop Jackets
            </button>
          </Link>
          <Link href="/Pages/ShopList">
            <button className="border border-white text-white px-6 py-2 font-semibold uppercase rounded-sm hover:bg-white hover:text-black transition-all">
              Shop Bags
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
