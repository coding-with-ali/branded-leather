import React from 'react'
import Image from 'next/image'

export default function Shopex() {
  return (
    <div className="py-10 md:px-20 lg:px-28 xl:px-40 pt-10">
    <div className='flex justify-around items-center flex-wrap mt-10'>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/2.png'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-[#151875] text-[22px] font-[700] py-3 px-2'>Fast Delivery</p>
                <p className='text-[#1A0B5B4D] text-[16px]'>We offer fast delivery service 24/7 for all your order.</p>
            </div>
        </div>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/1.png'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-[#151875] text-[22px] font-[700] py-3 px-2'>Customer Helpline</p>
                <p className='text-[#1A0B5B4D] text-[16px]'>24/7 costumer helpline support is avilable to assist you anytime.</p>
            </div>
        </div>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/3.png'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-[#151875] text-[22px] font-[700] py-3 px-2'>Secure Payment</p>
                <p className='text-[#1A0B5B4D] text-[16px]'>We ensure 24/7 secure and safe payment transaction.</p>
            </div>
        </div>
        <div className='w-[270px] h-[320px] flex justify-center items-center flex-col shadow-lg px-3'>
            <Image
            src='/4.png'
            alt='Product 1'
            width="900"
            height="900"
            className='w-[65px] h-[65px]'
            />
            <div className='text-center'>
                <p className='text-[#151875] text-[22px] font-[700] py-3 px-2'>Quality Assurance</p>
                <p className='text-[#1A0B5B4D] text-[16px]'>Our 24/7 support ensure product quality and customer satisfaction.</p>
            </div>
        </div>
    </div>
    </div>
  )
}
