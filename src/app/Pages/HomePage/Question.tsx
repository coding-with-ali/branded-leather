'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional for icons

const faqData = [
  {
    question: 'What materials are used in your leather jackets?',
    answer:
      'We use 100% genuine leather, sourced from premium tanneries. Each jacket goes through strict quality checks.',
  },
  {
    question: 'How do I find my correct size?',
    answer:
      'We provide a detailed size chart on every product page. You can also contact our support for personalized sizing help.',
  },
  {
    question: 'Do you offer returns or exchanges?',
    answer:
      'Yes, we offer a 7-day return or exchange policy if the product is unused and tags are intact.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Orders are delivered within 3–5 business days across Pakistan. International orders may take 7–12 days.',
  },
];

const FaqSection = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-[28px] lg:text-[44px] font-extrabold text-center mb-10 text-black font-[Stencil] ">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="flex items-center justify-between w-full text-left font-semibold text-[18px]"
            >
              <span>{item.question}</span>
              {openIndexes.includes(index) ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {openIndexes.includes(index) && (
              <p className="mt-3 text-gray-700 text-[16px]">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
