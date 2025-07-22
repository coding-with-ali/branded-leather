'use client';

import Image from 'next/image';
import React from 'react';

const NewCollectionBanner = () => {
  return (
    <div className=" w-full  flex justify-center">
      <Image
        src="/newcollection.webp"
        alt="New Collection Jacket"
        width={900}
        height={900}
        className="object-contain w-[80vw] h-auto"
        priority
      />
    </div>
  );
};

export default NewCollectionBanner;
