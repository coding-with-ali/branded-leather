import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#99582A] py-10 px-5 md:px-20 lg:px-28 xl:px-40">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Newsletter */}
        <div className="flex flex-col">
          <h2 className="text-[24px] font-[forte] font-bold text-white">
            Leather Brother
          </h2>
          <div className="flex mt-5">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="border-2 border-white rounded-l-lg px-4 py-2 text-sm w-full"
            />
            <button className="bg-[#99582A] text-white border-white border-2 rounded-r-lg px-6 py-2 text-sm">
              Sign Up
            </button>
          </div>
          <p className="text-white text-sm mt-5">
            Contact Info<br />17 Princess Road, London, Greater London NW1 8JR, UK
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-[18px] font-bold text-white">Categories</h3>
          <ul className="text-white mt-3 space-y-2">
            <li className="hover:text-white">Laptops & Computers</li>
            <li className="hover:text-white">Cameras & Photography</li>
            <li className="hover:text-white">Smart Phones & Tablets</li>
            <li className="hover:text-white">Video Games & Consoles</li>
            <li className="hover:text-white">Waterproof Headphones</li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-[18px] font-bold text-white">Customer Care</h3>
          <ul className="text-white mt-3 space-y-2">
            <li className="hover:text-white">My Account</li>
            <li className="hover:text-white">Discount</li>
            <li className="hover:text-white">Returns</li>
            <li className="hover:text-white">Orders History</li>
            <li className="hover:text-white">Order Tracking</li>
          </ul>
        </div>

        {/* Pages */}
        <div>
          <h3 className="text-[18px] font-bold text-white">Pages</h3>
          <ul className="text-white mt-3 space-y-2">
            <li className="hover:text-white">Blog</li>
            <li className="hover:text-white">Browse the Shop</li>
            <li className="hover:text-white">Category</li>
            <li className="hover:text-white">Pre-Built Pages</li>
            <li className="hover:text-white">Visual Composer Elements</li>
            <li className="hover:text-white">WooCommerce Pages</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-around items-center mt-10 border-t border-[#E3E3E3] pt-7 text-center">
        <p className="text-white text-sm">
          ©Leather Brother - All Rights Reserved
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <FaFacebookF className="text-white transition" />
          <FaTwitter className="text-white transition" />
          <FaInstagram className="text-white transition" />
        </div>
      </div>
    </footer>
  );
};

