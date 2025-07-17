import React from 'react';
import Image from 'next/image';

export default function Herosection() {
  return (
    <div>
    <div className="bg-black w-full h-[90vh] md:h-auto flex flex-col lg:flex-row items-center justify-around p-4 lg:p-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
        <div className="text-center lg:text-left ">
          <h2 className="text-[36px] md:text-[46px] lg:text-[36px] xl:text-[60px] text-white font-extrabold font-vibes lg:font-[Stencil] mt-2">
           Shop The Best Selection Of <span className='text-yellow-300'> Leather Jacket </span>
          </h2>
          <p className="text-[15px] md:text-[24px] lg:text-[20px] text-white font-[lato] mt-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in
            est adipiscing <br /> in phasellus non in justo.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative mt-12 lg:mt-0">

        {/* Hero Image */}
        <Image
          src="/hero.png"
          alt="Hero"
          width={900}
          height={900}
          className=" top-[25px] md:top-[30px] lg:top-[50px] right-12 lg:right-20 w-[300px] h-[350px] md:w-[430px] md:h-[400px] xl:w-[730px] xl:h-[530px] rounded-full"
          />
      </div>
    </div>
    </div>
  );
}
