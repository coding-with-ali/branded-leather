"use client";

import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

const DeliveryShippingPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:border-2 border-black mt-10 mb-10 rounded-xl text-[#222]">
      <div className="flex justify-center items-center">
      <TbTruckDelivery size={80}/>
    </div>
      <h1 className="text-3xl md:text-3xl font-extrabold uppercase text-center mb-8">
        Delivery & Shipping
      </h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed text-justify">
        <p>
          We aim to provide you with the best shopping experience by delivering your order as quickly and efficiently as possible. Below are our shipping policies and delivery timelines.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Order Processing</h2>
        <p>
          All orders are processed within 1-3 business days after payment confirmation. During high-demand seasons or holidays, processing may take longer.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Delivery Time</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>USA & Canada: 8-12 business days</li>
          <li>UK, Europe, Australia: 10-15 business days</li>
          <li>Rest of the World: 12-20 business days</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Shipping Charges</h2>
        <p>
          We offer <strong>Resonable Shipping Worldwide</strong> on all orders.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Order Tracking</h2>
        <p>
          Once your order is shipped, a tracking number will be emailed to you so you can monitor your shipment’s progress.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Delivery Delays</h2>
        <p>
          In rare cases, delays can occur due to customs clearance, weather conditions, or other unexpected events. We appreciate your patience and understanding in such situations.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Customs Duties & Taxes</h2>
        <p>
          The Branded Leather is not responsible for any customs duties or taxes applied to your shipment. These fees are the responsibility of the customer.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">Need Help?</h2>
        <p>
          For any shipping or delivery inquiries, please contact our customer support team via the Contact page.
        </p>
      </div>
    </div>
  );
};

export default DeliveryShippingPage;
