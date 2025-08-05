"use client";

import React from "react";

const ReturnExchangePolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 border-2 border-black mt-10 rounded-xl text-[#222]">
      <h1 className="text-3xl md:text-4xl font-bold uppercase text-center mb-8">
        Return & Exchange Policy
      </h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed text-justify">
        <p>
          We at The Branded Leather strive to provide you with the best quality products. However, if you are not entirely satisfied with your purchase, we’re here to help.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Return & Exchange Eligibility
        </h2>
        <p>
          We accept returns and exchanges within 30 days from the delivery date. To be eligible for a return or exchange, your item must be unused and in the same condition you received it. It must also be in the original packaging.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Non-returnable Items
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Custom-made or personalized items</li>
          <li>Items on sale or purchased with discount codes</li>
        </ul>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Return Process
        </h2>
        <p>
          To initiate a return or exchange, please contact us at{" "}
          <a href="mailto:support@thegenuineleather.com" className="text-blue-600 underline">
            support@thegenuineleather.com
          </a>{" "}
          with your order number and reason for return.
        </p>
        <p>
          Once your request is approved, we’ll provide a return address. Please ensure the product is securely packaged. We recommend using a trackable shipping service.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Refunds
        </h2>
        <p>
          Once we receive your returned item, we’ll inspect it and notify you of the status of your refund. If approved, your refund will be processed to your original payment method within 5–7 business days.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Late or Missing Refunds
        </h2>
        <p>
          If you haven’t received a refund yet, first check your bank account. Then contact your credit card company — it may take some time before your refund is officially posted.
        </p>
        <p>
          If you’ve done all of this and you still have not received your refund, please contact us at{" "}
          <a href="mailto:support@thegenuineleather.com" className="text-blue-600 underline">
            support@thegenuineleather.com
          </a>.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">
          Shipping Costs
        </h2>
        <p>
          You will be responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable.
        </p>

        <h2 className="text-xl md:text-2xl font-semibold mt-6">Need Help?</h2>
        <p>
          Contact us at{" "}
          <a href="mailto:support@thegenuineleather.com" className="text-blue-600 underline">
            support@thegenuineleather.com
          </a>{" "}
          for questions related to refunds and returns.
        </p>
      </div>
    </div>
  );
};

export default ReturnExchangePolicy;
