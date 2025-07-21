'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BannerSection() {
  const banners = [
    {
      title: 'TOP RATED ',
      description:"BEST SELLING",
      image: '/best selling.webp',
      link: '/Pages/PageHero/bags',
    },
    {
      title: 'Classic pieces',
      description:" OUT DOOR APPERAL",
      image: '/out door.webp',
      link: '/Pages/PageHero/jacket',
    },
    {
      title: 'New listing',
      description: "LEATHER PURSE",
      image: '/leather purse.webp',
      link: '//Pages/PageHero/wallet',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-4 md:px-10 lg:pt-[100px]">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="w-full md:w-1/3 bg-white shadow-md rounded-lg overflow-hidden group relative"
        >
          {/* Background Image */}
          <div className="h-[380px] w-full relative">
            <Image
              src={banner.image}
              alt={banner.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="absolute bottom-5 left-5 z-10 text-white">
            <h3 className="text-[20px]  font-bold">{banner.title}</h3>
            <p className="text-[30px] mb-2">{banner.description}</p>
            <Link
              href={banner.link}
              className="inline-block px-4 py-2 bg-white text-black text-sm font-semibold rounded hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-40 transition duration-300"></div>
        </div>
      ))}
    </div>
  );
}
