

'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionProps {
  className?: string;
}

const faqData = [
  {
    question: 'Can I customize the size or design of my jacket, or order a fully custom made jacket?',
    answer:
      'Whether you need custom sizing or design adjustments, we are here to bring your vision to life. Simply review our size chart, measure yourself, select the closest size, and place your order. Then, email us your order number at info@thegenuineleather.com, detailing any sizing or design changes you want. If you’d like a custom logo or specific design adjustments, just let us know, we’ll make it happen exactly as requested. Have questions? Email us anytime, and we’ll be happy to help!',
  },
  {
    question: 'How What if I love a product but am unsure which size will fit me best?',
    answer:
      'We provide jackets crafted to suit everyone, with sizes ranging from 2XS to 5XL. Use our US standard size chart to measure yourself and confirm your size before placing an order. Our expert designers carefully tailor each jacket for your satisfaction. You can also contact our support for personalized sizing help.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer:
      'We accept returns within 20 days of receiving your item. To initiate a return, simply email us with your order number and issue. Our team will provide you with the return location. For exchanges, return the item and we’ll send out the correct size once we receive it.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We offer secure payments via PayPal, debit/credit cards, MasterCard, and online banking. Orders within Pakistan are delivered in 3–5 business days, while international orders may take 7–12 days.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Visit our tracking page and enter your order number and email. Or email us at info@thegenuineleather.com for your order’s status and estimated delivery time.',
  },
  {
    question: 'Which is the best jacket in your store?',
    answer:
      'All jackets are made from premium leather. Explore our Varsity, Denim, Leather, and Classic collections for a variety of designs. We also offer custom jackets based on your preferences.',
  },
  {
    question: 'How can I ensure I order the correct size for the jacket?',
    answer:
      'Use our size chart, take your measurements, and place your order accordingly. You can also customize the jacket with logos, graphics, zipper style, etc.',
  },
  {
    question: 'How can I cancel my order?',
    answer:
      'To cancel, email info@thegenuineleather.com within 24 hours of placing your order with your request for refund or exchange.',
  },
];

const Question: React.FC<QuestionProps> = ({ className }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className={className ?? ''}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-[28px] lg:text-[44px] font-extrabold text-center mb-10 text-black font-[Stencil]">
          FAQs
        </h2>
        <p className="mb-8 text-black">
          We’re here to help you make the best choice for your jacket purchase. If you have any questions, no matter how small, please email us at info@thegenuineleather.com. We’re always happy to assist.
        </p>

        <div className="space-y-4 text-black">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-[#ebebeb] border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="flex items-center justify-between w-full text-left font-extrabold font-sans text-[18px]"
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
    </div>
  );
};

export default Question;
