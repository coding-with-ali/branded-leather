import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full bg-[#f9f4ed] flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left - Image */}
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <Image
          src="/6.webp"
          alt="Leather Bag Hero"
          width={600}
          height={600}
          className=" object-cover w-full h-auto"
        />
      </div>

      {/* Right - Text */}
      <div className="w-full md:w-1/2 text-left font-serif mt-8 px-5 md:py-3 md:mt-0">
        <h1 className="text-xl md:text-4xl font-bold text-black leading-tight">
          INSPIRED BY HERITAGE.
          <br />
          BUILT FOR <span className="text-[#955e28]">GENERATIONS.</span>
        </h1>
        <p className="text-[12px] md:text-lg text-gray-700 mt-6 max-w-xl">
          GENUINE FULL GRAIN LEATHER. DURABLE HARDWARE AND FINISHINGS. IF IT BEARS THE TGL NAME, IT’S MADE FOR THE LONG HAUL.
        </p>

        
        <button className="mt-4 md:mt-8 bg-[#955e28] hover:bg-[#7a4b1f] text-white px-2 py-2 md:px-6 md:py-3 font-semibold rounded">
        <Link href="/Pages/PageHero/bags">
          SIGNATURE COLLECTION
          </Link>
        </button>
      </div>
    </section>
  );
}
