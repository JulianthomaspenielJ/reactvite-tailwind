import React from 'react'
import HeaderImg from '../assets/cover.png'

const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row ">
    {/* Hero Left Side */}
    <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='mx-20'>
            <div className="flex flex-row items-center gap-2">
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed font-semibold text-cyan-900'>SCAN <span className='text-cyan-500'>YOUR SKIN</span></h1>
            <div className="flex items-center gap-2">
                <p className="font-base text-sm md:text-base text-gray-500">Scan the infected skin area, know your disease name and Information about it.</p>
            </div>
            <button className='border-2 bg-cyan-500 hover:bg-white hover:border-cyan-500 hover:text-black hover:active-bg-cyan-800 py-2 px-5 mt-10 rounded-lg '>Upload Photo</button>
        </div>
    </div>
    {/* Hero Right Side */}

    <img src={HeaderImg} alt="HeroImg" className='w-full h-auto sm:w-1/2' />
</div>
  )
}

export default Header