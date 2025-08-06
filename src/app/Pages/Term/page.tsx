"use client";

import React from "react";
import { LiaFileContractSolid } from "react-icons/lia";

const TermsConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:border-2 border-black mt-10 mb-10 rounded-xl text-[#222]">
      <div className="flex justify-center items-center">
                  <LiaFileContractSolid size={80}/>
                </div>
      <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-center mb-8">
        Terms & Conditions
      </h1>

      <div className="space-y-6 text-base md:text-lg leading-relaxed text-justify">
        <p>
          Welcome to The Branded Leather. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions in full.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">PAYMENT OPTIONS:</h2>
        <p>
          When it comes to payments, your safety and security is our top priorities at The Genuine Leather. We accept payments from Discover, PayPal, Visa, MasterCard, and American Express, and we guarantee the maximum safety of your transactions. Our SSL Certificate ensures a secure platform for your payments. Simply enter your card number when placing your order online, and let the SSL layer page handle the rest. Please note that we do not accept cheques or cash, so credit cards and PayPal are the only accepted modes of payment.
        </p>


        <h2 className="text-xl md:text-2xl font-bold mt-6">ACCEPTANCE OR REJECTION OF ORDER:</h2>
        <p>
          At The Branded Leather, we want to ensure that every order is processed efficiently and accurately. Therefore, we reserve the right to either accept or reject your order in certain circumstances. When you place an order on our website, please be prepared to answer some essential questions to facilitate processing your order.
        </p>

        <h2 className="text-xl md:text-2xl font-bold mt-6">USERS & ACCOUNTS:</h2>
        <p>
          All registered customers must follow Branded Leather’s guidelines to ensure the privacy of their accounts.
        </p>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
