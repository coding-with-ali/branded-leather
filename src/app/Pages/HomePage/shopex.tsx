import React from 'react'
import Image from 'next/image'

export default function Shopex() {
  return (
    <div className="bg-black py-10 md:px-20 lg:px-28 xl:px-40 pt-10">
    <div className='flex justify-around items-center flex-wrap mt-10'>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/order.webp'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-white text-[22px] font-[700] '>15000 + Orders</p>
                <p className='text-white text-[22px] font-[700]'>Dispatched</p>
            </div>
        </div>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/leather.webp'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-white text-[22px] font-[700]'>100% Genuine</p>
                <p className='text-white text-[22px] font-[700]'>Leather</p>
            </div>
        </div>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/quality.webp'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-white text-[22px] font-[700]'>Premium Quality</p>
                <p className='text-white text-[22px] font-[700]'>Guaranteed</p>
            </div>
        </div>
    </div>
    </div>
  )
}
