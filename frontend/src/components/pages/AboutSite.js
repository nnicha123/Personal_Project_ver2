import React from 'react'
import LocalStorageService from '../../services/LocalStorageService'
import UserNav from './Navigation/UserNav'
import RestaurantNav from './Navigation/RestaurantNav'
import GuestNav from './Navigation/GuestNav'
import Footer from './Footer'

function AboutSite() {
  return (
    <div>
      {LocalStorageService.getUserRole() === 'user' ? <UserNav /> : LocalStorageService.getUserRole() === 'restaurant-owner' ? <RestaurantNav /> : <GuestNav />}
      <div className="topResOuter" style={{ minHeight: '81vh' }}>
        About page later will show instructions, how to use
      </div>
      <Footer />
    </div>
  )
}

export default AboutSite
