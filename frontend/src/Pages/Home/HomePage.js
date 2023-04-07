import React from 'react'
import Slider from '../../Components/Home/Slider'
import HomeCategory from '../../Components/Home/HomeCategory'
import CardProductsContainer from '../../Components/Products/CardProductsContainer'
import DiscountSection from '../../Components/Home/DiscountSection'
import BrandFeatured from '../../Components/Brand/BrandFeatured'

function HomePage() {
  return (
    <div className='font' style={{minHeight : "670px"}} >
        <Slider />
        <HomeCategory />
        <CardProductsContainer title="Best Sellers" btntitle="View More" />
        <DiscountSection />
        <CardProductsContainer title="Best Sellers" btntitle="View More" />
        <BrandFeatured title="Top Brands" btntitle="View More"  />
    </div>
  )
}

export default HomePage