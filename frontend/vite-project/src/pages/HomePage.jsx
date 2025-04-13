import React from 'react'
import MainBanner from '../components/MainBanner'
import CategoriesSec from '../components/CategoriesSec'
import BestSellerSec from '../components/BestSellerSec'
import BottomBanner from '../components/BottomBanner'
import SubscriptionSec from '../components/SubscriptionSec'
import FooterSec from '../components/FooterSec'

const HomePage = () => {
    return (
        <>  
        <section className="flex flex-col gap-4 mt-8 lg:mt-15">
            <MainBanner />
            <CategoriesSec />
            <BestSellerSec />
            <BottomBanner />
            <SubscriptionSec />
        </section>
        </>
    )
}

export default HomePage