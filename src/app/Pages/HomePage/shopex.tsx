

import React from 'react';
import Image from 'next/image';

export default function Herosection() {
  return (
    <div>
      {/* Right Section */}
      <div className="">

        {/* Hero Image */}
        <Image
          src="/shopex.png"
          alt="Hero"
          width={900}
          height={900}
          className='w-[100vw] hidden md:inline-block'
        />
        <Image
          src="/shopex-mobile.png"
          alt="Hero"
          width={900}
          height={900}
          className='w-[100vw] h-auto md:hidden inline-block'
        />
      </div>
    </div>
  );
}
