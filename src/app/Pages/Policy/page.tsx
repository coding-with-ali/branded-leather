"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 border-2 border-black mt-10 rounded-xl text-[#222]">
      <h1 className="text-3xl md:text-4xl font-bold uppercase text-center mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed text-justify">
        <p>
          The Branded Leather respects the privacy of its customers and visitors. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">Information We Collect</h2>
        <p>
          We may collect personal information including your name, email address, shipping address, phone number, and payment details when you place an order or sign up on our website.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To process and fulfill your order</li>
          <li>To communicate with you about your order</li>
          <li>To send promotional emails (if subscribed)</li>
          <li>To improve our website and customer service</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">Data Protection</h2>
        <p>
          We implement a variety of security measures to maintain the safety of your personal information. All payment transactions are processed through secure gateways and are not stored or processed on our servers.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">Cookies</h2>
        <p>
          Our website uses cookies to enhance your browsing experience. Cookies help us understand user behavior and improve the site for future visits.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">Third-Party Disclosure</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to outside parties except for trusted third parties who assist in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">Your Consent</h2>
        <p>
          By using our site, you consent to our privacy policy.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-8">Changes to Our Privacy Policy</h2>
        <p>
          If we decide to change our privacy policy, we will post those changes on this page. Policy changes will apply only to information collected after the date of the change.
        </p>

        <p className="mt-8">
          If you have any questions regarding this privacy policy, you may contact us using the information on our Contact page.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
