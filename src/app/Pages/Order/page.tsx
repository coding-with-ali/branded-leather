import Link from "next/link";

export default function cart () {
  
  return (
    <div>
      <div className="py-20">
        <div className="m-auto w-full md:w-[500px] h-[40vh] text-center">
            <h3 className="text-[30px] md:text-[36px] py-3">Your Order Is Completed! </h3>
            <p className="text-[10px] md:text-[20px] py-3 mb-8">Thank you for your order! Your order is being processed and will be completed within 3-6
            hours. You will receive an email confirmation when your order is completed.
            </p>
            <Link href="/" className=" bg-[#99582A] text-white px-4 py-4  rounded w-full text-[24px] md:text-base">
                Countinue Shopping
              </Link>
        </div>
      </div>
    </div>
  );
};
