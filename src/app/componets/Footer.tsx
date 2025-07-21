
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-10 px-5 md:px-20 lg:px-28 xl:px-40">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Newsletter */}
        <div className="flex flex-col">
          <Image
            src="/logo.jpg"
            alt="Hero"
            width={900}
            height={900}
            className=""
          />
          <div className="flex mt-5">
            <p className="text-white text-[12px]">
              Explore our premium collection of jackets designed for style and comfort.
            </p>
          </div>
          <p className="text-white text-sm mt-5">
            Contact Info<br />17 Princess Road, London, Greater London NW1 8JR, UK
          </p>
        </div>

        {/* Explore Column */}
        <div>
          <h3 className="text-[20px] font-bold text-white mb-3">Explore</h3>
          <ul className="space-y-2 text-white text-[14px]">
            <li><Link href="/mens-jackets" className="hover:underline">MEN&rsquo;S JACKETS</Link></li>
            <li><Link href="/womens-jackets" className="hover:underline">WOMEN&rsquo;S JACKETS</Link></li>
            <li><Link href="/leather-bags" className="hover:underline">LEATHER BAGS</Link></li>
            <li><Link href="/winter-jackets" className="hover:underline">WINTER JACKETS</Link></li>
            <li><Link href="/aviator-jackets" className="hover:underline">AVIATOR JACKETS</Link></li>
            <li><Link href="/distressed-jackets" className="hover:underline">DISTRESSED JACKETS</Link></li>
            <li><Link href="/leather-vest" className="hover:underline">LEATHER VEST</Link></li>
            <li><Link href="/biker-jackets" className="hover:underline">BIKER JACKETS</Link></li>
            <li><Link href="/fur-jackets" className="hover:underline">FUR JACKETS</Link></li>
            <li><Link href="/cafe-racer-jackets" className="hover:underline">CAFE RACER JACKETS</Link></li>
            <li><Link href="/bomber-jackets" className="hover:underline">BOMBER JACKETS</Link></li>
            <li><Link href="/custom-jackets" className="hover:underline">CUSTOM JACKETS</Link></li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h3 className="text-[20px] font-bold text-white mb-3">Help?</h3>
          <ul className="space-y-2 text-white text-[14px]">
            <li><Link href="/our-story" className="hover:underline">OUR STORY</Link></li>
            <li><Link href="/size-guide" className="hover:underline">SIZE GUIDE</Link></li>
            <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link href="/blogs" className="hover:underline">BLOGS</Link></li>
            <li><Link href="/contact-us" className="hover:underline">CONTACT US</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">PRIVACY POLICY</Link></li>
            <li><Link href="/delivery-shipping" className="hover:underline">DELIVERY &amp; SHIPPING</Link></li>
            <li><Link href="/terms-conditions" className="hover:underline">TERMS &amp; CONDITION</Link></li>
            <li><Link href="/return-exchange" className="hover:underline">RETURN &amp; EXCHANGE POLICY</Link></li>
            <li><Link href="/customer-support" className="hover:underline">CUSTOMER SUPPORT</Link></li>
            <li><Link href="/Pages/order-tracking" className="hover:underline">ORDER TRACKING</Link></li>
            <li><Link href="/order-tracking" className="hover:underline">ADMIN PANEL</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-[28px] font-bold text-[#d9ccb5]">WE&rsquo;RE HERE TO HELP!</h3>
          <p className="text-white text-center text-[16px] font-bold pt-5">info@thegenuineleather.com</p>
          <p className="text-white text-center text-[16px] font-bold pt-5">Dispatching Unit</p>
          <p className="text-white text-center text-[16px] font-bold pt-5">USA - Australia - UAE</p>
        </div>
      </div>

      <div className="flex justify-around items-center mt-10 border-t border-[#E3E3E3] pt-7 text-center">
        <p className="text-white text-sm">
          &copy;Branded Leather - All Rights Reserved
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <FaFacebookF className="text-white transition" />
          <FaTwitter className="text-white transition" />
          <FaInstagram className="text-white transition" />
        </div>
      </div>
    </footer>
  );
}
