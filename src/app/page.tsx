import FadeInWhenVisible from '../app/componets/FadeInWhenVisible';
import React from 'react'
import FeaturedWrapper from '../app/componets/FeaturedWrapper';
import Shopex from './Pages/HomePage/shopex'
import Topcategory from './Pages/HomePage/topcategory'
import Question from './Pages/HomePage/Question'
import HeroSection from './Pages/HomePage/HeroSection';
import HomePageHero from './Pages/HomePage/HomePageHero';
import HeritageHeroSection from './Pages/HomePage/HeritageHeroSection';
import BagWrapper from '../app/componets/BagWrapper'
import BottomHero from '../app/Pages/HomePage/BottomHero'

export default function page() {
  return (
    <main className='bg-white' >
      <FadeInWhenVisible><HeroSection/></FadeInWhenVisible>
      <FadeInWhenVisible><HomePageHero/></FadeInWhenVisible>
      <FadeInWhenVisible><HeritageHeroSection/></FadeInWhenVisible>
      <FadeInWhenVisible><FeaturedWrapper /></FadeInWhenVisible>
      <FadeInWhenVisible><Topcategory /></FadeInWhenVisible>
      <FadeInWhenVisible><BagWrapper /></FadeInWhenVisible>
      <FadeInWhenVisible><Shopex /></FadeInWhenVisible>
      <FadeInWhenVisible><BottomHero/></FadeInWhenVisible>
      <FadeInWhenVisible><Question /></FadeInWhenVisible>
    </main>
  )
}

