
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: 'Can I customize the size or design of my jacket, or order a fully custom made jacket?',
    answer:
      'Whether you need custom sizing or design adjustments, we are here to bring your vision to life. Simply review our size chart, measure yourself, select the closest size, and place your order. Then, email us your order number at info@thegenuineleather.com, detailing any sizing or design changes you want. If you&rsquo;d like a custom logo or specific design adjustments, just let us know, we&rsquo;ll make it happen exactly as requested. Have questions? Email us anytime, and we&rsquo;ll be happy to help!',
  },
  {
    question: 'How What if I love a product but am unsure which size will fit me best?',
    answer:
      'We provide Our jackets are crafted to suit everyone, with sizes ranging from 2XS to 5XL, so you can find the ideal fit. Use our US standard size chart, available on our website, to measure yourself and confirm your size before placing an order this ensures you select the right fit every time. Our expert designers carefully tailor each jacket to perfection for your satisfaction. detailed size chart on every product page. You can also contact our support for personalized sizing help.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer:
      'We accept returns within 20 days of receiving your item. To initiate a return, simply email us with your order number, detailing the issue and reason for the return. Our Customer Happiness Representative will guide you through the process and provide you with the nearest return location. For exchanges, you can return the item within 20 days of receiving the order to our nearby warehouse, and once we receive it, we will send out the correct size for you.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'OrderWe offer secure payment options for your convenience. You can pay using PayPal, any major debit or credit card, MasterCard, or digital online banking. Choose the payment method that works best for you and enjoy a safe checkout experience. Orders are delivered within 3&ndash;5 business days across Pakistan. International orders may take 7&ndash;12 days.',
  },
  {
    question: 'How can I track my order?',
    answer:
      'Tracking your order is simple! Just visit our tracking page and enter your order number along with the email address you used when placing your order. This will show you the current status and location of your order. Alternatively, you can email us at info@thegenuineleather.com with your order details, and our representative will provide you with accurate information and the expected arrival time.',
  },
  {
    question: 'Which is the best jacket in your store?',
    answer:
      'All of our jackets are crafted from the finest premium leather, so you can confidently choose any one of them without regret. To help you find the perfect fit, we recommend exploring our collections, which include Varsity jackets, denim options, leather styles, and classic coats. Each collection offers unique designs and features to suit your taste! If you don&rsquo;t find exactly what you&rsquo;re looking for in our store, feel free to contact us with your desired design or jacket details. With our years of experience, we can create a custom piece tailored specifically to your needs.',
  },
  {
    question: 'How can I ensure I order the correct size for the jacket?',
    answer:
      'To order the correct size for your jacket, please refer to our size chart, take your measurements, and place your order accordingly. Additionally, you have the option to customize your jacket&rsquo;s style to meet your preferences, including graphics, logos, zipper designs, and more.',
  },
  {
    question: 'How can I cancel my order?',
    answer:
      'If you need a Cancel, you should initiate the process by emailing info@thegenuineleather.com within 24 hours of receiving your order. In the email, you should describe whether you request a refund or an exchange.',
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
    <div className="bg-white max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-[28px] lg:text-[44px] font-extrabold text-center mb-10 text-black font-[Stencil] ">
        FAQs
      </h2>
      <p className="mb-8 text-black">
        We&rsquo;re here to help you make the best choice for your jacket purchase. If you have any questions, no matter how small, please don&rsquo;t hesitate to email us at info@thegenuineleather.com. We&rsquo;re always happy to assist.
      </p>

      <div className="space-y-4 bg-white text-black">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="bg-[#ebebeb] border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="flex items-center justify-between w-full text-left font-extrabold text-[18px]"
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
