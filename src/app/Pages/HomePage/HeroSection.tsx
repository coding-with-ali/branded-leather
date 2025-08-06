import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Herosection() {
  return (
    <div>
      {/* Right Section */}
      <Link href='/Pages/PageHero/jacket'>
      <div className="bg-black">

        {/* Hero Image */}
        <Image
          src="/hero.png"
          alt="Hero"
          width={900}
          height={900}
          className='w-[100vw] hidden md:inline-block'
        />
        <Image
          src="/hero-mobile.png"
          alt="Hero"
          width={900}
          height={900}
          className='w-[100vw] h-[78vh] md:hidden inline-block'
        />
      </div>
      </Link>
    </div>
  );
}
