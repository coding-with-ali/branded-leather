import Image from 'next/image';
import Link from 'next/link';

export default function BottomHero() {
  return (
    <section className="w-full bg-[#f9f4ed] flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left - Image */}

      {/* Right - Text */}
      <div className="w-full md:w-1/2 text-left font-serif mt-8 px-5 md:mt-0">
        <h1 className="text-xl md:text-5xl font-bold text-black leading-tight">
           ROOTED IN TRADITION.
          <br />
         DESIGNED FOR<span className="text-[#955e28]">THE FUTURE..</span>
        </h1>
        <p className="text-[12px] md:text-lg text-gray-700 mt-6 max-w-xl">
          AUTHENTIC FULL GRAIN LEATHER. RESILIENT HARDWARE AND FINISHES. EVERY TGL PIECE IS CRAFTED FOR ENDURING QUALITY.
        </p>

        <button className="mt-4 md:mt-8 bg-[#955e28] hover:bg-[#7a4b1f] text-white px-2 py-2 md:px-6 md:py-3 font-semibold rounded">
        <Link href="/Pages/PageHero/bags">
          SIGNATURE COLLECTION
          </Link>
        </button>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-start">
        <Image
          src="/bottom hero.webp"
          alt="Leather Bag Hero"
          width={600}
          height={600}
          className=" object-cover w-full h-auto"
        />
      </div>
    </section>
  );
}
