"use client";

import React from "react";

const TermsConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 border-2 border-black mt-10 rounded-xl text-[#222]">
      <h1 className="text-3xl md:text-4xl font-bold uppercase text-center mb-8">
        Terms & Conditions
      </h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed text-justify">
        <p>
          Welcome to The Branded Leather. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions in full.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">License</h2>
        <p>
          Unless otherwise stated, The Branded Leather and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">You Must Not:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Republish material from this website</li>
          <li>Sell, rent or sub-license material</li>
          <li>Reproduce, duplicate or copy material</li>
          <li>Redistribute content from The Genuine Leather</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">User Comments</h2>
        <p>
          Certain parts of this website offer the opportunity for users to post comments and exchange opinions. The Genuine Leather does not filter, edit, publish, or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of The Genuine Leather.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">Hyperlinking to Our Content</h2>
        <p>
          Organizations may link to our website without prior written approval, including government agencies, search engines, news organizations, and online directory distributors.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">No Use of Logo or Artwork</h2>
        <p>
          No use of The Branded Leather’s logo or other artwork will be allowed without a trademark license agreement.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">Reservation of Rights</h2>
        <p>
          We reserve the right to request that you remove all links or any particular link to our website. We also reserve the right to amend these terms and conditions at any time.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">Removal of Links</h2>
        <p>
          If you find any link on our website that is offensive, you are free to contact and inform us. We will consider requests to remove links but we are not obligated to respond directly.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">Content Liability</h2>
        <p>
          We shall have no responsibility or liability for any content appearing on your website. You agree to indemnify and defend us against all claims arising from your website.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website.
        </p>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
