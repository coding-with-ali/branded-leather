'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BannerSection() {
  const banners = [
    {
      title: 'Biker Jackets',
      description: 'Feel the ride, wear the roar.',
      image: '/banner1.jpg', // 👈 apni image daalna
      link: '/biker-jackets',
    },
    {
      title: 'Cotton Jackets',
      description: 'Lightweight style, everyday comfort.',
      image: '/banner2.jpg',
      link: '/cotton-jackets',
    },
    {
      title: 'New Arrivals',
      description: 'Fresh looks for a bold season.',
      image: '/banner3.jpg',
      link: '/new-arrivals',
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
            <h3 className="text-[40px] font-bold">{banner.title}</h3>
            <p className="text-md mb-2">{banner.description}</p>
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
